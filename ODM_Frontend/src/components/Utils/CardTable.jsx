const CardTable = ({ columns = [], data = [] }) => {
  return (
    <div className="card mt-5">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table text-dark font-bold text-center">
          <thead className="nav-bg">
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.map((row, rowIndex) => (
              <tr key={row?.id ?? `row-${rowIndex}`}>
                {columns.map((col) => (
                  <td key={`${row?.id ?? rowIndex}-${col.key}`}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : row?.[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardTable;
