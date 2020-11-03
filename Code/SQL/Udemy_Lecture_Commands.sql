-- How to manually install the HR schema database: 
-- https://www.udemy.com/course/oracle-sql-12c-become-an-sql-developer-with-subtitle/learn/lecture/3242752#questions/12947334


-- Lecture 25
-- Note the column commission_pct. A value of (null) does not mean a commission_pct of 0!
SELECT * FROM employees;

-- Lecture 26
-- get information about the table
-- Press Shift + F4 for more information
DESCRIBE employees;
DESC employees;
INFORMATION employees;
INFO employees;
INFO+ employees;

-- SQL Statements can also be terminated using a '/'
-- The '/' character should be on a new line, otherwise an error will be produced
SELECT * FROM employees;

-- Lecture 30
-- Using SELECT Statements
-- Never use *, specify column names individually
SELECT * FROM employees;

-- Using column aliases. Both of the below approaches work
SELECT first_name name, last_name surname FROM employees;
SELECT first_name AS name, last_name AS surname FROM employees;
-- It can also be used to change names for computations
SELECT employee_id, salary + NVL(salary * commission_pct, 0), salary, commission_pct FROM employees;
-- Use this instead
SELECT employee_id, salary + NVL(salary * commission_pct, 0) AS modified_salary, salary, commission_pct FROM employees;
-- Aliases are used with double quotation marks if our alias name contains spaces, 
-- special characters, or it is used for handling case-sensitivity.
SELECT employee_id, salary + NVL(salary * commission_pct, 0) AS "New Salary", salary, commission_pct FROM employees;



-- Lecture 34
-- Quote Operator
SELECT 'My name is not known' FROM dual;
SELECT 'My name is not known' AS my_name FROM dual;
-- This is an error:
-- SELECT 'My friend's name is not known' AS my_name FROM dual;
-- You will have to escape the single quotation
SELECT 'My friend''s name is not known' AS my_name FROM dual;
SELECT q'[My name is not known]' AS my_name FROM dual;
SELECT q'[My friends's name is not known]' AS my_name FROM dual;
-- You can even use other character or symbols in place of the square brackets
SELECT q'<My friends's name is not known>' AS my_name FROM dual;



-- Lecture 35
-- DISTINCT and UNIQUE Keywords
SELECT job_id FROM employees;
SELECT DISTINCT job_id FROM employees;
SELECT UNIQUE job_id FROM employees;
-- DISTINCT and UNIUE are the same. DISTINCT is the new version of UNIQUE. Prefer DISTINCT.
-- DISTINCT operator can be used only once. Hence this is an error:
-- SELECT DISTINCT job_id, DISTINCT department_id FROM employees;

-- DISTINCT should be placed just before the first column name. So this is an error:
SELECT job_id, DISTINCT department_id FROM employees;

SELECT DISTINCT job_id, department_id FROM employees; -- returns 20 rows
SELECT DISTINCT job_id FROM employees; -- returns 19 rows
-- Why?
-- If you write more than one column in the same SELECT query, the DISTINCT operator 
-- returns all the unique combinations of these columns as a distinct row.
-- So if you write just job_id, it returns only the rows with unique job_ids
-- but if you write job_id and department_id, it returns all unique COMBINATIONS of the two
-- You can see in the OP of the below statement that SA_REP has 2 entries, hence the extra row.
SELECT DISTINCT job_id, department_id FROM employees ORDER BY job_id;
-- Similarly, this will combine on 3 columns
SELECT DISTINCT job_id, department_id, first_name FROM employees ORDER BY job_id;



-- Lecture 36
-- Concatenation Operators
SELECT 'My name is unknown' FROM employees;
SELECT 'My name is ' || first_name AS name FROM employees;
SELECT first_name || ' ' || last_name AS name FROM employees;

-- NULL values are not concatanated
SELECT 'The commission_pct is ' || commission_pct AS com_pct, commission_pct FROM employees;



-- Lecture 37
-- Arithmetic Operators
SELECT employee_id, salary, (salary * 12) as annual_salary FROM employees;
-- Adding numbers to dates will return dates
SELECT hire_date, hire_date + 5 FROM employees;
-- Arithmetic operations on NULL values will return NULL values
-- in the below eg., if the commission_pct is NULL, then the result is also NULL.
-- Hence NULL needs to be handled separately
SELECT employee_id, (salary + salary * commission_pct) AS "New Salary", salary, commission_pct FROM employees;





