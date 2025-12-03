import { User, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useGetUserQuery } from "@/api/queries/useUser";
import {
  getGuestUserId,
  getProfileImage,
  getUUID,
  isAuthenticated,
} from "@/helper";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { ProfileCard } from "@/components/card/profile";
import type { UserType } from "@/type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface Props {
  variant?: "desktop" | "mobile";
}

export const UserProfile = ({ variant = "desktop" }: Props) => {
  const location = useLocation();
  const { data } = useGetUserQuery();
  const user = data?.user as unknown as UserType;
  useEffect(() => {
    if (!getGuestUserId() && !isAuthenticated()) {
      const guestUserId = getUUID();
      localStorage.setItem("guest_user_id", guestUserId);
    }
  }, []);

  const linkTo = isAuthenticated() ? "/dashboard" : "/signin";

  const Desktop = () => {
    return (
      <Link to={linkTo}>
        {isAuthenticated() ? (
          <Avatar className="size-9 rounded-full">
            <AvatarImage src={getProfileImage(user)} />
            <AvatarFallback className="text-black">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="relative p-2.5 bg-white rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-black font-medium" />
          </div>
        )}
      </Link>
    );
  };

  const Mobile = () => {
    if (isAuthenticated()) {
      return (
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center min-w-0 flex-1">
              <Avatar className="border border-primary size-6">
                <AvatarImage
                  src={user ? user?.avatar || undefined : undefined}
                />
                <AvatarFallback className="text-xs text-primary">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  location.pathname?.includes("/dashboard")
                    ? "text-primary"
                    : "text-foreground"
                )}>
                Account
              </span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="border-none">
            <ProfileCard />
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <Link
        to={linkTo}
        className="flex flex-col items-center justify-center min-w-0 flex-1">
        <UserRound className={cn("h-5 w-5 mb-1 text-foreground")} />
        <span className={cn("text-[10px] font-medium text-foreground")}>
          Account
        </span>
      </Link>
    );
  };

  return variant === "desktop" ? <Desktop /> : <Mobile />;
};
