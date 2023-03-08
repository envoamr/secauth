import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useState, useEffect } from "react";
import { initTheme } from "../store/darkmode";
import { RootState } from "../store/store";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const isDarkTheme = useSelector((state: RootState) => state.darkTheme.isDarkTheme);

  // after mount get darkmode from localstorage
  const dispatch = useDispatch();
  useEffect(() => {
    if (window) dispatch(initTheme());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if mobile nav open, hide <main> and <Footer> to disable scrolling
  // it's passed to <Header> to change the themetoggle icon
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div
      className={classNames("flex flex-col bg-white dark:bg-black min-h-screen", {
        dark: isDarkTheme,
      })}
    >
      <Header mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />
      <main className={classNames("flex-1 flex justify-center", { hidden: mobileNavOpen })}>{children}</main>
      {!mobileNavOpen && <Footer />}
    </div>
  );
};

export default Layout;
