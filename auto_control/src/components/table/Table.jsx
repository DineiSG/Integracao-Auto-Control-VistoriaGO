import React from "react";

function Table({ data, columns }) {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="px-4 py-2">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col.key} className="border px-4 py-2">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;