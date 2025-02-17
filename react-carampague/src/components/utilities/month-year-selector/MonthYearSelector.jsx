// MonthYearSelector.jsx
import React from "react";

const MonthYearSelector = ({ month, year, setMonth, setYear }) => {
  const value = month && year ? `${year}-${month.padStart(2, "0")}` : "";

  const handleChange = (e) => {
    const newValue = e.target.value; 
    if (newValue) {
      const [selectedYear, selectedMonth] = newValue.split("-");
      setYear(selectedYear);
      setMonth(selectedMonth);
    } else {
      setYear("");
      setMonth("");
    }
  };

  return (
    <div className="flex flex-col">
          <span className="font-bold text-md">Periodo:</span>

      <input
        type="month"
        value={value}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
  );
};

export default MonthYearSelector;



  