-- *****************************************************************************
-- SECTION 4: Restricting Data
-- *****************************************************************************


-- Lecture 38
-- Using WHERE clause
SELECT * FROM employees WHERE job_id = 'IT_PROG';
SELECT * FROM employees WHERE hire_date > '01-JAN-05';
-- You can use either != or <>
SELECT * FROM employees WHERE manager_id != 100;

-- Character matching is case-sensitive.
-- Hence the below statement will give 0 results
SELECT * FROM employees WHERE job_id = 'it_prog';


-- Lecture 40
-- BETWEEN ... AND operators
-- Retrieves data between the specified upper limit and lower limit. 
-- The lower and the upper limits are included. 
SELECT * FROM employees WHERE salary BETWEEN 10000 AND 14000;
SELECT * FROM employees WHERE hire_date BETWEEN '07-JUN-02' AND '01-OCT-04';



-- Lecture 41
-- IN operator
-- The values returned from this statement are Sorted
SELECT * FROM employees WHERE employee_id IN (50, 100, 65, 210, 150);
-- The values returned from the below statement are NOT Sorted. 
-- Because there is no Index associated with this column
SELECT * FROM employees WHERE first_name IN ('Steven', 'Peter', 'Adam');
SELECT * FROM employees WHERE hire_date IN ('08-MAR-08', '30-JAN-05');



-- Lecture 42
-- LIKE operator

SELECT * FROM employees WHERE job_id LIKE 'SA%';
SELECT * FROM employees WHERE job_id LIKE 'SA_';

-- All names that start with A
SELECT * FROM employees WHERE first_name LIKE 'A%';

-- All names that end with 'a'. Strings are case sensitive.
SELECT * FROM employees WHERE first_name LIKE '%a';

-- All names that contain an 'a' are returned
SELECT * FROM employees WHERE first_name LIKE '%a%';

-- First cahracter can be naything. Second character has to be an 'r'.
-- Then there can be 0 or more characters.
SELECT * FROM employees WHERE first_name LIKE '_r%';



-- Lecture 43
-- IS NULL operator
-- You cannot check for NULL values using this
SELECT * FROM employees WHERE commission_pct = NULL;
-- Instead you use this
SELECT * FROM employees WHERE commission_pct IS NULL;
SELECT * FROM employees WHERE commission_pct IS NOT NULL;



-- Lecture 44
-- Logical operator: AND, OR, NOT
SELECT * FROM employees WHERE job_id = 'SA_REP' AND salary > 10000;
SELECT * FROM employees WHERE job_id = 'SA_REP' OR salary > 10000;
SELECT * FROM employees WHERE salary > 10000 AND job_id NOT IN ('SA_MAN', 'ST_CLERK', 'SH_CLERK');

-- Why is the NULL specified as a separate column in the truth tables?
SELECT * FROM employees WHERE job_id = 'IT_PROG' AND commission_pct IS NOT NULL; -- no rows satisfy this query
-- Don't know



-- Lecture 45
-- Rules of Precedence
-- Consider the following command
SELECT * FROM employees WHERE job_id = 'IT_PROG' OR job_id = 'ST_CLERK' AND salary > 5000;

-- Break up the command into the following bits:
SELECT * FROM employees WHERE job_id = 'IT_PROG' OR job_id = 'ST_CLERK';
SELECT * FROM employees WHERE job_id = 'ST_CLERK';
SELECT * FROM employees WHERE job_id = 'ST_CLERK' AND salary > 5000;
SELECT * FROM employees WHERE salary > 5000;

-- Because the AND operator has a higher precedence, the actual command that is executed is as this:
-- SELECT * FROM employees WHERE job_id = 'IT_PROG' OR (job_id = 'STS_CLERK' AND salary > 5000);

-- Hence we run this instead:
SELECT * FROM employees WHERE (job_id = 'IT_PROG' OR job_id = 'STS_CLERK') AND salary > 5000;

