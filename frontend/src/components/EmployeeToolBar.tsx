type EmployeeToolbarProps = {
    search: string;
    // setSearch variable is returned by useState.
    // React.Dispatch is function that changes state.
    // React.SetStateAction is accept both type of value. 1. Direct value or 2. callback function(return by setState)
    setSearch: React.Dispatch<React.SetStateAction<string>>;

    cityFilter: string;
    setCityFilter: React.Dispatch<React.SetStateAction<string>>;

    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;

    cities: string[];
};

export function EmployeeToolbar({ search, setSearch, cityFilter, setCityFilter, sortBy, setSortBy, cities }: EmployeeToolbarProps) {
    return (
        <div className="mx-auto mt-6 max-w-5xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-3">

                {/* Search */}
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-lg border border-slate-300 px-4 py-2" />

                {/* Filter */}
                <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="rounded-lg border border-slate-300 px-4 py-2" >
                    <option value="">All Cities</option>

                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>

                {/* Sort */}
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-lg border border-slate-300 px-4 py-2" >
                    <option value="">Default</option>
                    <option value="nameAsc">Name A-Z</option>
                    <option value="nameDesc">Name Z-A</option>
                    <option value="ageAsc">Age Low → High</option>
                    <option value="ageDesc">Age High → Low</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>

            </div>
        </div>
    );
}