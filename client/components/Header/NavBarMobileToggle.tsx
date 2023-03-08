import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

type NavBarMobileToggleProps = {
  open: boolean;
  click: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBarMobileToggle = ({ open, click }: NavBarMobileToggleProps) => {
  return open ? (
    <IoMdClose onClick={() => click(!open)} className="text-4xl font-bold" />
  ) : (
    <IoMenu onClick={() => click(!open)} className="text-4xl font-bold" />
  );
};

export default NavBarMobileToggle;
