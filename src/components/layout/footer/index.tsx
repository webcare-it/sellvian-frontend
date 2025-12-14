import { getConfig, getImageUrl } from "@/helper";
import { useConfig } from "@/hooks/useConfig";
import {
  Image,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { BrandFooter } from "./brand";
import { SubscribeFooter } from "./subscriber";

export const Footer = () => {
  const config = useConfig();
  const description = getConfig(config, "about_us_description")
    ?.value as string;
  const logo = getConfig(config, "footer_logo")?.value as string;

  return (
    <>
      <SubscribeFooter />
      <div className="bg-primary/5 text-foreground pb-[53px] md:pb-0 mt-10 md:mt-20">
        <Separator className="bg-primary py-1 w-full" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-8">
            <div>
              <h2 className="w-full h-12 relative overflow-hidden mb-4">
                {logo?.length > 0 ? (
                  <img
                    className="absolute w-full h-full object-contain"
                    src={getImageUrl(logo as string)}
                    alt="logo"
                  />
                ) : (
                  <div className="absolute w-full h-full flex items-center justify-center">
                    <Image className="w-6 h-6 text-primary" />
                  </div>
                )}
              </h2>
              {description && (
                <div
                  className="text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </div>
            <BrandFooter />
            <ContactFooter />
            <AboutUsFooter />
            <div className="lg:col-span-1">
              <Social />
              <PaymentMethods />
            </div>
          </div>
        </div>
        <Separator className="bg-primary w-full py-[0.5px] mt-8" />
        <BottomBar />
      </div>
    </>
  );
};

export const AboutUsFooter = () => {
  const location = useLocation();

  const policies = [
    {
      name: "About Us",
      href: "/pages/about-us",
    },
    {
      name: "Contact us",
      href: "/pages/contact-us",
    },
    {
      name: "Privacy Policy",
      href: "/pages/privacy-policy",
    },
    {
      name: "Terms & Condition",
      href: "/pages/terms-condition",
    },
    {
      name: "Return Policy",
      href: "/pages/return-policy",
    },
    {
      name: "Support Policy",
      href: "/pages/support-policy",
    },
    {
      name: "Seller Policy",
      href: "/pages/seller-policy",
    },
  ];

  return (
    <div>
      <h4 className="font-bold text-lg mb-4 text-gray-800">Information</h4>
      <ul className="space-y-2">
        {policies?.map((item) => (
          <li key={item?.name}>
            <Link
              to={item?.href}
              className={`hover:text-red-500 hover:underline capitalize transition-colors text-sm text-gray-600 ${
                location.pathname === item?.href ? "text-red-500" : ""
              }`}>
              {item?.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ContactFooter = () => {
  const config = useConfig();

  const phone = getConfig(config, "contact_phone")?.value as string;
  const email = getConfig(config, "contact_email")?.value as string;
  const address = getConfig(config, "contact_address")?.value as string;

  return (
    <div>
      <h4 className="font-bold text-lg mb-4 text-gray-800">Contact</h4>
      <ul className="space-y-3">
        <li className="flex items-start gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{phone}</span>
        </li>
        <li className="flex items-start gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{email}</span>
        </li>
        <li className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{address}</span>
        </li>
      </ul>
    </div>
  );
};

export const Social = () => {
  const config = useConfig();

  const url = window.location.origin;
  const showSocialLinks = getConfig(config, "show_social_links")?.value || url;
  const facebookLink = getConfig(config, "facebook_link")?.value || url;
  const twitterLink = getConfig(config, "twitter_link")?.value || url;
  const instagramLink = getConfig(config, "instagram_link")?.value || url;
  const youtubeLink = getConfig(config, "youtube_link")?.value || url;
  const linkedinLink = getConfig(config, "linkedin_link")?.value || url;

  return showSocialLinks ? (
    <div className="mb-6">
      <h4 className="font-bold text-lg mb-4 text-gray-800">Social Links</h4>
      <div className="flex items-center gap-3">
        <Link
          to={facebookLink as string}
          className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-75">
          <Facebook className="w-4 h-4" />
        </Link>
        <Link
          to={youtubeLink as string}
          className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors duration-75">
          <Youtube className="w-4 h-4" />
        </Link>
        <Link
          to={instagramLink as string}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity duration-75">
          <Instagram className="w-4 h-4" />
        </Link>
        {twitterLink && (
          <Link
            to={twitterLink as string}
            className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-4 h-4"
              viewBox="0 0 16 16">
              <path
                d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z"
                strokeWidth="1"></path>
            </svg>
          </Link>
        )}
        {linkedinLink && (
          <Link
            to={linkedinLink as string}
            className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-75">
            <Linkedin className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  ) : null;
};

export const PaymentMethods = () => {
  const config = useConfig();
  const img = getConfig(config, "payment_method_images")?.value as string;

  return (
    <div>
      <h4 className="font-bold text-lg mb-4 text-gray-800">Payment Methods</h4>
      <div className="w-full max-w-xs h-12 relative overflow-hidden">
        {img ? (
          <img
            className="absolute w-full h-full object-contain"
            src={getImageUrl(img as string)}
            alt="payment image"
          />
        ) : (
          <div className="absolute w-full h-full flex items-center justify-center">
            <Image className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export const BottomBar = () => {
  const config = useConfig();
  const copyright =
    (getConfig(config, "frontend_copyright_text")?.value as string) ||
    `${new Date().getFullYear()} All rights reserved.`;

  return (
    <div className="bg-primary/10 py-4 mt-0">
      <div className="container mx-auto px-4 md:px-0">
        <p className="text-sm text-foreground text-center">© {copyright}</p>
      </div>
    </div>
  );
};
