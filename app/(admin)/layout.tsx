import { ReactNode } from "react";
import { Sidebar } from "./_components/Sidebar";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gray-100 p-4">
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
