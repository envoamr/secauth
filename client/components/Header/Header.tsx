import NavBarMain from "./NavBarMain";
import NavBarSecondary from "./NavBarSecondary";
import NavBarMobile from "./NavBarMobile";
import NavBarMobileToggle from "./NavBarMobileToggle";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useState, useRef } from "react";
import classNames from "classnames";
import { useEffect } from "react";

type HeaderProps = {
  mobileNavOpen: boolean;
  setMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ mobileNavOpen, setMobileNavOpen }: HeaderProps) => {
  // pass on the header so <NavBarMobile> reads its height
  const headerRef = useRef<HTMLDivElement | any>(null);

  const rootDivRef = useRef<HTMLDivElement | any>(null);
  useEffect(() => {
    rootDivRef.current.style.maxHeight = `${headerRef.current.clientHeight}px`;
  }, []);

  return (
    // flex-1 will stretch this element,
    <div ref={rootDivRef} className="relative flex-1">
      {/* the header including logo, main & secondary nav, themetoggle, and mobilenavtoggle, not the root since the mobile nav appears below the header */}
      <div
        ref={headerRef}
        className="relative z-20 flex items-center justify-between w-full px-2 py-5 m-0 text-black bg-white shadow dark:shadow-white lg:px-28 md:px-18 sm:px-10 dark:text-white dark:bg-black"
      >
        {/* Logo and main site links */}
        <div className="flex-row items-center hidden space-x-8 md:flex justify-evenly ">
          <Logo />
          <NavBarMain />
        </div>

        {/* Mobile nav */}
        <div className="flex flex-row items-center space-x-4 justify-evenly sm:space-x-8 md:hidden">
          <NavBarMobileToggle open={mobileNavOpen} click={setMobileNavOpen} />
          <Logo />
        </div>

        {/* Account links and theme toggle */}
        <div className="flex flex-row items-center justify-between space-x-2 lg:space-x-4">
          <NavBarSecondary />
          <ThemeToggle />
        </div>
      </div>

      {/* Will span the rest of the page's height */}
      {mobileNavOpen && (
        <NavBarMobile
          headerHeight={headerRef.current.clientHeight}
          mobileNavOpen={mobileNavOpen}
          setMobileNavOpen={setMobileNavOpen}
        />
      )}
    </div>
  );
};

export default Header;
