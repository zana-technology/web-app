import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export const Faqs = () => {
  const faqs = [
    {
      title: "How does Zana avoid applying to jobs that aren’t a good fit?",
      text: "Zana only applies to jobs that match the preferences you set: like location, salary, experience level, industry, and keywords. My AI rules engine checks every posting before applying, so you won’t end up applying to irrelevant or random roles.",
    },
    {
      title: "Is auto-applying safe for my professional reputation?",
      text: "Absolutely. I don’t spam. I only apply to quality roles that match your profile, using customized applications tailored to each job. You stay in full control; review or tweak my rules anytime.",
    },
    {
      title: "Does Zana work for all industries?",
      text: "Zana is designed to work across a wide range of industries; tech, finance, marketing, operations, healthcare and more. You can customize your preferences to focus on your field.",
    },
    {
      title: "Can I still apply to some jobs manually?",
      text: "Yes! You can turn off auto-apply for any job, or submit manual jobs through your dashboard. Zana works with you, not against you.",
    },
    {
      title: "How soon will I start seeing interviews?",
      text: "Some users get interview invites within the first 1–2 weeks. It depends on your industry, experience, and job market—but with 500+ optimized applications going out fast, your chances grow quickly.",
    },
  ];

  const [showIndex, setShowIndex] = useState<number | null>(null);

  return (
    <div className="mt-10 py-10 px-4 sm:px-24 flex flex-col w-full items-center">
      <p className="text-sm text-zana-primary-normal mb-3">FAQS</p>
      <h3 className="font-medium max-w-[400px] text-3xl sm:text-4xl text-center">
        Wondering how Zana works? I’ve got you.
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
