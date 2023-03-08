import classNames from "classnames";
import { useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { BiLibrary } from "react-icons/bi";
import { FaHandsHelping } from "react-icons/fa";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type NavBarMobileProps = {
  headerHeight: number;
  mobileNavOpen: boolean;
  setMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBarMobile = ({ headerHeight, mobileNavOpen, setMobileNavOpen }: NavBarMobileProps) => {
  // make links
  const navLinks = [
    { name: "Public", href: "/public", icon: BsGlobe },
    { name: "Library", href: "/library", icon: BiLibrary },
    { name: "Contribute", href: "/contribute", icon: FaHandsHelping },
  ];

  const navLinksElem = navLinks.map((link) => {
    // used passHref to add classes to the <a> tag instead of <li> for padding
    return (
      <li className="w-full border-0 border-b border-black" key={link.name}>
        <Link href={link.href} passHref>
          <a
            className="flex flex-row items-center justify-start w-full pl-5 space-x-4 text-5xl cursor-pointer font-poppins focus:bg-black focus:text-gray-50 dark:focus:bg-white dark:focus:text-black"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <link.icon />
            <span>{link.name}</span>
          </a>
        </Link>
        <hr />
      </li>
    );
  });

  return (
    <div
      style={{
        paddingTop: headerHeight,
        paddingBottom: headerHeight,
        top: 0,
        zIndex: 10,
      }}
      className="fixed w-screen h-screen text-black bg-white dark:bg-black dark:text-white"
    >
      <nav className="h-full">
        <ul className="flex flex-col justify-center h-full space-y-16">{navLinksElem}</ul>
      </nav>
    </div>
  );
};

export default NavBarMobile;