-- *****************************************************************************
-- SECTION 5: Ordering Data
-- *****************************************************************************

-- Lecture 47
SELECT * FROM employees ORDER BY first_name;

-- ORDER BY can also be used with ALIASES
SELECT employee_id, first_name, salary + NVL(salary * commission_pct, 0) AS modified_salary, salary, commission_pct 
FROM employees
ORDER BY modified_salary;

-- You can also use ORDER BY with the numeric position of the column number in the SELECT list
-- THe rows will be ordered on the basis of the first_name column
SELECT employee_id, first_name, salary + NVL(salary * commission_pct, 0) AS modified_salary, salary, commission_pct 
FROM employees
ORDER BY 2;

-- Now it will order based on the columns in the table. 
-- The second column in the table is FIRST_NAME
SELECT * FROM employees ORDER BY 2;

-- ORDER BY can be used with multiple columns
-- First sort is done in ASC order on first_name
-- Second sort is done in ASC order on modified_salary
SELECT employee_id, first_name, salary + NVL(salary * commission_pct, 0) AS modified_salary, salary, commission_pct 
FROM employees
ORDER BY first_name, modified_salary;



-- Lecture 48
-- ASC and DESC Opertaors

-- ASC is the default sorting order
SELECT * FROM employees ORDER BY first_name ASC;

-- DESC sorts in the descending order
SELECT * FROM employees ORDER BY first_name DESC;

-- Sort by multiple columns
SELECT * FROM employees ORDER BY first_name DESC, last_name DESC;

-- Similar to ORDER BY, we can use aliases in this as well
SELECT employee_id, first_name, salary + NVL(salary * commission_pct, 0) AS modified_salary, salary, commission_pct 
FROM employees
ORDER BY first_name, modified_salary DESC;

-- And we can use numeric values for columns as well
SELECT employee_id, first_name, salary + NVL(salary * commission_pct, 0) AS modified_salary, salary, commission_pct 
FROM employees
ORDER BY 2, modified_salary DESC;

-- NULL values are displayed last in ASC order
SELECT * FROM employees ORDER BY commission_pct;

-- NULL values are displayed first in DESC order
SELECT * FROM employees ORDER BY commission_pct DESC;

-- Lecture 49
-- NULLS FIRST and NULLS LAST Operators

-- When ORDER BY is ASC, NULLS appear at the end of the result 
SELECT * FROM employees ORDER BY commission_pct;

-- This will change the position of NULL values to the top of the result
SELECT * FROM employees ORDER BY commission_pct NULLS FIRST;

-- NULL values are displayed first in DESC order
SELECT * FROM employees ORDER BY commission_pct DESC;

-- This will change the position of NULL values to the bottom of the result
SELECT * FROM employees ORDER BY commission_pct DESC NULLS LAST;


-- Lecture 50
-- ROWNUM and ROWID

-- ROWNUM for Bruce is 14
SELECT employee_id, first_name, last_name, department_id, ROWID, ROWNUM FROM employees;

-- ROWNUM now for Bruce is 2. But the ROWID has not changed.
SELECT employee_id, first_name, last_name, ROWID, ROWNUM FROM employees WHERE department_id = 60;

-- Where can ROWNUM be used?
-- Where you want to limit the number of rows returned
-- This query returns 34 rows
SELECT employee_id, first_name, last_name, ROWID, ROWNUM FROM employees 
WHERE department_id = 800;

-- But this one will return only the top 10 rows (in the insertion order)
SELECT employee_id, first_name, last_name, ROWID, ROWNUM FROM employees 
WHERE department_id = 80 AND ROWNUM <= 10;

-- This does not work though
SELECT employee_id, first_name, last_name, ROWID, ROWNUM FROM employees 
WHERE department_id = 80 AND ROWNUM >= 10;

-- The ORDER BY will be applied AFTER the top 10 rows in the insertion order have been returned
SELECT * FROM employees
    WHERE ROWNUM < 11
    ORDER BY first_name;

