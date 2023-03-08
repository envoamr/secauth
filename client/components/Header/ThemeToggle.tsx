import { useDispatch } from "react-redux";
import { toggleTheme } from "../../store/darkmode";
import { BsLightbulbFill } from "react-icons/bs";

const DarkMode = () => {
  const dispatch = useDispatch();
  return (
    <div onClick={() => dispatch(toggleTheme())} className="p-1 cursor-pointer">
      <BsLightbulbFill className="text-lg text-black cursor-pointer dark:text-white" />
    </div>
  );
};

export default DarkMode;
