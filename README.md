*********Employee Salary REST API

This project demonstrates a basic REST API built using Node.js + Express, where we perform CRUD operations on employees and calculate salaries (Gross & Net salary).

This project is mainly focused on understanding HTTP Methods used in REST APIs.

********888Features

Built with Express (Node.js)

Demonstrates REST API HTTP methods

Perform CRUD operations on employees

Calculate Gross salary & Net salary

JSON input/output

**************8HTTP Methods Used in This Project
HTTP Method	Purpose	Endpoint	Meaning
GET	Retrieve data	/employees	Get all employees
GET	Retrieve data by ID	/employees/:id	Get single employee
POST	Create new employee	/employees	Add new record
PUT	Update entire record	/employees/:id	Replace employee
PATCH	Update partial data	/employees/:id	Modify some fields
DELETE	Delete employee	/employees/:id	Remove employee

 
************** HTTP Method Explanation
Method	Example Use Case
GET	Fetch employee list & details
POST	Add new employee data
PUT	Update employee completely (name, salary, bonus, tax)
PATCH	Update only specific fields (ex: salary only)
DELETE	Remove employee record
*********Install Dependencies


npm init -y
npm install express

*************Run the Project
node server.js


Server runs at

http://localhost:3000

***** Project Structure
employee-salary-api/
 ├─ index.js          # Main API code
 └─ package.json

 
 ***************Example JSON Body for POST / PUT / PATCH
{
  "name": "Michael",
  "baseSalary": 90000,
  "bonusPercent": 10,
  "taxPercent": 8
}

**************** Sample API Responses

GET /employees

[
  {
    "id": 1,
    "name": "John",
    "baseSalary": 60000,
    "bonusPercent": 10,
    "taxPercent": 8,
    "grossSalary": 66000,
    "netSalary": 60720
  }
]
