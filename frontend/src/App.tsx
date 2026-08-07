import { useCallback, useEffect, useState } from "react";
import "./App.css";
import type { Employee } from "./types/employee";
import api from "./api/employeeApi";
import { EmployeeList } from "./components/EmployeeList";
import { EmployeeForm } from "./components/EmployeeForm";
import { EmployeeToolbar } from "./components/EmployeeToolBar";
import { AxiosError } from "axios";
import { Login } from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup";

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
  const [editId, setEditId] = useState<string | "">("");

  // set the search state.
  const [search, setSearch] = useState<string | "">("");

  // set city filter state.
  const [cityFilter, setCityFilter] = useState("");

  // Add sort state.
  const [sortBy, setSortBy] = useState("");

  // Store all city names seperately.
  const [cities, setCities] = useState<string[]>([]);

  // Current page
  const [page, setPage] = useState(1);

  // Number of records per page
  const limit = 5;

  // Total pages from backend
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState<boolean>(false);

  // Store API error message
  const [error, setError] = useState("");

  // user login or not.
  // check if token is already exists or not.
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));

  // send data(input field value) to backend and set form input field value to default.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");

      if (editId !== "") {
        await api.put(`/employee/${editId}`, form);
        setEditId("");
      } else {
        await api.post("/employee", form);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to save employee.");
      }
    }
    setForm({ name: "", age: 0, city: "" })

    getEmployee();
  }

  // fetch value from backend.
  const getEmployee = useCallback(async () => {
    try {
      setLoading(true);
      setError("")
      const res = await api.get("/employee", {
        params: {
          search,
          city: cityFilter,
          sort: sortBy,
          page,
          limit
        },
      });
      setEmployee(res.data.result);
      setTotalPages(res.data.totalPages);
    } catch (err: unknown) {

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch employees.");
      }

    } finally {
      setLoading(false);
    }
  }, [search, cityFilter, sortBy, page]);

  // When changes happen in getemployee function the render this useEffect.
  // useEffect(() => { getEmployee() }, [getEmployee]);
  useEffect(() => {
    if (!isLoggedIn) return;

    void getEmployee();
  }, [isLoggedIn, getEmployee]);

  // Fetch all the cities.
  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchCities = async () => {
      try {
        const res = await api.get("/employee/cities");
        setCities(res.data.cities);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch cities.");
        }
      }
    };
    void fetchCities();
  }, [isLoggedIn]);

  // change form default value to employ id value and set edit id.
  const editEmployee = async (emp: Employee) => {
    setForm(emp);
    setEditId(emp._id!)
  }

  // send delete employee request
  const deleteEmployee = async (id: string) => {
    try {
      setError("");
      await api.delete(`/employee/${id}`);
      getEmployee();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message ?? "Something went wrong.");
      } else {
        setError("Employee not deleted.");
      }
    }
  }

  // Create page numbers.
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  if (!isLoggedIn) {
    return (
      <Login setIsLoggedIn={setIsLoggedIn} />
    )
  }

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </BrowserRouter>

      <button onClick={logout} className="rounded bg-red-600 px-4 py-2 text-white" >
        Logout
      </button>
      {/* Call another component. Send some props to it's function.*/}
      <EmployeeForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editId={editId}
      />

      <EmployeeToolbar
        search={search}
        setSearch={setSearch}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        cities={cities}
        setPage={setPage}
      />

      <EmployeeList
        employee={employee}
        editEmployee={editEmployee}
        deleteEmployee={deleteEmployee}
        loading={loading}
        error={error}
      />

      <div className="mt-8 flex items-center justify-center gap-2">

        {/* Previous */}
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="rounded-md border px-3 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={`rounded-md px-3 py-2 border transition
            ${page === number
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white hover:bg-slate-100"
              }`}
          >
            {number}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="rounded-md border px-3 py-2 disabled:opacity-40"
        >
          Next
        </button>

      </div>
    </>
  )
}

export default App;
