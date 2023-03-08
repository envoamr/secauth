import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  // create li elements for each navigation
  // add custom style for the current page's link
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Public", href: "/public" },
    { name: "Library", href: "/library" },
    { name: "Contribute", href: "/contribute" },
  ];

  const navLinksElem = navLinks.map((link) => {
    const linkClass = classNames(
      "px-2 py-1 text-xl transition-colors duration-150 rounded cursor-pointer md:text-lg font-poppins hover:bg-black hover:text-gray-50 dark:hover:bg-white dark:hover:text-black",
      {
        "bg-black text-white dark:bg-white dark:text-black": link.href === "/" + router.asPath.split("/")[1], // highlight current page
      }
    );

    // used passHref to add classes to the <a> tag instead of <li> for padding
    return (
      <li key={link.name}>
        <Link href={link.href} passHref>
          <a className={linkClass}>{link.name}</a>
        </Link>
      </li>
    );
  });

  return (
    <div className="flex-row items-center justify-between hidden md:flex">
      <nav className="flex flex-row items-center justify-around">
        <ul className="flex flex-row space-x-4">{navLinksElem}</ul>
      </nav>
    </div>
  );
};

export default Navbar;
