// type EmployeeToolbarProps = {
//     search: string;
//     // setSearch variable is returned by useState.
//     // React.Dispatch is function that changes state.
//     // React.SetStateAction is accept both type of value. 1. Direct value or 2. callback function(return by setState)
//     setSearch: React.Dispatch<React.SetStateAction<string>>;

//     cityFilter: string;
//     setCityFilter: React.Dispatch<React.SetStateAction<string>>;

//     sortBy: string;
//     setSortBy: React.Dispatch<React.SetStateAction<string>>;

//     cities: string[];

//     setPage: React.Dispatch<React.SetStateAction<number>>;
// };

// export function EmployeeToolbar({ search, setSearch, cityFilter, setCityFilter, sortBy, setSortBy, cities, setPage }: EmployeeToolbarProps) {
//     return (
//         <div className="mx-auto mt-6 max-w-5xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
//             <div className="grid gap-4 md:grid-cols-3">

//                 {/* Search */}
//                 <input type="text" placeholder="Search by name" value={search} onChange={(e) => {setSearch(e.target.value); setPage(1);}} className="rounded-lg border border-slate-300 px-4 py-2" />

//                 {/* Filter */}
//                 <select value={cityFilter} onChange={(e) => {setCityFilter(e.target.value); setPage(1);}} className="rounded-lg border border-slate-300 px-4 py-2" >
//                     <option value="">All Cities</option>

//                     {cities.map((city) => (
//                         <option key={city} value={city}>
//                             {city}
//                         </option>
//                     ))}
//                 </select>

//                 {/* Sort */}
//                 <select value={sortBy} onChange={(e) => {setSortBy(e.target.value); setPage(1);}} className="rounded-lg border border-slate-300 px-4 py-2" >
//                     <option value="">Default</option>
//                     <option value="nameAsc">Name A-Z</option>
//                     <option value="nameDesc">Name Z-A</option>
//                     <option value="ageAsc">Age Low → High</option>
//                     <option value="ageDesc">Age High → Low</option>
//                     <option value="newest">Newest First</option>
//                     <option value="oldest">Oldest First</option>
//                 </select>

//             </div>
//         </div>
//     );
// }

type EmployeeToolbarProps = {
    search: string;

    setSearch: React.Dispatch<React.SetStateAction<string>>;

    cityFilter: string;

    setCityFilter: React.Dispatch<React.SetStateAction<string>>;

    sortBy: string;

    setSortBy: React.Dispatch<React.SetStateAction<string>>;

    cities: string[];

    setPage: React.Dispatch<React.SetStateAction<number>>;
};

export function EmployeeToolbar({
    search,
    setSearch,
    cityFilter,
    setCityFilter,
    sortBy,
    setSortBy,
    cities,
    setPage
}: EmployeeToolbarProps) {
    return (
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

            <div className="flex flex-col gap-3 sm:flex-row">

                {/* Search */}
                <div className="min-w-0 flex-1">
                    <label htmlFor="employee-search" className="sr-only" >
                        Search employees
                    </label>

                    <input id="employee-search" type="text" placeholder="Search by name..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
                </div>

                {/* Filter */}
                <div className="w-full sm:w-44">
                    <label htmlFor="city-filter" className="sr-only" >
                        Filter by city
                    </label>

                    <select id="city-filter" value={cityFilter} onChange={(e) => { setCityFilter(e.target.value); setPage(1); }} className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" >
                        <option value="">
                            All Cities
                        </option>

                        {cities.map((city) => (
                            <option key={city} value={city} >
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort */}
                <div className="w-full sm:w-52">
                    <label htmlFor="employee-sort" className="sr-only" >
                        Sort employees
                    </label>

                    <select id="employee-sort" value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }} className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition hover:border-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" >
                        <option value=""> Default </option>

                        <option value="nameAsc"> Name A-Z </option>

                        <option value="nameDesc"> Name Z-A </option>

                        <option value="ageAsc"> Age Low → High </option>

                        <option value="ageDesc"> Age High → Low </option>

                        <option value="newest"> Newest First </option>

                        <option value="oldest"> Oldest First </option>
                    </select>
                </div>
            </div>
        </div>
    );
}