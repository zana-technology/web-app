import { checkCircleIcon } from "@/assets";
import { useGeoLocation } from "@/hooks";
import { currencyFormatter } from "@/libs";
import { useMemo } from "react";
import { Button } from "../button";
import { routes } from "@/router";
import { useNavigate } from "react-router-dom";

export const Pricing = () => {
  const { country } = useGeoLocation();

  const navigate = useNavigate();

  const plans = useMemo(() => {
    return [
      {
        name: "Starter Plan",
        features: [
          "100 job applications",
          "100 custom CV’s & Cover letters",
          "Job sourced from over 1 million options in your niche",
          "Remote job applications",
          "Visa sponsored job applications",
        ],
        price: country === "NG" ? 20000 : 20,
        currencyCode: country === "NG" ? "NGN" : country === "GB" ? "GBP" : "USD",
        credits: 100,
      },
      {
        name: "Pro Plan",
        features: [
          "350 job applications",
          "350 custom CV’s & Cover letters",
          "Job sourced from over 1 million options in your niche",
          "Remote job applications",
          "Visa sponsored job applications",
        ],
        price: country === "NG" ? 60000 : 60,
        currencyCode: country === "NG" ? "NGN" : country === "GB" ? "GBP" : "USD",
        credits: 350,
      },
    ];
  }, [country]);

  return (
    <div className="mt-10 sm:mt-20 py-10 sm:py-20 px-4 md:px-24 flex flex-col w-full items-center">
      <p className="text-sm text-zana-primary-normal mb-3">PRICING</p>
      <h3 className="font-medium max-w-[404px] text-3xl sm:text-4xl text-center">
        Transparent pricing tailored for you
      </h3>
      <div className="w-full grid sm:grid-cols-2 gap-6 mt-10 sm:mt-20">
        {plans.map((x, i) => (
          <div className="p-6 border border-zana-grey-300 rounded-xl" key={i}>
            <h4 className="text-lg sm:text-2xl font-medium mb-4 sm:mb-6">{x.name}</h4>
            <div>
              <h3 className="text-zana-primary-normal font-medium text-2xl sm:text-4xl mb-1">
                {currencyFormatter({
                  amount: x.price,
                  currency: x.currencyCode,
                  showFraction: false,
                })}
              </h3>
              <p className="text-util-grey-500">per {x.credits} credit points</p>
            </div>
            <div className="flex flex-col gap-3 mt-4 mb-7">
              {x.features.map((feat, index) => (
                <div className="flex gap-2" key={index}>
                  <img src={checkCircleIcon} alt="icon" className="w-5 h-5" />
                  <p>{feat}</p>
                </div>
              ))}
            </div>
            <Button
              title="Get started "
              onClick={() => {
                navigate(routes.auth.signup);
              }}
              className="font-semibold"
              fullWidth
            />
          </div>
        ))}
      </div>
    </div>
  );
};
