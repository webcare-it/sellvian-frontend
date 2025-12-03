import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/header/logo";
import { Heart, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { UserProfile } from "./user";
import { useSelector } from "react-redux";
import type { RootStateType } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { SearchAction } from "./search";

export const DesktopHeader = () => {
  const cart = useSelector((state: RootStateType) => state.cart.items);
  const wishlist = useSelector((state: RootStateType) => state.wishlist.items);

  return (
    <div className="hidden px-6 py-1.5 md:py-3 md:flex items-center justify-between gap-4">
      <div className="flex-shrink-0">
        <Logo type="DESKTOP" />
      </div>

      <SearchAction />

      <div className="hidden md:flex items-center gap-6 flex-shrink-0">
        <Link to="/track-order">
          <Button variant="secondary" className={cn("hover:bg-white bg-white")}>
            <TrackIcon height="20px" width="20px" />
            Track Order
          </Button>
        </Link>

        <ButtonLink icon={Heart} path="/wishlist" count={wishlist?.length} />
        <CartBagIcon count={cart?.length} />
        <UserProfile />
      </div>
    </div>
  );
};

interface IconLinkProps {
  icon: LucideIcon;
  path: string;
  count?: number;
}

export const IconLink = ({ icon, path, count }: IconLinkProps) => {
  const Icon = icon;

  return (
    <Link to={path}>
      <button className="relative cursor-pointer">
        <Icon className="h-6 w-6 text-white" />
        {count && <BadgeCount count={count} />}
      </button>
    </Link>
  );
};

const ButtonLink = ({ icon, path, count }: IconLinkProps) => {
  const Icon = icon;

  return (
    <Link to={path}>
      <div className="relative p-2.5 bg-white rounded-full flex items-center justify-center">
        <Icon className="w-4 h-4 text-black font-medium" />
        {count && count > 0 ? <BadgeCount count={count} /> : null}
      </div>
    </Link>
  );
};

const BadgeCount = ({ count }: { count: number }) => {
  return (
    <span className="absolute -top-3 -right-3 bg-white text-black rounded-full text-[10px] font-medium h-5 w-5 flex items-center justify-center">
      <span>{count}</span>
    </span>
  );
};

const CartBagIcon = ({ count }: { count: number }) => {
  return (
    <Link to="/cart">
      <div className="relative p-2.5 bg-white rounded-full flex items-center justify-center">
        <svg
          stroke="black"
          fill="black"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="16px"
          width="16px"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M7.00488 7.99966V5.99966C7.00488 3.23824 9.24346 0.999664 12.0049 0.999664C14.7663 0.999664 17.0049 3.23824 17.0049 5.99966V7.99966H20.0049C20.5572 7.99966 21.0049 8.44738 21.0049 8.99966V20.9997C21.0049 21.5519 20.5572 21.9997 20.0049 21.9997H4.00488C3.4526 21.9997 3.00488 21.5519 3.00488 20.9997V8.99966C3.00488 8.44738 3.4526 7.99966 4.00488 7.99966H7.00488ZM7.00488 9.99966H5.00488V19.9997H19.0049V9.99966H17.0049V11.9997H15.0049V9.99966H9.00488V11.9997H7.00488V9.99966ZM9.00488 7.99966H15.0049V5.99966C15.0049 4.34281 13.6617 2.99966 12.0049 2.99966C10.348 2.99966 9.00488 4.34281 9.00488 5.99966V7.99966Z"></path>
        </svg>
        {count && count > 0 ? <BadgeCount count={count} /> : null}
      </div>
    </Link>
  );
};

export const TrackIcon = ({
  height,
  width,
}: {
  height: string;
  width: string;
}) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 640 512"
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M0 48C0 21.5 21.5 0 48 0L368 0c26.5 0 48 21.5 48 48l0 48 50.7 0c17 0 33.3 6.7 45.3 18.7L589.3 192c12 12 18.7 28.3 18.7 45.3l0 18.7 0 32 0 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c0 53-43 96-96 96s-96-43-96-96l-128 0c0 53-43 96-96 96s-96-43-96-96l-16 0c-26.5 0-48-21.5-48-48L0 48zM416 256l128 0 0-18.7L466.7 160 416 160l0 96zM160 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm368-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM257 95c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39L96 168c-13.3 0-24 10.7-24 24s10.7 24 24 24l166.1 0-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9L257 95z"></path>
    </svg>
  );
};
