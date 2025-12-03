import {
  Home,
  LayoutGrid,
  Handbag,
  type LucideIcon,
  Heart,
  Search,
  ArrowLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootStateType } from "@/redux/store";
import { cn } from "@/lib/utils";
import { UserProfile } from "./user";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isPathActive } from "@/helper";
import { Logo } from "@/components/layout/header/logo";
import { SearchAction } from "./search";
import { TrackIcon } from "./desktop";

export const HeaderMobile = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleBackClick = () => {
    setIsSearchOpen(false);
  };

  const searchBar = useMemo(() => {
    return (
      <div className="flex-1">
        <SearchAction ref={searchInputRef} />
      </div>
    );
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  }, [isSearchOpen]);

  return (
    <nav
      className={`md:hidden py-1 bg-primary backdrop-blur-3xl sticky top-0 left-0 right-0 z-[60]`}>
      <AnimatePresence mode="wait">
        {!isSearchOpen ? (
          <motion.div
            key="logo-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-between px-4">
            <div>
              <Logo type="MOBILE" />
            </div>
            <div className="flex justify-end items-center gap-4">
              <Link to="/track-order">
                <TrackIcon height="20px" width="30px" />
              </Link>
              <button onClick={handleSearchClick}>
                <Search className="h-6 w-6 text-white font-bold" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="search-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-between px-2 gap-2">
            <ArrowLeft
              onClick={handleBackClick}
              className="h-6 w-6 text-white"
            />
            {searchBar}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const FooterMobile = () => {
  const location = useLocation();
  const cart = useSelector((state: RootStateType) => state.cart.items);
  const wishlist = useSelector((state: RootStateType) => state.wishlist.items);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full">
      <nav className="bg-white border-t border-border">
        <div className="flex justify-around items-center py-1.5">
          <MenuItem activePath={location.pathname} href="/" icon={Home}>
            Home
          </MenuItem>
          <Link
            to="/categories"
            className="flex flex-col items-center justify-center min-w-0 flex-1">
            <LayoutGrid
              className={cn(
                "h-5 w-5 mb-1",
                location.pathname.startsWith("/categories")
                  ? "text-primary"
                  : "text-foreground"
              )}
            />
            <span
              className={cn(
                "text-[10px] font-medium",
                location.pathname.startsWith("/categories")
                  ? "text-primary"
                  : "text-foreground"
              )}>
              Categories
            </span>
          </Link>
          <Link
            to="/cart"
            className="flex flex-col items-center justify-center min-w-0 flex-1 relative">
            <div className="bg-primary border-2 border-white rounded-full p-2 -mt-8 mb-1">
              <Handbag className="h-8 w-8 text-white" />
            </div>
            <span className="text-[10px] text-foreground font-medium">
              Cart ({cart?.length})
            </span>
          </Link>

          <Link
            to={"/wishlist"}
            className="relative flex flex-col items-center justify-center min-w-0 flex-1">
            {wishlist?.length > 0 && (
              <div className="absolute -top-2 right-3 bg-primary text-white rounded-full text-[10px] font-medium w-4 h-4 flex items-center justify-center">
                <span> {wishlist?.length}</span>
              </div>
            )}
            <Heart
              className={cn(
                "h-5 w-5 mb-1",
                isPathActive(location.pathname, "/wishlist")
                  ? "text-primary"
                  : "text-foreground"
              )}
            />
            <span
              className={`text-[10px] text-foreground font-medium ${
                isPathActive(location.pathname, "/wishlist")
                  ? "text-primary"
                  : "text-foreground"
              }`}>
              Wishlist
            </span>
          </Link>
          <div className="flex flex-col items-center justify-center min-w-0 flex-1">
            <UserProfile variant="mobile" />
          </div>
        </div>
      </nav>
    </div>
  );
};

interface MenuItemProps {
  children: React.ReactNode;
  href: string;
  activePath: string;
  icon: LucideIcon;
}

const MenuItem = ({
  children,
  href,
  icon: Icon,
  activePath,
}: MenuItemProps) => {
  const isActive = isPathActive(activePath, href);
  return (
    <Link
      to={href}
      className="flex flex-col items-center justify-center min-w-0 flex-1">
      {Icon && (
        <Icon
          className={cn(
            "h-5 w-5 mb-1",
            isActive ? "text-primary" : "text-foreground"
          )}
        />
      )}
      <span
        className={cn(
          "text-[10px] font-medium",
          isActive ? "text-primary" : "text-foreground"
        )}>
        {children}
      </span>
    </Link>
  );
};
