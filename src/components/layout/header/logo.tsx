import { Link } from "react-router-dom";
import { getConfig, getImageUrl } from "@/helper";
import { useConfig } from "@/hooks/useConfig";

interface Props {
  type: "DESKTOP" | "MOBILE" | "LANDING-PAGE";
}

export const Logo = ({ type }: Props) => {
  const config = useConfig();
  const logo = getConfig(config, "header_logo")?.value as string;

  if (type === "DESKTOP") {
    return (
      <Link to="/">
        <div className="w-40 h-12 relative overflow-hidden">
          <img
            src={getImageUrl(logo as string)}
            alt="logo"
            className="absolute w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
      </Link>
    );
  }

  if (type === "LANDING-PAGE") {
    return (
      <Link to="/">
        <img
          src={getImageUrl(logo as string)}
          alt="logo"
          className="w-full h-20 object-contain"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </Link>
    );
  }

  if (type === "MOBILE") {
    return (
      <Link to="/">
        <div className="w-28 h-10 relative overflow-hidden">
          <img
            src={getImageUrl(logo as string)}
            alt="logo"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
            className="absolute w-full h-full object-contain"
          />
        </div>
      </Link>
    );
  }

  return null;
};
