
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


export async function CalculateGMPL(LPContent) {
    try {
        // Load the GLPK WASM module
        const mod = await glpkWasm();
        const modelPath = '/transportationgmpl.mod';

        // Write the model content to the virtual filesystem
        mod.FS.writeFile(modelPath, LPContent);

        // Convert the path to a UTF-8 pointer
        const pathPtr = mod._malloc(modelPath.length + 1);
        mod.stringToUTF8(modelPath, pathPtr, modelPath.length + 1);

        // Set verbosity to silent
        mod._glp_term_out(1);

        // Create Problem and Workspace
        const lp = mod._glp_create_prob();
        const tran = mod._glp_mpl_alloc_wksp();

        // Read and generate the model from the file
        const ret = mod._glp_mpl_read_model(tran, pathPtr, 0);
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

        // Retrieve the objective value as an example result
        const objVal = mod._glp_get_obj_val(lp);

        // Free allocated memory and workspace
        mod._glp_mpl_free_wksp(tran);
        mod._free(pathPtr);

        // Return the result
        return `Optimal Objective Value: ${objVal}`;

    } catch (error) {
        console.error('Error during GLPK calculation:', error);
        throw error; // Propagate the error
    }
}
