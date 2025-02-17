import React from "react";

export const FilterSearchBar = ({
  searchValue,
  onSearchChange,
  filterActive,
  onActiveChange,
  filterInactive,
  onInactiveChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-4 w-1/3">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={filterActive}
            onChange={onActiveChange}
          />
          Activos
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={filterInactive}
            onChange={onInactiveChange}
          />
          Inactivos
        </label>
      </div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchValue}
        onChange={onSearchChange}
        className="border p-2 rounded w-full "
      />
    </div>
  );
};
