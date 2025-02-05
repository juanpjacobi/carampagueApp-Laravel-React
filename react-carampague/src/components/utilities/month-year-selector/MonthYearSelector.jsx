
const MonthYearSelector = ({ month, year, setMonth, setYear }) => {
    const handleChange = (e) => {
      const [yearSelected, monthSelected] = e.target.value.split("-");
      setMonth(monthSelected);
      setYear(yearSelected);
    };
  
    return (
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
        <label htmlFor="monthYear" className="font-semibold text-lg text-gray-700">
          Periodo:
        </label>
        <input
          id="monthYear"
          type="month"
          value={`${year}-${month}`} 
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  };
  
  export default MonthYearSelector;
  