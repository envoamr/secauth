type InputTextErrListProps = {
  errors: string[];
};

const InputTextErrList = ({ errors }: InputTextErrListProps) => {
  return (
    <ul className="px-2 py-4 shadow-md font-mono text-sm bg-gray-200 flex flex-col space-y-2 dark:bg-[#121212] max-w-sm">
      {errors.map((err) => (
        // change key=err to an int instead of a whole str
        <li key={err}>{"· " + err}</li>
      ))}
    </ul>
  );
};

export default InputTextErrList;