-- https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/ROWNUM-Pseudocolumn.html#GUID-2E40EC12-3FCF-4A4F-B5F2-6BC669021726
-- If you embed the ORDER BY clause in a subquery and place the ROWNUM condition in the top-level query, 
-- then you can force the ROWNUM condition to be applied after the ordering of the rows. 
-- For example, the following query returns the employees with the 10 smallest employee numbers. 
-- This is sometimes referred to as top-N reporting:
SELECT *
  FROM (SELECT * FROM employees ORDER BY first_name)
  WHERE ROWNUM < 11;

SELECT employee_id, first_name, last_name, ROWID FROM employees;
SELECT employee_id, first_name, last_name, ROWID FROM employees ORDER BY first_name;

-- What if you wanted to sort the table on tha basis of the first_name 
-- and then get the first 10 people
-- The below query is a bad query to do it.
SELECT employee_id, first_name, last_name, ROWID, ROWNUM 
FROM employees
WHERE ROWNUM < 11
ORDER BY first_name;

-- This is the way
SELECT employee_id, first_name, last_name, ROWID, ROWNUM FROM (
    SELECT employee_id, first_name, last_name, ROWID
    FROM employees 
    ORDER BY first_name
)
WHERE ROWNUM < 11;

-- This is the wrong way to write the above query.
-- The only difference is the addition of the ROWNUM column in the inner query
-- This is wrong because the DB will give the ROWNUM after the ORDER BY clause is executed
SELECT employee_id, first_name, last_name, ROWID, ROWNUM FROM (
    SELECT employee_id, first_name, last_name, ROWID, ROWNUM
    FROM employees 
    ORDER BY first_name
)
WHERE ROWNUM < 11;


-- Lecture 51
-- FETCH Clause

SELECT first_name, last_name, salary FROM employees
ORDER BY salary DESC;

-- Note: OFFSET can be used without the FETCH clause
SELECT first_name, last_name, salary FROM employees
ORDER BY salary DESC
OFFSET 1 ROW;

-- Return the salary of the top 10 people excluding the person with the highest salary
-- Terminate your statement with ONLY if you want the exact 10 rows
SELECT first_name, last_name, salary FROM employees
ORDER BY salary DESC
OFFSET 1 ROW FETCH FIRST 10 ROWS ONLY;

-- This will return 12 rows because employee 11 and 12 have the same salary as the employee 10
-- Hence it is a tie and 12 rows are returned as a result
SELECT first_name, last_name, salary FROM employees
ORDER BY salary DESC
OFFSET 1 ROW FETCH FIRST 10 ROWS WITH TIES;


-- IMPORTANT: While using the WITH TIES option, if you don't specify the ORDER BY clause,
-- then no additional rows will be returned. THe below statement returns 10 instead of 12 rows
SELECT first_name, last_name, salary FROM employees
OFFSET 1 ROW FETCH FIRST 10 ROWS WITH TIES;

-- FIRST can be replaced with NEXT without any issues
SELECT first_name, last_name, salary FROM employees
ORDER BY salary DESC
OFFSET 1 ROW FETCH NEXT 10 ROWS WITH TIES;

-- If one of the values are null, no rows are returned in that case
SELECT first_name, last_name, salary FROM employees
ORDER BY salary DESC
OFFSET null ROW FETCH NEXT 10 ROWS WITH TIES;

-- You can also use the FETCH clause without the OFFSET
SELECT first_name, last_name, salary FROM employees
ORDER BY salary DESC
FETCH NEXT 10 ROWS WITH TIES;




-- *****************************************************************************
-- SECTION 6: Substitution Variables
-- *****************************************************************************

-- Lecture 52
-- What is a Substitution Variable

SELECT first_name, last_name, salary, department_id FROM employees
WHERE department_id = &dept_id;

-- If you want to use Substitution Variable for string or date, 
-- make sure that the values are enclosed in quotes
SELECT first_name, last_name, salary, department_id FROM employees
WHERE first_name = '&name';

-- We can use more than 1 susbtitution variables
SELECT first_name, last_name, salary, department_id FROM employees
WHERE first_name = '&name' AND last_name = '&surname';



-- Lecture 53
-- Double Ampersand (&&), DEFINE, and UNDEFINE Commands

-- Even though the names of the two substitution variables are the same,
-- they will be treated as 2 different variables.
SELECT first_name, last_name, salary, department_id FROM employees
WHERE salary BETWEEN &sal AND (&sal + 1000);

