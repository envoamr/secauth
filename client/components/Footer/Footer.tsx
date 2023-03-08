import { useSelector } from "react-redux";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" border-t border-white max-h-[78px] z-10 flex flex-row items-center justify-center flex-1 p-5 text-black bg-white justify-self-end dark:bg-black dark:text-white">
      <span className="mr-1 text-lg">Check it on</span>
      <span className="ml-1 text-2xl hover:opacity-80">
        <a target="_blank" rel="noreferrer" href="https://www.github.com/envoamr/secauth">
          <FaGithub />
        </a>
      </span>
    </div>
  );
};

export default Footer;
