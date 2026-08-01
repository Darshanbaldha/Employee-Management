import type { Employee } from "../types/employee";

// create a type so EmployeeList can accept those value. If any thing missing then ts gives error.
type EmployeeListProps = {
    // employee variable takes the Array of Employee Type.
    employee: Employee[];
    // This receives the one employee type data and returns nothings.
    editEmployee: (emp: Employee) => void;
    // This Takes the id in string formate and returns nothings.
    deleteEmployee: (id: string) => void;
};

// This all props are give to EmployeeList and its type are similear to EmployeeListProps.
// export function EmployeeList({ employee, editEmployee, deleteEmployee }: EmployeeListProps) {
//     return (
//         <section>
//             {/* Shows data of employee in table formate. */}
//             {employee.map((emp) => (
//                 <>
//                     <p>Employee Data</p>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Id</th>
//                                 <th>Name</th>
//                                 <th>Age</th>
//                                 <th>City</th>
//                                 <th>Options</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr key={emp._id}>
//                                 <td>{emp._id}</td>
//                                 <td>{emp.name}</td>
//                                 <td>{emp.age}</td>
//                                 <td>{emp.city}</td>
//                                 <td>
//                                     <button onClick={() => editEmployee(emp)}>Edit</button>
//                                     <button onClick={() => deleteEmployee(emp._id!)}>Delete</button>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </>
//             ))}
//         </section>
//     )
// }

export function EmployeeList({ employee, editEmployee, deleteEmployee }: EmployeeListProps) {
    return (
        <section className="mt-8 overflow-hidden rounded-2xl bg-white shadow-md border border-slate-100">
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <h3 className="text-base font-semibold text-slate-800">Employee Directory</h3>
            </div>

            {/* {employee.length === 0 ? ( */}
            {(employee ?? []).length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">
                    No employees found. Fill out the form above to add one.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                            <tr>
                                <th scope="col" className="px-6 py-3.5">Id</th>
                                <th scope="col" className="px-6 py-3.5">Name</th>
                                <th scope="col" className="px-6 py-3.5">Age</th>
                                <th scope="col" className="px-6 py-3.5">City</th>
                                <th scope="col" className="px-6 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                            {employee.map((emp) => (
                                <tr key={emp._id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-400">
                                        {emp._id}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                                        {emp.name}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">{emp.age}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{emp.city}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => editEmployee(emp)}
                                            className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteEmployee(emp._id!)}
                                            className="rounded-md bg-rose-50 border border-rose-100 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-100 hover:text-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}