-- So how do we treat them as a single variable
-- You can use && to tell SQL to not ask you the value of the same variable
SELECT first_name, last_name, salary, department_id FROM employees
WHERE salary BETWEEN &&sal AND (&sal + 1000);

-- You can use substitution variables in column names as follows
SELECT first_name, last_name, &&column_name
FROM employees
ORDER BY &column_name;

-- Using && stores the value of the substitution variable. 
-- The value associated with that particular substitution variable will be stored 
-- for the entire duration of the connection
-- So how do we change the values once they have been assigned?

-- DEFINE is used to assign a value to the user variable
DEFINE emp_num = 100;
SELECT * FROM employees WHERE employee_id = &emp_num;

-- To assigne a different value to the emp_num variable, run the DEFINE cmd again
DEFINE emp_num = 200;
SELECT * FROM employees WHERE employee_id = &emp_num;

-- To delete the variable we use the UNDEFINE cmd
UNDEFINE emp_num;

-- To print the list of all substitution variables you can use:
DEFINE;

-- To print the value of a specific substitution variable
DEFINE emp_num1;


-- Lecture 54
--ACCEPT and PROMPT Commands


-- Lecture 55
-- SET VERIFY ON / SET VERIFY OFF Commands



-- *****************************************************************************
-- SECTION 7: Single Row Functions
-- *****************************************************************************


-- Lecture 57
-- Character Functions Case Conversion Functions

-- As stated, these functions can be used only if the column is of character data type
-- For EACH row, they are going to return one result
SELECT 
    first_name, LOWER(first_name), 
    last_name, UPPER(last_name), 
    email, INITCAP(email)
FROM employees;

-- Numbers are not affected by the character functions
SELECT 
    first_name, LOWER(first_name), 
    last_name, UPPER(last_name), 
    email, INITCAP(email),
    UPPER('bmw i8')
FROM employees;

-- Character matching is case-sensitive.
-- Hence the below statement will give 0 results
SELECT * FROM employees WHERE last_name = 'king';

-- So you can run this instead
-- This is to show that character funtions can also be used in WHERE clause
SELECT * FROM employees 
WHERE LOWER(last_name) = 'king';


-- Lecture 58
-- Character Manipulation Functions

-- This query is saying: for each row in first_name, start from the 
-- 4th character, and then fetch the next 3 characters
-- Note that if the first_name in some row contains only 3 characters,
-- then the output is NULL.
SELECT first_name, SUBSTR(first_name, 4, 3) FROM employees;

-- We can also create the query without specifying the length
SELECT first_name, SUBSTR(first_name, 4, 3), SUBSTR(first_name, 4) 
FROM employees;

-- The concat operator can only concatenate two strings
SELECT first_name, last_name, CONCAT(first_name, last_name)
FROM employees;

-- If you want to use it with more than two, you need to nest it
SELECT first_name, last_name, CONCAT(first_name, CONCAT(' ', last_name))
FROM employees;

-- So you avoid this by using the concatenation operator
SELECT first_name, last_name, first_name || ' ' || last_name AS full_name
FROM employees;

-- Find the first instance of substring 'o' from the start of the string
-- Outputs 2
SELECT INSTR('How to use functions in Oracle', 'o') FROM dual;

-- Find the first instance of substring 'o' from the start of the string
-- but start counting from the 3rd index
-- Outputs 6
SELECT INSTR('How to use functions in Oracle', 'o', 3) FROM dual;

-- Find the 2nd instance of substring 'o' from the start of the string
-- but start counting from the 3rd index
-- Outputs 18
SELECT INSTR('How to use functions in Oracle', 'o', 3, 2) FROM dual;

-- Find the 3rd instance of substring 'o' from the start of the string
-- but start counting from the 3rd index
-- Outputs 0 because 'o' is not O (in Oracle, case-sensitive)
SELECT INSTR('How to use functions in Oracle', 'o', 3, 3) FROM dual;

-- Find the 1st instance of substring 'o' from the end of the string
-- but start counting from the 3rd index from the right
-- Outputs 18
-- Note that even though you are counting from the end of the string,
-- the value being returned is what is counted from the fron of the string
SELECT INSTR('How to use functions in Oracle', 'o', -3) FROM dual;

