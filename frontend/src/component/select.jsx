// type Option = {
//     value: string;
//     displayName: string;
//   };

//   type SelectProps = {
//     option: Option[];
//     label: string;
//     getvalue: (selectedValue: string) => void;
//   };

export default function Select(props) {
  const { option, label, value, onChange } = props;

  return (
    <>
      <p>{label}</p>
      <select onChange={onChange} value={value}>
        {option &&
          Array.isArray(option) &&
          option.map((x, i) => (
            <option key={i} value={x.value}>
              {x.displayName}
            </option>
          ))}
      </select>
    </>
  );
}
