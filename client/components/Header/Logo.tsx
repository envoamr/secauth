import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" passHref>
      <p className="text-3xl tracking-wider select-none font-audiowide lg:text-4xl">secauth</p>
    </Link>
  );
};

export default Logo;