-- Find the 2nd instance of substring 'o' from the end of the string
-- but start counting from the 14th index from the right
-- Outputs 2
SELECT INSTR('How to use functions in Oracle', 'o', -14, 2) FROM dual;

-- Similarly you can search for substrings
-- Find the first occurrence of 'in' starting from the end of the string
-- Outputs 22
SELECT INSTR('How to use functions in Oracle', 'in', -1, 1) FROM dual;
-- Outputs 6
SELECT INSTR('Learning how to use functions in Oracle', 'in', 1, 1) FROM dual;

-- How to use INSTR with column values
SELECT first_name, INSTR(first_name, 'a') FROM employees;


-- Using TRIM function

-- Default behavior of TRIM
-- Removes whitespace from both start and end of the string
-- Outputs: 'How to use TRIME functions in Oracle'
SELECT TRIM('    How to use TRIM functions in Oracle    ') AS trimmed_text FROM dual;

-- Change the Default behavior by using the FROM keyword and psecifying the substring to remove
SELECT TRIM(' ' FROM '    How to use TRIM functions in Oracle    ') AS trimmed_text FROM dual;

-- Remove only the leading spaces
-- Outputs: 'How to use TRIM functions in Oracle    '
SELECT TRIM(LEADING ' ' FROM '    How to use TRIM functions in Oracle    ') AS trimmed_text FROM dual;

-- Outputs: '    How to use TRIM functions in Oracle'
SELECT TRIM(TRAILING ' ' FROM '    How to use TRIM functions in Oracle    ') AS trimmed_text FROM dual;

-- The edge characters are whitespaces, hence nothing will be removed in this case
SELECT TRIM(BOTH 'm' FROM '    My name is Adam    ') AS trimmed_text FROM dual;

-- Ouptuts: my name is Ada
SELECT TRIM(TRAILING 'm' FROM 'my name is Adam') AS trimmed_text FROM dual;

-- Note that it removes all 'm' until it hits a character that does not matches
-- Outputs: my name is Ada
SELECT TRIM(TRAILING 'm' FROM 'my name is Adammmmm') AS trimmed_text FROM dual;

-- Outputs: y name is Adammmmm
SELECT TRIM(LEADING 'm' FROM 'my name is Adammmmm') AS trimmed_text FROM dual;

-- Outputs: y name is Ada
SELECT TRIM(BOTH 'm' FROM 'my name is Adammmmm') AS trimmed_text FROM dual;

-- BOTH is the default behavior
-- Outputs: y name is Ada
SELECT TRIM('m' FROM 'my name is Adammmmm') AS trimmed_text FROM dual;

-- This will throw an error
-- trim set should have only one character
SELECT TRIM('my' FROM 'my name is Adammmmm') AS trimmed_text FROM dual;


-- Using RTRIM

-- Default behavior is to remove spaces
-- Outputs: '    my name is Adam'
SELECT RTRIM('    my name is Adam    ') AS trimmed_text FROM dual;

-- Outputs: 'my name is Adam    '
SELECT LTRIM('    my name is Adam    ') AS trimmed_text FROM dual;

-- You can pass in strings as args now
-- Outputs: ' name is Adam'
SELECT LTRIM('my name is Adam', 'my') AS trimmed_text FROM dual;

-- But note this now:
-- Outputs: my name is Ada
-- But why?
-- The matching operation is performed for any of the matching characters here
-- SO the argument is more like: 'm', 'y'; instead of 'my'
SELECT RTRIM('my name is Adam', 'my') AS trimmed_text FROM dual;

-- AS can be seen here:
-- Outputs: 'my name is Ada'
SELECT RTRIM('my name is Ada***m', 'ym*') AS trimmed_text FROM dual;

-- Removing random numbers from our text
-- Outputs: My name is Adam
SELECT LTRIM('1231243My name is Adam', '0123456789') AS trimmed_text FROM dual;





-- Using the REPLACE function

-- This will replace(remove) the character 'a' from each row
SELECT first_name, REPLACE(first_name, 'a') FROM employees;

-- This will replace(remove) the string 'ar' from each row
SELECT first_name, REPLACE(first_name, 'ar') FROM employees;

