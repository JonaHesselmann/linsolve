
importScripts(import.meta.env.BASE_URL+'/glpk.js')
self.onmessage = async function solveALP(msg) {
    console.log("Message received in worker:");
        var output = 0;
        const model = msg.data;
        // glp_set_print_func(log);
        var lp = glp_create_prob();
        var tran = glp_mpl_alloc_wksp();
        _glp_mpl_init_rand(tran, 1);
        try{
        var ret = glp_mpl_read_model_from_string(tran,"model",model,0);
        glp_mpl_generate(tran, null, );
        glp_mpl_build_prob(tran, lp);
        //glp_scale_prob(lp);
        var smcp = new SMCP({presolve: GLP_ON});
        glp_simplex(lp, smcp);
        //Integer Optimizer Parameters
        var iocp = new IOCP({presolve: GLP_ON});
        glp_intopt(lp, iocp);
        glp_mpl_postsolve(tran, lp, GLP_MIP)
        //Return back to the mpl model
            const map = new Map();
        
            const Status = [];
            var status;
            switch (glp_mip_status(lp)) {
                //TODO implement other States maybe
                case GLP_OPT :
                    status = "OPTIMAL";
                    break;
                case GLP_UNDEF :
                    status = "UNDEFINED SOLUTION";
                    Status.push(status,'0')
                    break;
                case GLP_INFEAS :
                    status = "INFEASIBLE SOLUTION";
                    Status.push(status,'0')
                    break;
                case GLP_NOFEAS :
                    status = "NO FEASIBLE SOLUTION";
                    Status.push(status,'0')
                    break;
                case GLP_FEAS :
                    status = "FEASIBLE SOLUTION";
                    Status[status,'0']
                    break;
                case GLP_UNBND :
                    status = "UNBOUNDED SOLUTION";
                    Status.push(status,'0')
                    break;
            }
            if (status == "OPTIMAL") {
                console.log("OPTIMAL");
                Status.push("Optimal",glp_mip_obj_val(lp));
                console.log(glp_mip_obj_val(lp));

            } else {
                console.log('no valid solution found');
            }
            map.set('Result',Status);
            map.set('VariableTable',returnVariableTable())
            map.set('ConstrainTable',returnConstrainTable())
            self.postMessage(map);

        } catch (err) {
            if (err.line) {
                console.log(err.line);
            }
            console.log(err.toString());

        }




    /**
     * Return The table with all the variables
     * To be rewritten
     * @returns {String[[]]} String Array of Values
     */
    function returnVariableTable() {
        // Array to store the result, starting with the headers
        var result = [
            ["Variable Name", "Type", "Lower Bound", "Upper Bound", "MIP Value", "Objective Coefficient", "Primal Value", "Dual Value"]
        ];

        // Loop through all columns
        for (var i = 1; i <= glp_get_num_cols(lp); i++) {
            // Determine the column type
            var colType;
            switch (glp_get_col_kind(lp, i)) {
                case GLP_CV:
                    colType = "continuous";
                    break;
                case GLP_IV:
                    colType = "integer";
                    break;
                case GLP_BV:
                    colType = "binary";
                    break;
            }

            // Get the upper and lower bounds, converting large bounds to infinity
            var ub = glp_get_col_ub(lp, i);
            if (ub >= Number.MAX_VALUE) {
                ub = "+inf";
            }

            var lb = glp_get_col_lb(lp, i);
            if (lb <= -Number.MAX_VALUE) {
                lb = "-inf";
            }

            // Get the variable name and other properties
            var colName = glp_get_col_name(lp, i);
            var mipVal = glp_mip_col_val(lp, i);           // MIP value
            var objCoef = glp_get_obj_coef(lp, i);         // Objective coefficient
            var primVal = glp_get_col_prim(lp, i);         // Primal value
            var dualVal = glp_get_col_dual(lp, i);         // Dual value

            // Create the row for the current column
            var row = [
                colName,          // Variable Name
                colType,          // Type (continuous, integer, binary)
                lb,               // Lower Bound
                ub,               // Upper Bound
                mipVal,           // MIP Value
                objCoef,          // Objective Coefficient
                primVal,          // Primal Value
                dualVal           // Dual Value
            ];

            // Add the row to the result array
            result.push(row);
        }

        // Return the 2D array with headers and values
        return result;
    }



    /**
     * Returns the Column Table to be Rendered
     * Needs to be Rewritten
     */
    function returnConstrainTable() {
        // Array to store the result, starting with the headers
        var result = [
            ["Constraint Name", "MIP Value", "Lower Bound", "Upper Bound", "Primal Value", "Dual Value"]
        ];

        // Loop through all rows (constraints)
        for (var i = 1; i <= glp_get_num_rows(lp); i++) {
            // Get the upper and lower bounds, converting large bounds to infinity
            var ub = glp_get_row_ub(lp, i);
            if (ub >= Number.MAX_VALUE) {
                ub = "+inf";
            }

            var lb = glp_get_row_lb(lp, i);
            if (lb <= -Number.MAX_VALUE) {
                lb = "-inf";
            }

            // Get the constraint name and other values
            var rowName = glp_get_row_name(lp, i);    // Constraint name
            var mipVal = glp_mip_row_val(lp, i);      // MIP value
            var primVal = glp_get_row_prim(lp, i);    // Primal value
            var dualVal = glp_get_row_dual(lp, i);    // Dual value

            // Create the row for the current constraint
            var row = [
                rowName,    // Constraint Name
                mipVal,     // MIP Value
                lb,         // Lower Bound
                ub,         // Upper Bound
                primVal,    // Primal Value
                dualVal     // Dual Value
            ];

            // Add the row to the result array
            result.push(row);
        }

        // Return the 2D array with headers and values
        return result;
    }

}
