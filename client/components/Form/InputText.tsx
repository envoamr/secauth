import React, { useRef } from "react";
import { IconType } from "react-icons";

type InputTextProps = {
  type: string;
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  focusFirst?: boolean;
  Icon?: IconType;
  iconSize?: string;
  unFocus?: () => void;
};

const InputText = ({
  type,
  label,
  placeholder,
  focusFirst,
  Icon,
  iconSize,
  unFocus,
  setValue,
}: InputTextProps) => {
  return (
    <div className="flex flex-col space-y-3">
      <label>{label}</label>
      <div className="flex flex-row items-center pb-2 space-x-4 font-sans border-b-2 border-black dark:border-white">
        {Icon && <Icon className={`${iconSize ? iconSize : "text-2xl"} bg-transparent`} />}
        <input
          onBlur={unFocus}
          autoFocus={focusFirst}
          className="w-full text-lg outline-none dark:bg-black"
          type={type}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputText;
