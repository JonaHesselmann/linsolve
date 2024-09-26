import SMCPPtr from 'glpk-wasm'
import IOCPPtr from 'glpk-wasm'
import initialize from "glpk-wasm";
/**
 * Function for the GLPK WASM solver / Bindings
 * @see https://github.com/wotzlaff/glpk-wasm
 * @param LPContent
 * @constructor
 * @return {String}
 */


async function CalculateGMPL(LPContent){
    const glpk = await initialize();
        console.log()
        // Assuming the model file is 'transportationgmpl.mod' in the current working directory.
        const modelPath = 'transportationgmpl.mod';
        glpk.FS.writeFile(modelPath, LPContent);
        const pathPtr = glpk._malloc(modelPath.length + 1);
        glpk.stringToUTF8(modelPath, pathPtr, modelPath.length + 1);

        glpk._glp_term_out(1);
        // Load the model file into the WASM virtual file system.
        try {
            // Get GLPK version
            const ver = glpk._glp_version();
            const verStr = glpk.UTF8ToString(ver);
            console.log('GLPK version:', verStr);
            // Create Problem
            const lp = glpk._glp_create_prob();
            // Allocate Workspace
            const tran = glpk._glp_mpl_alloc_wksp();
            ;

            // Read and generate the model from the file

            let ret = glpk._glp_mpl_read_model(tran,pathPtr, 0);
            if (ret !== 0) {
                throw new Error("Failed to read model.");
            }

            glpk._glp_mpl_generate(tran, null);
            glpk._glp_mpl_build_prob(tran, lp);

            // Simplex and Integer Optimization
            const smcp = new SMCPPtr();
            glpk._glp_init_smcp(smcp);
            glpk._glp_simplex(lp, smcp);

            const iocp = new IOCPPtr();
            glpk._glp_init_iocp(iocp);
            glpk._glp_intopt(lp, iocp);

            // Postsolve to retrieve solution
            glpk._glp_mpl_postsolve(tran, lp, 3);

            // Free workspace
            glpk._glp_mpl_free_wksp(tran);

        } catch (err) {
            if (err.line) {
                console.log('Error line:', err.line);
            }
            console.error('Error:', err.toString());
        }
    }
    export {CalculateGMPL}