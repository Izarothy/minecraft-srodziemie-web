import React, { type ReactNode } from "react";
import Footer from "./Footer";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col bg-dark text-white">
      <main className="flex w-full flex-col items-center gap-8  bg-dark text-white">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
