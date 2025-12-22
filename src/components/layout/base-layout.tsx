import { ScrollToTop } from "@/components/common/scroll-to-top";
import { FooterMobile } from "@/components/layout/header/mobile";
import { getConfig } from "@/helper";
import { useConfig } from "@/hooks/useConfig";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Footer } from "./footer";
import { Header } from "./header";
import { useGetCart } from "@/controllers/cartController";
import { useGetWishlist } from "@/controllers/wishlistController";
import nprogress from "nprogress";

export const BaseLayout = ({
  children,
  className,
  isContainer,
}: {
  children: React.ReactNode;
  className?: string;
  isContainer?: boolean;
}) => {
  useGetCart();
  useGetWishlist();
  const config = useConfig();
  const location = useLocation();
  const isSticky = getConfig(config, "header_stikcy")?.value;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    nprogress.start();
    nprogress.done();
  }, [location.pathname]);

  return (
    <section className="min-h-screen flex flex-col">
      <header
        className={`bg-primary text-white ${
          isSticky ? "sticky top-0 z-50" : ""
        }`}>
        <Header />
      </header>

      <section className="flex-1 flex gap-0 md:gap-4 overflow-hidden bg-background">
        <aside className="hidden md:flex flex-col w-80 fixed z-40 h-full left-0 bg-gray-50 border-r">
          <Sidebar />
        </aside>

        <section className={`flex-1 overflow-y-auto ml-0 md:ml-80 bg-white`}>
          <section
            className={`${className ? className : ""} ${
              isContainer ? "container mx-auto" : ""
            }`}>
            {children}
          </section>
          <Footer />
        </section>
      </section>
      <footer>
        <FooterMobile />
      </footer>

      <ScrollToTop />
    </section>
  );
};
