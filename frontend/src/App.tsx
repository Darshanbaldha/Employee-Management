import { useEffect, useState } from "react";
import "./App.css";
import type { Employee } from "./types/employee";
import api from "./api/employeeApi";
import { EmployeeList } from "./components/EmployeeList";
import { EmployeeForm } from "./components/EmployeeForm";

function App() {
  // Store the employee data(name, age, city).
  const [employee, setEmployee] = useState<Employee[]>([]);

  // set the default value in input field of form and take the user entered value.
  const [form, setForm] = useState<Employee>({
    name: "",
    age: 0,
    city: "",
  });

  // Set the editId when user click on edit/update button. Otherwise default value is empty string.
  const [editId, setEditId] = useState("");

  // send data(input field value) to backend and set form input field value to default.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== "") {
      await api.put(`/${editId}`, form);
      setEditId("");
    } else {
      await api.post("/", form);
    }
    setForm({ name: "", age: 0, city: "" })

    getEmployee();
  }

  // fetch value from backend.
  const getEmployee = async () => {
    const res = await api.get("/");
    setEmployee(res.data.result);
  }

  // When page first time load call function getEmployee only one time.
  useEffect(() => { getEmployee() }, []);

  // change form default value to employ id value and set edit id.
  const editEmployee = async (emp: Employee) => {
    setForm(emp);
    setEditId(emp._id!)
  }

  // send delete employee request
  const deleteEmployee = async (id: string) => {
    await api.delete(`/${id}`);
    getEmployee();
  }

  return (
    <>
    {/* Call another component. Send some props to it's function.*/}
      <EmployeeForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editId={editId}
      />

      <EmployeeList
        employee={employee}
        editEmployee={editEmployee}
        deleteEmployee={deleteEmployee}
      />
    </>
  )
}

export default App;
