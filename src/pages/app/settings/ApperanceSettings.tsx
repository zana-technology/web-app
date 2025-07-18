import { darkTheme, lightTheme } from "@/assets";
import { JobDetailsShell } from "@/components";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const ApperanceSettings = () => {
  const screenOptions = [
    {
      label: "System Preference",
      image: darkTheme,
    },
    {
      label: "Light mode",
      image: lightTheme,
    },
    {
      label: "Dark mode",
      image: darkTheme,
    },
  ];

  const [selectedOption, setSelectedOption] = useState(screenOptions[0].label);
  return (
    <JobDetailsShell title="Display Preference">
      <div className="flex gap-16">
        {screenOptions?.map((x, i) => (
          <div key={i} className="relative cursor-pointer">
            <p className="text-sm font-semibold mb-3">{x.label}</p>
            <img
              src={x.image}
              alt={x.label}
              className={twMerge(
                "w-[200px] rounded-xl hover:border-2 hover:border-zana-primary-normal",
                selectedOption === x.label ? "border-2 border-zana-primary-normal" : ""
              )}
            />
            {selectedOption === x.label && (
              <div className="w-5 h-5 bg-zana-primary-normal rounded-full flex items-center justify-center absolute bottom-2 left-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </JobDetailsShell>
  );
};

export default ApperanceSettings;