-- This will replace the string 'a' from each row with 'A'
SELECT first_name, REPLACE(first_name, 'a', 'A') FROM employees;


-- Leftpad the first_name column with '*' until the target length reaches 10 characters
-- If the length of the first_name row is greater than 8, then the string will be truncated instead
-- The truncated character will be removed from the right side of the string
-- 'Amit' will output '****Amit' 
-- 'Elizabeth' will output 'Elizabet'
SELECT first_name, LPAD(first_name, 8, '*') FROM employees;

-- 'Amit' will output 'Amit****' 
-- 'Elizabeth' will output 'Elizabet'
SELECT first_name, RPAD(first_name, 8, '*') FROM employees;





-- Lecture 62
-- Numeric Functions

-- Round to the nearest integer
-- Outputs: 12
SELECT ROUND(12.134) FROM dual;

-- Outputs: 13
SELECT ROUND(12.534) FROM dual;

-- Round to 2 decimal numbers
-- Outputs: 12.54
SELECT ROUND(12.536, 2) FROM dual;

-- Rounds a number one digit to the left of the decimal point:
-- Output: 10
SELECT ROUND(12.536, -1) FROM dual;

-- Output: 120
SELECT ROUND(123.536, -1) FROM dual;

-- Output: 100
SELECT ROUND(123.536, -2) FROM dual;

-- Truncate to 2 decimal numbers
-- This will not round, just straight truncate
-- Outputs: 12.53
SELECT TRUNC(12.536, 2) FROM dual;

-- Outputs: 12
SELECT TRUNC(12.536) FROM dual;

-- Outputs: 13
SELECT CEIL(12.536) FROM dual;

-- Outputs: 12
SELECT CEIL(12) FROM dual;

-- Outputs: -12
SELECT CEIL(-12.1) FROM dual;

-- Outputs: -13
SELECT FLOOR(-12.1) FROM dual;

-- Outputs: 12
SELECT FLOOR(12.1) FROM dual;


-- Lecture 65
-- Date functions and arithmetic operations on dates

-- Outputs: 02-NOV-20
-- But sysdate also shows time stamp, you have to go to Tools -> Preferences -> Database -> NLS
-- and change the Date Format to: DD-MON-RR HH24:MI:SS
-- Now it will show the timestamp as well. Remember, this is the time of where the DB is
SELECT SYSDATE FROM dual;

-- Output: 02-NOV-20 14:25:42
SELECT CURRENT_DATE FROM dual;

-- Returns the time zone of user session
-- Output: America/New_York
SELECT SESSIONTIMEZONE FROM dual;

-- Returns the date, time, timezone of the db system
-- Output: 02-NOV-20 02.26.07.977000000 PM -05:00
SELECT SYSTIMESTAMP FROM dual;

-- Returns the date, time, timezone of the user session
-- Output: 02-NOV-20 02.26.17.815000000 PM AMERICA/NEW_YORK
SELECT CURRENT_TIMESTAMP FROM dual;

-- Adds 1 day to the current date
-- Output: 02-NOV-20 15:00:23	03-NOV-20 15:00:23
-- Anytime we add a number to a sysdate value, Oracle assumes that number represents
-- the number of days
SELECT SYSDATE, SYSDATE + 1 FROM dual;



-- Lecture 66
-- Data manipulation functions
-- Output: 02-NOV-20 15:17:58	02-DEC-20 15:17:58
SELECT SYSDATE, ADD_MONTHS(SYSDATE, 1) FROM dual;

-- Output: 02-NOV-20 15:18:24	02-OCT-20 15:18:24
SELECT SYSDATE, ADD_MONTHS(SYSDATE, -1) FROM dual;

-- Output: 02-OCT-20 00:00:00
SELECT ADD_MONTHS('2-NOV-20', -1) FROM dual;

-- TRUNCATE will just reduce the date to the least month
-- Output: 01-OCT-20 00:00:00
SELECT TRUNC(TO_DATE('17-OCT-20','DD-MON-YY'), 'MONTH') FROM dual;

-- But ROUND will round the date to the nearest month
-- Output: 01-NOV-20 00:00:00
SELECT ROUND(TO_DATE('17-OCT-20','DD-MON-YY'), 'MONTH') FROM dual;

