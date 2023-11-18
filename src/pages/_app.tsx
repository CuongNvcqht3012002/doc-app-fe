import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "@/styles/globals.css";
// import Header from "@/components/headerComponents/Header";
// import SideMenu from "@/components/SideMenu";
import { ChakraProvider } from '@chakra-ui/react'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    // <SessionProvider session={session}>
    // <main className="flex h-screen flex-col items-center justify-between overflow-hidden bg-bgc">
    //   <Header />
    //   <section className="mb-5 flex h-full w-screen flex-1 px-5 pr-16">
    //     <div>
    //       <SideMenu />
    //     </div>
    //     <div className="flex flex-1">
    //       <div className="h-[90vh] w-full overflow-hidden rounded-2xl bg-white">
    //         <Component {...pageProps} />
    //       </div>
    //     </div>
    //   </section>
    // </main>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    // </SessionProvider>
  );
};

export default MyApp;
