import { avatar, zanaFooterLogo } from "@/assets";
import { Button } from "../button";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "@/router";

export const Footer = () => {
  const navigate = useNavigate();

  const company = [
    {
      title: "Privacy Policy",
      route: routes.policy,
    },
    {
      title: "Terms of service",
      route: routes.policy,
    },
  ];
  const socials = [
    {
      title: "Email",
      route: "#",
    },
    {
      title: "LinkedIn",
      route: "#",
    },
    {
      title: "Instagram",
      route: "#",
    },
  ];

  return (
    <footer className="w-full px-4 flex items-center flex-col pb-4">
      <img src={avatar} alt="Zana Avatar" className="h-[123px]" />
      <div className="bg-zana-primary-dark min-h-[620px] md:min-h-[753px] w-full flex flex-col justify-between px-5 md:px-24 rounded-xl pt-10 md:pt-20 pb-10">
        <div className="flex flex-col gap-16 md:flex-row justify-between w-full text-white">
          <div className="max-w-[361px]">
            <h3 className="text-3xl font-medium">Get started in landing your dream job</h3>
            <Button
              title="Get started for free"
              onClick={() => {
                navigate(routes.auth.signup);
              }}
              className="font-semibold bg-white text-zana-primary-normal hover:text-zana-primary-normal hover:bg-zana-grey-300 mt-6"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-20">
            <div className="flex flex-col gap-2 md:border-b-0 border-b border-dashed border-zana-primary-normal md:pb-0 pb-4 ">
              {company.map((x, i) => (
                <Link to={x.route} key={i} className="hover:text-zana-color-500">
                  {x.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {socials.map((x, i) => (
                <Link to={x.route} key={i} className="hover:text-zana-color-500">
                  {x.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <img src={zanaFooterLogo} alt="Zana Avatar" className="w-full" />
      </div>
    </footer>
  );
};
