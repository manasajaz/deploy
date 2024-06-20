// type propsType = {
//   type?: string,
//   label: string,
//   onChange?: any,
//   value?: any,
// };

export default function BAinput(props) {
  const { label, onChange, type, value } = props;

  return (
    <input
      className="p-2  border-2 border-indigo-200 focus:border-indigo-100 w-full outline-none rounded "
      placeholder={label}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
}
