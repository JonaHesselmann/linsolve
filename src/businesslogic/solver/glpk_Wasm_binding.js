import SMCPPtr from 'glpk-wasm'
import IOCPPtr from 'glpk-wasm'
import GLPM_MIP from 'glpk-wasm'
import glpkWasm from 'glpk-wasm'


/**
 * Bindings to the Webassembly Module of GLPK
 * @see https://github.com/wotzlaff/glpk-wasm
 * @return result
 */
glpkWasm().then(mod => {
    // Assuming the model file is 'transportationgmpl.mod' in the current working directory.
    const modelPath = 'transportationgmpl.mod';
    const fileContents = `
    # A TRANSPORTATION PROBLEM
#
# This problem finds a least cost shipping schedule that meets
# requirements at markets and supplies at factories.
#
#  References:
#              Dantzig G B, "Linear Programming and Extensions."
#              Princeton University Press, Princeton, New Jersey, 1963,
#              Chapter 3-3.

set I;
/* canning plants */

set J;
/* markets */

param a{i in I};
/* capacity of plant i in cases */

param b{j in J};
/* demand at market j in cases */

param d{i in I, j in J};
/* distance in thousands of miles */

param f;
/* freight in dollars per case per thousand miles */

param c{i in I, j in J} := f * d[i,j] / 1000;
/* transport cost in thousands of dollars per case */

var x{i in I, j in J} >= 0;
/* shipment quantities in cases */

minimize cost: sum{i in I, j in J} c[i,j] * x[i,j];
/* total transportation costs in thousands of dollars */

s.t. supply{i in I}: sum{j in J} x[i,j] <= a[i];
/* observe supply limit at plant i */

s.t. demand{j in J}: sum{i in I} x[i,j] >= b[j];
/* satisfy demand at market j */



solve;

# Report / Result Section (Optional)
printf '#################################\\n';
printf 'Transportation Problem / LP Model Result\\n';
printf '\\n';
printf 'Minimum Cost = %.2f\\n', cost;
printf '\\n';

printf '\\n';
printf 'Variables  (i.e. shipment quantities in cases ) \\n';

printf 'Shipment quantities in cases\\n';
printf 'Canning Plants  Markets   Solution (Cases) \\n';
printf{i in I, j in J}:'%14s %10s %11s\\n',i,j, x[i,j];
printf '\\n';

printf 'Constraints\\n';
printf '\\n';
printf 'Observe supply limit at plant i\\n';
printf 'Canning Plants Solution Sign  Required\\n';
for {i in I} {
 printf '%14s %10.2f <= %.3f\\n', i, sum {j in J} x[i,j], a[i];
   }

printf '\\n';
printf 'Satisfy demand at market j\\n';
printf 'Market Solution Sign  Required\\n';
for {j in J} {
 printf '%5s %10.2f >= %.3f\\n', j, sum {i in I} x[i,j], b[j];
   }



data;

set I := Seattle San-Diego;

set J := New-York Chicago Topeka;

param a := Seattle     350
           San-Diego   600;

param b := New-York    325
           Chicago     300
           Topeka      275;

param d :              New-York   Chicago   Topeka :=
           Seattle     2.5        1.7       1.8
           San-Diego   2.5        1.8       1.4  ;

param f := 90;

end;
`;
    mod.FS.writeFile(modelPath, fileContents);
    const pathPtr = mod._malloc(modelPath.length + 1);
    mod.stringToUTF8(modelPath, pathPtr, modelPath.length + 1);

    mod._glp_term_out(1);
    // Load the model file into the WASM virtual file system.
    try {
        // Get GLPK version
        const ver = mod._glp_version();
        const verStr = mod.UTF8ToString(ver);
        console.log('GLPK version:', verStr);
        // Create Problem
        const lp = mod._glp_create_prob();


        // Allocate Workspace
        const tran = mod._glp_mpl_alloc_wksp();
        ;

        // Read and generate the model from the file

        let ret = mod._glp_mpl_read_model(tran,pathPtr, 0);
        if (ret !== 0) {
            throw new Error("Failed to read model.");
        }

        mod._glp_mpl_generate(tran, null);
        mod._glp_mpl_build_prob(tran, lp);

        // Simplex and Integer Optimization
        const smcp = new SMCPPtr();
        mod._glp_init_smcp(smcp);
        mod._glp_simplex(lp, smcp);

        const iocp = new IOCPPtr();
        mod._glp_init_iocp(iocp);
        mod._glp_intopt(lp, iocp);

        // Postsolve to retrieve solution
        mod._glp_mpl_postsolve(tran, lp, 3);

        // Free workspace
        mod._glp_mpl_free_wksp(tran);

    } catch (err) {
        if (err.line) {
            console.log('Error line:', err.line);
        }
        console.error('Error:', err.toString());
    }
}).catch(error => {
    console.error('Failed to load glpk-wasm:', error);
});