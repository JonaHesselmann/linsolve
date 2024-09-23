import SMCPPtr from 'glpk-wasm'
import IOCPPtr from 'glpk-wasm'
import glpkWasm from 'glpk-wasm'

/**
 * Function for the GLPK WASM solver / Bindings
 * @see https://github.com/wotzlaff/glpk-wasm
 * @param LPContent
 * @constructor
 * @return {String}
 */
function CalculateGMPL( LPContent){
glpkWasm().then(mod => {
    // Assuming the model file is 'transportationgmpl.mod' in the current working directory.
    const modelPath = 'transportationgmpl.mod';
    mod.FS.writeFile(modelPath, LPContent);
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
});}