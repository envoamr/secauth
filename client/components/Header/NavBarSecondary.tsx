import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

const Navbar = () => {
  const router = useRouter();

  // create li elements for each navigation
  // add custom style for the current page's link
  const navLinks = [{ name: "Sign in", href: "/signin" }];

  const navLinksElem = navLinks.map((link) => {
    const linkClass = classNames(
      "lg:block px-2 py-1 text-xl transition-colors duration-150 rounded cursor-pointer md:text-lg font-poppins hover:bg-black hover:text-gray-50 dark:hover:bg-white dark:hover:text-black border border-black dark:border-white",
      {
        "bg-black text-white dark:bg-white dark:text-black": link.href === router.pathname,
      }
    );

    return (
      <li key={link.name}>
        <Link href={link.href}>
          <a className={linkClass}>{link.name}</a>
        </Link>
      </li>
    );
  });
  return (
    <div className="flex flex-row items-center justify-between">
      <nav className="flex flex-row items-center justify-around">
        <ul className="flex flex-row lg:space-x-4">{navLinksElem}</ul>
      </nav>
    </div>
  );
};

export default Navbar;
