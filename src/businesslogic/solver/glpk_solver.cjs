var glpk = require('../../../public/glpk.cjs')
// Helper functions
var Problem = "var x>=0;\n" +
    "var y>=0;\n" +
    "\n" +
    "maximize Objective: x+y;\n" +
    "\n" +
    "s.t. Constraint1:\n" +
    "  x + 2*y <= 15;\n" +
    "\n" +
    "s.t. Constraint2:\n" +
    "  3*x + y <= 20;";
var output = 0;

   // glpk.glp_set_print_func(log);
var lp = glpk.glp_create_prob();
var tran = glpk.glp_mpl_alloc_wksp();
glpk._glp_mpl_init_rand(tran, 1);
try{
    var ret = glpk.glp_mpl_read_model_from_string(tran,"model",Problem,0);
    glpk.glp_mpl_generate(tran, null,output );
    glpk.glp_mpl_build_prob(tran, lp);
    //glp_scale_prob(lp);
    var smcp = new glpk.SMCP({presolve: glpk.GLP_ON});
    glpk.glp_simplex(lp, smcp);
    //Integer Optimizer Parameters
    var iocp = new glpk.IOCP({presolve: glpk.GLP_ON});
    glpk.glp_intopt(lp, iocp);
    //Return back to the mpl model
    glpk.glp_mpl_postsolve(tran, lp, glpk.GLP_MIP);
    var status;
    switch(glpk.glp_mip_status(lp)){
        //TODO implement other States maybe
        case glpk.GLP_OPT : status = "OPTIMAL"; break;
        case glpk.GLP_UNDEF : status = "UNDEFINED SOLUTION"; break;
        case glpk.GLP_INFEAS : status = "INFEASIBLE SOLUTION"; break;
        case glpk.GLP_NOFEAS : status = "NO FEASIBLE SOLUTION"; break;
        case glpk.GLP_FEAS : status = "FEASIBLE SOLUTION"; break;
        case glpk.GLP_UNBND : status = "UNBOUNDED SOLUTION"; break;
    }
    if(status=="OPTIMAL"){
        console.log("OPTIMAL");
        console.log(glpk.glp_mip_obj_val(lp));

    }else{
        console.log('no valid solution found');
    }

}catch(err){
    if(err.line){
       console.log(err.line);
    }
    console.log(err.toString());

}

/**
 * Return The table with all the variables
 * To be rewritten
 */
function returnVariableTable(){
for( var i = 1; i <= glpk.glp_get_num_cols(lp); i++){
    var colType;
    switch(glpk.glp_get_col_kind(lp,i)){
        case glpk.GLP_CV : colType="continuous";break;
        case glpk.GLP_IV : colType="integer";break;
        case glpk.GLP_BV : colType="binary";break;
    }
    var ub = glpk.glp_get_col_ub(lp, i);
    if(ub >= Number.MAX_VALUE){
        ub = "+inf";
    }
    var lb = glpk.glp_get_col_lb(lp, i);
    if(lb <= -Number.MAX_VALUE){
        lb = "-inf";
    }


    $("#varTable tbody").append("<tr><td>"+glpk.glp_get_col_name(lp, i)
        +"<td>"+glpk.glp_mip_col_val(lp, i)
        +"<td>"+colType
        +"<td>"+lb
        +"<td>"+ub
        +"<td>"+glpk.glp_get_obj_coef(lp, i)
        +"<td>"+glpk.glp_get_col_prim(lp, i)
        +"<td>"+glpk.glp_get_col_dual(lp, i)
        +"</tr>");
}
}

/**
 * Returns the Column Table to be Rendered
 * Needs to be Rewritten
 */
function returnConstrainTable(){

    for( var i = 1; i <= glpk.glp_get_num_rows(lp); i++){

        var ub = glpk.glp_get_row_ub(lp, i);
        if(ub >= Number.MAX_VALUE){
            ub = "+inf";
        }
        var lb = glpk.glp_get_row_lb(lp, i);
        if(lb <= -Number.MAX_VALUE){
            lb = "-inf";
        }


        $("#rowTable tbody").append("<tr><td>"+glpk.glp_get_row_name(lp, i)
            +"<td>"+glpk.glp_mip_row_val(lp, i)
            +"<td>"+lb
            +"<td>"+ub
            +"<td>"+glpk.glp_get_row_prim(lp, i)
            +"<td>"+glpk.glp_get_row_dual(lp, i)
            +"</tr>");
    }
}


