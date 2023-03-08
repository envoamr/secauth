type FormHeaderProps = {
  text: string;
};

const FormHeader = ({ text }: FormHeaderProps) => {
  return <h2 className="text-6xl text-center text-black font-poppins dark:text-white">{text}</h2>;
};

export default FormHeader;
