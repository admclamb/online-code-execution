import { ReactNode } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <header>
        <Navbar />
      </header>
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
