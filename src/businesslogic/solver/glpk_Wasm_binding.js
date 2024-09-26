import SMCPPtr from 'glpk-wasm';
import IOCPPtr from 'glpk-wasm';
import initialize from "glpk-wasm";

/**
 * Calculates the solution for a GLPK model using WebAssembly bindings.
 * This function reads a GMPL (GNU Math Programming Language) model from the provided content,
 * solves it using the GLPK solver, and manages workspace allocation and deallocation.
 *
 * @see https://github.com/wotzlaff/glpk-wasm
 * 
 * @param {string} LPContent - The content of the GMPL model file to be solved.
 * @returns {Promise<void>} - A promise that resolves when the calculation is complete.
 * @throws {Error} - Throws an error if there is an issue reading the model or during the solving process.
 */
async function CalculateGMPL(LPContent) {
    // Initialize the GLPK library
    const glpk = await initialize();
    console.log();

    // Define the model file path in the virtual filesystem
    const modelPath = 'transportationgmpl.mod';
    glpk.FS.writeFile(modelPath, LPContent);  // Write the LPContent to the model file

    const pathPtr = glpk._malloc(modelPath.length + 1);
    glpk.stringToUTF8(modelPath, pathPtr, modelPath.length + 1);

    glpk._glp_term_out(1); // Set the output mode to suppress messages

    try {
        // Get and log the GLPK version
        const ver = glpk._glp_version();
        const verStr = glpk.UTF8ToString(ver);
        console.log('GLPK version:', verStr);

        // Create a new problem instance
        const lp = glpk._glp_create_prob();
        // Allocate workspace for the model
        const tran = glpk._glp_mpl_alloc_wksp();

        // Read and generate the model from the file
        let ret = glpk._glp_mpl_read_model(tran, pathPtr, 0);
        if (ret !== 0) {
            throw new Error("Failed to read model.");
        }

        glpk._glp_mpl_generate(tran, null);
        glpk._glp_mpl_build_prob(tran, lp);

        // Initialize Simplex and Integer optimization parameters
        const smcp = new SMCPPtr();
        glpk._glp_init_smcp(smcp);
        glpk._glp_simplex(lp, smcp);

        const iocp = new IOCPPtr();
        glpk._glp_init_iocp(iocp);
        glpk._glp_intopt(lp, iocp);

        // Post-solve to retrieve the solution
        glpk._glp_mpl_postsolve(tran, lp, 3);

        // Free the allocated workspace
        glpk._glp_mpl_free_wksp(tran);

    } catch (err) {
        if (err.line) {
            console.log('Error line:', err.line);
        }
        console.error('Error:', err.toString());
    }
}

export { CalculateGMPL };
