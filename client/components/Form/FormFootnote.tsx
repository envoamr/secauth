import Link from "next/link";

type FormFootnoteProps = {
  textBefore?: string;
  textAfter?: string;
  link?: {
    text: string;
    href: string;
  };
};

const FormFootnote = ({ textBefore, link, textAfter }: FormFootnoteProps) => {
  return (
    <p>
      {textBefore} {textBefore ? " " : ""}
      {link && (
        <Link href={link.href} passHref>
          <a className="underline">{link.text}</a>
        </Link>
      )}
      {textAfter ? " " : ""} {textAfter}
    </p>
  );
};

export default FormFootnote;
