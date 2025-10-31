// Import express
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Dummy employee data
let employees = [
  { id: 1, name: "John", baseSalary: 60000, bonusPercent: 10, taxPercent: 8 },
  { id: 2, name: "Emma", baseSalary: 75000, bonusPercent: 12, taxPercent: 9 }
];

// Function to calculate salaries
function calculateSalary(emp) {
  const gross = emp.baseSalary + (emp.baseSalary * emp.bonusPercent / 100);
  const tax = gross * (emp.taxPercent / 100);
  const net = gross - tax;
  return { gross, net };
}

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Employee Salary API!');
});

// GET all employees
app.get('/employees', (req, res) => {
  const result = employees.map(emp => {
    const salary = calculateSalary(emp);
    return { ...emp, grossSalary: salary.gross, netSalary: salary.net };
  });
  res.json(result);
});

// GET a single employee by ID
app.get('/employees/:id', (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);
  if (!emp) return res.status(404).json({ message: "Employee not found" });
  
  const salary = calculateSalary(emp);
  res.json({ ...emp, grossSalary: salary.gross, netSalary: salary.net });
});

// POST - Add a new employee
app.post('/employees', (req, res) => {
  const { name, baseSalary, bonusPercent, taxPercent } = req.body;
  const newEmp = {
    id: employees.length + 1,
    name,
    baseSalary,
    bonusPercent,
    taxPercent
  };
  employees.push(newEmp);
  res.status(201).json({ message: "Employee added successfully", newEmp });
});

// Server start
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
