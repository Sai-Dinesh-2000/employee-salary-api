// Import express
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Dummy employee data (acting like a DB)
let employees = [
  { id: 1, name: "John", baseSalary: 60000, bonusPercent: 10, taxPercent: 8 },
  { id: 2, name: "Emma", baseSalary: 75000, bonusPercent: 12, taxPercent: 9 }
];

// Function to calculate salary
function calculateSalary(emp) {
  const gross = emp.baseSalary + (emp.baseSalary * emp.bonusPercent / 100);
  const tax = gross * (emp.taxPercent / 100);
  const net = gross - tax;
  return { gross, net };
}

// ✅ Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the Employee Salary API!');
});

// ✅ GET all employees
app.get('/employees', (req, res) => {
  const result = employees.map(emp => {
    const salary = calculateSalary(emp);
    return { ...emp, grossSalary: salary.gross, netSalary: salary.net };
  });
  res.json(result);
});

// ✅ GET one employee by ID
app.get('/employees/:id', (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);
  if (!emp) return res.status(404).json({ message: "Employee not found" });

  const salary = calculateSalary(emp);
  res.json({ ...emp, grossSalary: salary.gross, netSalary: salary.net });
});

// ✅ POST - Add new employee
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

// ✅ PUT - Update entire employee
app.put('/employees/:id', (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);
  if (!emp) return res.status(404).json({ message: "Employee not found" });

  const { name, baseSalary, bonusPercent, taxPercent } = req.body;
  emp.name = name;
  emp.baseSalary = baseSalary;
  emp.bonusPercent = bonusPercent;
  emp.taxPercent = taxPercent;

  res.json({ message: "Employee updated successfully", emp });
});

// ✅ PATCH - Update specific fields (example: salary only)
app.patch('/employees/:id', (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);
  if (!emp) return res.status(404).json({ message: "Employee not found" });

  Object.assign(emp, req.body); // Update only provided values

  res.json({ message: "Employee partially updated", emp });
});

// ✅ DELETE - Remove employee
app.delete('/employees/:id', (req, res) => {
  const index = employees.findIndex(e => e.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Employee not found" });

  employees.splice(index, 1);
  res.json({ message: "Employee deleted successfully" });
});

// ✅ Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
