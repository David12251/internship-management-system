import React from 'react';

const Table = ({ columns, data, onAction }) => {
  return (
    <table className='w-full border-collapse'>
      <thead>
        <tr className='bg-gray-200'>
          {columns.map((col) => (
            <th key={col.key} className='p-2 border'>
              {col.label}
            </th>
          ))}
          {onAction && <th className='p-2 border'>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className='border'>
            {columns.map((col) => (
              <td key={col.key} className='p-2 border'>
                {row[col.key]}
              </td>
            ))}
            {onAction && <td className='p-2 border'>{onAction(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
