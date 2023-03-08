const BtnSubmit = ({ text, clicked }: { text: string; clicked?: () => Promise<void> }) => {
  return (
    <button
      onClick={clicked}
      className="self-center px-4 py-2 duration-75 border-2 border-black border-solid rounded-md outline-none active:scale-95 active:text-white1 active:bg-black1 dark:active:bg-white1 dark:border-white dark:active:text-black1"
    >
      {text}
    </button>
  );
};

export default BtnSubmit;
