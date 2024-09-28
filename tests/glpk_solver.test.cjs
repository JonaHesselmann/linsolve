var glpk = require('../src/glpk.cjs')
import { describe, it, expect, beforeEach } from 'vitest'

describe('GLPK Solver Test', () => {
    let lp, tran, problem, smcp, iocp;
    //TODO update when done

    beforeEach(() => {
        // Initialize GLPK problem and model
        problem = "var x>=0;\n" +
            "var y>=0;\n" +
            "\n" +
            "maximize Objective: x+y;\n" +
            "\n" +
            "s.t. Constraint1:\n" +
            "  x + 2*y <= 15;\n" +
            "\n" +
            "s.t. Constraint2:\n" +
            "  3*x + y <= 20;";

        lp = glpk.glp_create_prob();
        tran = glpk.glp_mpl_alloc_wksp();
        glpk._glp_mpl_init_rand(tran, 1); // Initialize random number generator for reproducibility

        // Create problem from string
        const ret = glpk.glp_mpl_read_model_from_string(tran, "model", problem, 0);
        expect(ret).toBe(0); // Ensure model read correctly

        glpk.glp_mpl_generate(tran, null, 0);
        glpk.glp_mpl_build_prob(tran, lp);

        // Simplex method parameters
        smcp = new glpk.SMCP({ presolve: glpk.GLP_ON });

        // Integer optimization parameters
        iocp = new glpk.IOCP({ presolve: glpk.GLP_ON });
    });

    it('should find the optimal solution for the given problem', () => {
        // Run simplex and integer optimization
        glpk.glp_simplex(lp, smcp);
        glpk.glp_intopt(lp, iocp);

        // Postsolve the model to recover original variables
        glpk.glp_mpl_postsolve(tran, lp, glpk.GLP_MIP);

        // Check if the status is OPTIMAL
        const status = glpk.glp_mip_status(lp);
        expect(status).toBe(glpk.GLP_OPT);

        // Check the objective function value
        const objectiveValue = glpk.glp_mip_obj_val(lp);
        expect(objectiveValue).toBeCloseTo(10, 1); // Expect close to 10 (tolerance of 1 decimal place)

        // Check variable values
        const xValue = glpk.glp_mip_col_val(lp, glpk.glp_find_col(lp, 'x'));
        const yValue = glpk.glp_mip_col_val(lp, glpk.glp_find_col(lp, 'y'));
        expect(xValue).toBeCloseTo(5, 1); // Expected x value
        expect(yValue).toBeCloseTo(5, 1); // Expected y value
    });

    it.skip('should return correct variable table information', () => {
        // Helper function to return variable table
        const returnVariableTable = () => {
            const table = [];
            for (let i = 1; i <= glpk.glp_get_num_cols(lp); i++) {
                table.push({
                    name: glpk.glp_get_col_name(lp, i),
                    value: glpk.glp_mip_col_val(lp, i),
                    colType: glpk.glp_get_col_kind(lp, i),
                    lb: glpk.glp_get_col_lb(lp, i),
                    ub: glpk.glp_get_col_ub(lp, i),
                });
            }
            return table;
        };

        const table = returnVariableTable();
        expect(table).toHaveLength(2); // We expect 2 variables

        const xVar = table.find(row => row.name === 'x');
        const yVar = table.find(row => row.name === 'y');

        expect(xVar.value).toBeCloseTo(5, 1);
        expect(yVar.value).toBeCloseTo(5, 1);
    });

    it.skip('should handle infeasible or unbounded problems gracefully', () => {
        // Modify the problem to make it infeasible
        const infeasibleProblem = "var x>=0;\n" +
            "var y>=0;\n" +
            "\n" +
            "maximize Objective: x+y;\n" +
            "\n" +
            "s.t. Constraint1:\n" +
            "  x + 2*y <= 1;\n" +
            "\n" +
            "s.t. Constraint2:\n" +
            "  3*x + y <= 1;"; // Infeasible constraints
        lp = glpk.glp_create_prob();
        tran = glpk.glp_mpl_alloc_wksp();
        glpk._glp_mpl_init_rand(tran, 1); // Initialize random number generator for reproducibility

        const ret = glpk.glp_mpl_read_model_from_string(tran, "model", infeasibleProblem, 0);
        expect(ret).toBe(0);

        glpk.glp_mpl_generate(tran, null, 0);
        glpk.glp_mpl_build_prob(tran, lp);

        glpk.glp_simplex(lp, smcp);
        glpk.glp_intopt(lp, iocp);
        glpk.glp_mpl_postsolve(tran, lp, glpk.GLP_MIP);

        const status = glpk.glp_mip_status(lp);
        expect([glpk.GLP_NOFEAS, glpk.GLP_INFEAS, glpk.GLP_UNDEF]).toContain(status); // Check for infeasibility or undefined solution
    });
});
