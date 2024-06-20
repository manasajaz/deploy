// type propsType = {
//   label?: string,
//   onClick?: any,
//   value?: any,
//   endIcon?: any,
// };
function BAbutton(props) {
  const { label, onClick, value } = props;

  return (
    <>
      <button
        value={value}
        onClick={onClick}
        className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white p-2  rounded-xl w-100"
      >
        {label}
      </button>
    </>
  );
}

export default BAbutton;
