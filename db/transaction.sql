DO $$ 
BEGIN
    -- Insert departments (Fixed column names)
    INSERT INTO departments (department_id, department_name) VALUES
        (1, 'Engineering'),
        (2, 'Finance'),
        (3, 'Legal'),
        (4, 'Sales'),
        (5, 'Marketing')
    ON CONFLICT (department_id) DO NOTHING;

    -- Insert roles with hardcoded department IDs (Fixed column names)
    INSERT INTO roles (role_id, title, salary, department_id) VALUES 
        (1, 'Engineer', 100000, 1),
        (2, 'Accountant', 80000, 2),
        (3, 'Lawyer', 120000, 3),
        (4, 'Salesperson', 80000, 4),
        (5, 'Marketer', 60000, 5)
    ON CONFLICT (role_id) DO NOTHING;

    -- Insert employees with hardcoded role and manager IDs (managers added first)
    INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES
        (1, 'John', 'D', 1, NULL),  -- No manager
        (2, 'Jill', 'D', 1, NULL),  -- No manager
        (3, 'James', 'A', 2, 1),  -- Reports to John
        (4, 'Bob', 'A', 2, 1),  -- Reports to John
        (5, 'Shane', 'C', 3, 2),  -- Reports to Jill
        (6, 'Sharma', 'C', 3, 2),  -- Reports to Jill
        (7, 'Alpha', 'B', 4, 1),  -- Reports to John
        (8, 'Singh', 'B', 4, 1),  -- Reports to John
        (9, 'Jenny', 'V', 5, 2),  -- Reports to Jill
        (10, 'Satnam', 'V', 5, 2)   -- Reports to Jill
    ON CONFLICT (id) DO NOTHING;

    RAISE NOTICE 'Transaction complete';

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'An error occurred: %', SQLERRM;
        ROLLBACK;
END $$;