// import type { Employee } from "../types/employee";

// // create a type so EmployeeForm can accept those value. If any thing missing then ts gives error.
// type EmployeeFormProps = {
//     // form variable must follow Employee type.
//     form: Employee;
//     // setForm variable is returned by useState.
//     // React.Dispatch is function that changes state.
//     // React.SetStateAction is accept both type of value. 1. all(name, age, city) values. 2. only one value with other old value({ ...form, name: e.target.value })
//     setForm: React.Dispatch<React.SetStateAction<Employee>>;
//     // This variable receives form event and return nothings.
//     handleSubmit: (e: React.SubmitEvent) => void;
//     editId: string;
// };

// // This all props are give to EmployeeForm and its type are similear to EmployeeFormProps.
// // export function EmployeeForm({ form, setForm, handleSubmit, editId }: EmployeeFormProps) {
// //     return (
// //         <>
// //             <section>
// //                 {/* Form contains name, age and city fields. */}
// //                 <form onSubmit={handleSubmit}>
// //                     <label htmlFor="name">Enter Name:</label>
// //                     <input type="text" name="name" id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

// //                     <label htmlFor="age">Enter Age:</label>
// //                     <input type="number" name="age" id="age" value={form.age == 0 ? "" : form.age} onChange={(e) => setForm({ ...form, age: Number(e.target.value) })} />

// //                     <label htmlFor="city">Enter City:</label>
// //                     <input type="text" name="city" id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />

// //                     <button type="submit">{editId ? "Update" : "Submit"}</button>
// //                 </form>
// //             </section>
// //         </>
// //     );
// // }

// export function EmployeeForm({ form, setForm, handleSubmit, editId }: EmployeeFormProps) {
//     return (
//         <section className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-md border border-slate-100">
//             <h2 className="mb-6 text-xl font-semibold text-slate-800">
//                 {editId ? "Edit Employee Details" : "Add New Employee"}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-5">
//                 <div>
//                     <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
//                         Full Name
//                     </label>
//                     <input type="text" name="name" id="name" autoComplete="name" placeholder="e.g. Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                 </div>

//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                     <div>
//                         <label htmlFor="age" className="mb-1.5 block text-sm font-medium text-slate-700">
//                             Age
//                         </label>
//                         <input type="number" name="age" id="age" autoComplete="off" placeholder="e.g. 28" value={form.age === 0 ? "" : form.age} onChange={(e) => setForm({ ...form, age: Number(e.target.value) })} className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                     </div>

//                     <div>
//                         <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-slate-700">
//                             City
//                         </label>
//                         <input type="text" name="city" id="city" autoComplete="address-level2" placeholder="e.g. San Francisco" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
//                     </div>
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition active:scale-[0.99]"
//                 >
//                     {editId ? "Update Employee" : "Submit Employee"}
//                 </button>
//             </form>
//         </section>
//     );
// }

import type { Employee } from "../types/employee";

type EmployeeFormProps = {
    form: Employee;

    setForm: React.Dispatch<React.SetStateAction<Employee>>;

    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;

    editId: string;
};

export function EmployeeForm({
    form,
    setForm,
    handleSubmit,
    editId,
}: EmployeeFormProps) {
    return (
        <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                    {editId ? "Edit Employee Details" : "Add New Employee"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {editId ? "Update the employee information below." : "Enter the employee information below."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" >

                {/* Full Name */}
                <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700" >
                        Full Name
                    </label>

                    <input type="text" name="name" id="name" autoComplete="name" placeholder="e.g. Jane Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value }) } className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10" />
                </div>

                {/* Age + City */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    {/* Age */}
                    <div>
                        <label htmlFor="age" className="mb-1.5 block text-sm font-medium text-slate-700">
                            Age
                        </label>

                        <input type="number" name="age" id="age" autoComplete="off" placeholder="e.g. 28" value={form.age === 0 ? "" : form.age} onChange={(e) => setForm({...form, age: Number(e.target.value) }) }  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10" />
                    </div>

                    {/* City */}
                    <div>
                        <label  htmlFor="city" className="mb-1.5 block text-sm font-medium text-slate-700"  >
                            City
                        </label>
                        <input type="text" name="city"  id="city" autoComplete="address-level2"  placeholder="e.g. Ahmedabad" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value }) } className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10" />
                    </div>
                </div>

                {/* Submit */}
                <button type="submit" className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.99]" >
                    {editId ? "Update Employee" : "Submit Employee"}
                </button>
            </form>
        </section>
    );
}