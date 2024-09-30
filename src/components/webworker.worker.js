importScripts('./glpk.js')
self.onmessage = async function solveLP(msg) {
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
        //Return back to the mpl model
         self.postMessage(glp_mpl_postsolve(tran, lp, GLP_MIP));
            var status;
            switch (glp_mip_status(lp)) {
                //TODO implement other States maybe
                case GLP_OPT :
                    status = "OPTIMAL";
                    break;
                case GLP_UNDEF :
                    status = "UNDEFINED SOLUTION";
                    break;
                case GLP_INFEAS :
                    status = "INFEASIBLE SOLUTION";
                    break;
                case GLP_NOFEAS :
                    status = "NO FEASIBLE SOLUTION";
                    break;
                case GLP_FEAS :
                    status = "FEASIBLE SOLUTION";
                    break;
                case GLP_UNBND :
                    status = "UNBOUNDED SOLUTION";
                    break;
            }
            if (status == "OPTIMAL") {
                console.log("OPTIMAL");
                console.log(glp_mip_obj_val(lp));

            } else {
                console.log('no valid solution found');
            }

        } catch (err) {
            if (err.line) {
                console.log(err.line);
            }
            console.log(err.toString());

        }




    /**
     * Return The table with all the variables
     * To be rewritten
     */
function returnVariableTable() {
        for (var i = 1; i <= glp_get_num_cols(lp); i++) {
            var colType;
            switch (glp_get_col_kind(lp, i)) {
                case GLP_CV :
                    colType = "continuous";
                    break;
                case GLP_IV :
                    colType = "integer";
                    break;
                case GLP_BV :
                    colType = "binary";
                    break;
            }
            var ub = glp_get_col_ub(lp, i);
            if (ub >= Number.MAX_VALUE) {
                ub = "+inf";
            }
            var lb = glp_get_col_lb(lp, i);
            if (lb <= -Number.MAX_VALUE) {
                lb = "-inf";
            }


            $("#varTable tbody").append("<tr><td>" + glp_get_col_name(lp, i)
                + "<td>" + glp_mip_col_val(lp, i)
                + "<td>" + colType
                + "<td>" + lb
                + "<td>" + ub
                + "<td>" + glp_get_obj_coef(lp, i)
                + "<td>" + glp_get_col_prim(lp, i)
                + "<td>" + glp_get_col_dual(lp, i)
                + "</tr>");
        }
    }

    /**
     * Returns the Column Table to be Rendered
     * Needs to be Rewritten
     */
function returnConstrainTable() {

        for (var i = 1; i <= glp_get_num_rows(lp); i++) {

            var ub = glp_get_row_ub(lp, i);
            if (ub >= Number.MAX_VALUE) {
                ub = "+inf";
            }
            var lb = glp_get_row_lb(lp, i);
            if (lb <= -Number.MAX_VALUE) {
                lb = "-inf";
            }


            $("#rowTable tbody").append("<tr><td>" + glp_get_row_name(lp, i)
                + "<td>" + glp_mip_row_val(lp, i)
                + "<td>" + lb
                + "<td>" + ub
                + "<td>" + glp_get_row_prim(lp, i)
                + "<td>" + glp_get_row_dual(lp, i)
                + "</tr>");
        }
    }
}
