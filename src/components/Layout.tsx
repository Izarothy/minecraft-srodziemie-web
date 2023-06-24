import React, { type ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen text-white">
      <main className="flex w-full flex-col items-center  gap-8 bg-[#0e0e12] px-8 py-16 text-white">
        {children}
      </main>
    </div>
  );
};

export default Layout;
