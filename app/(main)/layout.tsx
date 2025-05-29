"use client";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <Headers /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
