import React, { FC, PropsWithChildren } from "react";
import Header from "./header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
