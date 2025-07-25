import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export const Faqs = () => {
  const faqs = [
    {
      title: "How does Zana ensure i don't apply to irrelevant jobs?",
      text: "Our intelligent rules engine lets you set specific criteria (salary, location, Visa requirement, etc.). Zana only applies to jobs that match ALL your requirements.",
    },
    {
      title: "Is auto-applying safe for my professional reputation?",
      text: "Our intelligent rules engine lets you set specific criteria (salary, location, Visa requirement, etc.). Zana only applies to jobs that match ALL your requirements.",
    },
    {
      title: "Which job boards does Zana support?",
      text: "Our intelligent rules engine lets you set specific criteria (salary, location, Visa requirement, etc.). Zana only applies to jobs that match ALL your requirements.",
    },
    {
      title: "Can i still manually apply to some jobs?",
      text: "Our intelligent rules engine lets you set specific criteria (salary, location, Visa requirement, etc.). Zana only applies to jobs that match ALL your requirements.",
    },
    {
      title: "How does the ATS optimization works?",
      text: "Our intelligent rules engine lets you set specific criteria (salary, location, Visa requirement, etc.). Zana only applies to jobs that match ALL your requirements.",
    },
  ];

  const [showIndex, setShowIndex] = useState<number | null>(null);

  return (
    <div className="mt-10 py-10 px-4 sm:px-24 flex flex-col w-full items-center">
      <p className="text-sm text-zana-primary-normal mb-3">FAQS</p>
      <h3 className="font-medium max-w-[440px] text-3xl sm:text-5xl text-center">
        Things you probably wonder about Zana
      </h3>
      <div className="w-full flex flex-col mt-10 sm:mt-20">
        {faqs.map((x, i) => (
          <div
            key={i}
            className={twMerge(
              "w-full py-10",
              i + 1 < faqs.length ? "border-b border-zana-grey-300" : ""
            )}
          >
            <div
              className="flex justify-between gap-6 w-full cursor-pointer"
              onClick={() => {
                if (showIndex !== i) {
                  setShowIndex(i);
                } else {
                  setShowIndex(null);
                }
              }}
            >
              <p className="text-lg">{x.title}</p>
              {showIndex === i ? <MdClose size={24} /> : <IoMdAdd size={24} />}
            </div>
            {showIndex === i && <p className="text-dark-400 max-w-[90%] mt-6">{x.text}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
