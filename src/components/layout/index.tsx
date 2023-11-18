import { ReactNode } from 'react';
// import useRouter if you need it
import Header from "@/components/headerComponents/Header";
import SideMenu from "@/components/SideMenu";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // const router = useRouter(); // Uncomment if router is used

  return (
    <main className="flex h-screen flex-col items-center justify-between overflow-hidden bg-bgc">
      <Header />
      <section className="mb-5 flex h-full w-screen flex-1 px-5 pr-16">
        <div>
          <SideMenu />
        </div>
        <div className="flex flex-1">
          <div className="h-[90vh] w-full overflow-hidden rounded-2xl bg-white">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Layout;