-- ROUND to year will round to the nearest year if the month is > 6
-- Output: 01-JAN-21 00:00:00
SELECT ROUND(TO_DATE('17-OCT-20','DD-MON-YY'), 'YEAR') FROM dual;
-- Output: 01-JAN-20 00:00:00
SELECT ROUND(TO_DATE('17-JUN-20','DD-MON-YY'), 'YEAR') FROM dual;

-- With column data:
SELECT employee_id, hire_date, TRUNC(hire_date, 'YEAR'), ROUND(hire_date, 'YEAR')
FROM employees;

-- Using EXTRACT
-- Outputs: 10
SELECT EXTRACT(MONTH FROM TO_DATE('17-OCT-20','DD-MON-YY')) FROM dual;
-- Outputs: 2020
SELECT EXTRACT(YEAR FROM TO_DATE('17-OCT-20','DD-MON-YY')) FROM dual;
-- Outputs: 17
SELECT EXTRACT(DAY FROM TO_DATE('17-OCT-20','DD-MON-YY')) FROM dual;



-- *****************************************************************************
-- SECTION 8: Conversion Functions
-- *****************************************************************************

-- Lecture 67
-- Conversion Functions

-- Implicit conversion from a VARCHAR2 to a NUMBER value
SELECT * FROM employees WHERE salary > '10000';

-- Implicit conversion from a VARCHAR2 value to a DATE value
SELECT * FROM employees WHERE hire_date = '17-JUN-03';

-- Implicit conversion from a NUMBER to a VARCHAR2 value
SELECT department_id || ' ' || department_name FROM departments ;

-- Implicit conversion from a DATE value to a VARCHAR2 value
SELECT first_name || ' ' || SYSDATE FROM employees;


-- Lecture 68
-- TO_CHAR, TO_DATE, TO_NUMBER Functions

SELECT first_name, hire_date, TO_CHAR(hire_date, 'YYYY') FROM employees;
SELECT first_name, hire_date, TO_CHAR(hire_date, 'MM-YYYY') FROM employees;
SELECT first_name, hire_date, TO_CHAR(hire_date, 'MON') FROM employees;
-- The TO_CHAR is case-sensitive
SELECT first_name, hire_date, TO_CHAR(hire_date, 'mon-yyyy') FROM employees;
SELECT first_name, hire_date, TO_CHAR(hire_date, 'dd') FROM employees;


-- Lecture 69
-- TO_CHAR, TO_DATE, TO_NUMBER Functions

SELECT 
    salary, 
    ((salary + salary * commission_pct) * 12) AS yearly_salary,
    TO_CHAR(((salary + salary * commission_pct) * 12), '$999,999.99') AS formatted_salary
FROM employees
WHERE commission_pct IS NOT NULL;

-- This will pad the formatted_salary column from the left with zeroes
-- For example: the upper query will print salary as: $96,600.00 whereas 
-- the below query will print it as:  $096,600.00

SELECT 
    salary, 
    ((salary + salary * commission_pct) * 12) AS yearly_salary,
    TO_CHAR(((salary + salary * commission_pct) * 12), '$000,000.00') AS formatted_salary
FROM employees
WHERE commission_pct IS NOT NULL;


-- The first argument is the VARCHAR2 type to be converted to a NUMBER
-- The second argument is the format that the string to be ocnverted is actually in
SELECT TO_NUMBER('$5,322.23', '$99,999.00') AS formatted_number FROM dual;

-- So if we remove the '$' symbol from the left args, we get an error because
-- of the mismatching formats
SELECT TO_NUMBER('5,322.23', '$99,999.00') AS formatted_number FROM dual;
-- Similarly, this will also throw an error
SELECT TO_NUMBER('5,322.23', '$999.00') AS formatted_number FROM dual;

-- Lecture 70
-- Null-Related (NVL, NVL2, NULLIF, COALESCE) Functions

SELECT 
    salary,
    commission_pct,
    ((salary + salary * NVL(commission_pct, 0)) * 12) AS yearly_salary
FROM employees;

SELECT city, state_province, COALESCE(state_province, city)
FROM locations;


