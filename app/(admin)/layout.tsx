import { ReactNode } from "react";
import { Sidebar } from "./_components/Sidebar";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      {props.children}
    </div>
  );
};

export default Layout;
