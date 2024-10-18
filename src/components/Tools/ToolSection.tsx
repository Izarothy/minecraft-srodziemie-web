import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const ToolSection = ({ children }: Props) => {
  return (
    <div className="w-full rounded-md border border-gray-700 bg-dark px-8 py-4">
      {children}
    </div>
  );
};

export default ToolSection;
