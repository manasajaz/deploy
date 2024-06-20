// type tableprops = {
//   label: string,
//   datasource: any[],
//   cols: any[],
// };

export default function Table(props) {
  const { datasource, header } = props;

  return (
    <>
      <div>
        <table className="w-[100%] text-center text-white my-5">
          <thead className="bg-gradient-to-r from-indigo-600 to-pink-500">
            <tr>
              {header.map((x, i) => (
                <th key={i}>{x}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gradient-to-r from-indigo-400 to-pink-300">
            {datasource && datasource.length > 0 ? (
              datasource.map((row, i) => (
                <tr key={i}>
                  {header.map((col, i) => (
                    <td key={i}>{row[col.key]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={header.length}>no data found</td>
              </tr>
            )}
            {/* {datasource && datasource.length > 0 ? (
              datasource.map((row, rowindex) => (
                <tr key={rowindex}>
                  {header.map((col, i) => (
                    <td key={i}>{row[col.key]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={header.length}>no data found</td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>
    </>
  );
}
