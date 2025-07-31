import Popover from "@/components/popover";
import { Dispatch, SetStateAction, useState } from "react";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { FaChevronDown, FaMoneyBillWave } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { AnalyticsIcon } from "@/assets";

const FeedFilter = ({
  setFilters,
}: {
  setFilters: Dispatch<SetStateAction<Record<string, any>>>;
}) => {
  const filters = [
    {
      name: "Date Posted",
      // icon: IoCalendarClearOutline,
      icon: AnalyticsIcon,
      options: [
        {
          label: "Today",
          getParams: () => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            return {
              timestamp_gte: now.toISOString(),
              timestamp_lte: new Date().toISOString(),
            };
          },
        },
        {
          label: "Past week",
          getParams: () => {
            const now = new Date();
            const weekAgo = new Date();
            weekAgo.setDate(now.getDate() - 7);
            return {
              timestamp_gte: weekAgo.toISOString(),
              timestamp_lte: now.toISOString(),
            };
          },
        },
        {
          label: "Past month",
          getParams: () => {
            const now = new Date();
            const monthAgo = new Date();
            monthAgo.setMonth(now.getMonth() - 1);
            return {
              timestamp_gte: monthAgo.toISOString(),
              timestamp_lte: now.toISOString(),
            };
          },
        },
        {
          label: "Past 3 months",
          getParams: () => {
            const now = new Date();
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(now.getMonth() - 3);
            return {
              timestamp_gte: threeMonthsAgo.toISOString(),
              timestamp_lte: now.toISOString(),
            };
          },
        },
      ],
    },
    {
      name: "Job Mode",
      icon: FiGlobe,
      options: [
        {
          label: "Remote",
          getParams: () => ({
            remote: true,
          }),
        },
        {
          label: "On-site",
          getParams: () => ({
            remote: false,
          }),
        },
      ],
    },
    {
      name: "Salary Range",
      icon: FaMoneyBillWave,
      options: [
        {
          label: "$10k - $49k",
          getParams: () => ({
            salary_gte: 10000,
            salary_lte: 49000,
          }),
        },
        {
          label: "$50k - $100k",
          getParams: () => ({
            salary_gte: 50000,
            salary_lte: 100000,
          }),
        },
        {
          label: "$100k - $200k",
          getParams: () => ({
            salary_gte: 100000,
            salary_lte: 200000,
          }),
        },
        {
          label: "+$200k",
          getParams: () => ({
            salary_gte: 200000,
          }),
        },
      ],
    },
  ];

  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [openPopover, setOpenPopover] = useState<number | null>(null);

  const handleRemoveFilter = (filterGroup: string) => {
    setActiveFilters((prev) => {
      const updated = { ...prev };
      delete updated[filterGroup];
      return updated;
    });

    setFilters((prev) => {
      const updated = { ...prev };
      if (filterGroup === "Date Posted") {
        delete updated.timestamp_gte;
        delete updated.timestamp_lte;
      } else if (filterGroup === "Job Mode") {
        delete updated.remote;
      } else if (filterGroup === "Salary Range") {
        delete updated.salary_gte;
        delete updated.salary_lte;
      }
      return updated;
    });
  };

  const handleClearAll = () => {
    setActiveFilters({});
    setFilters({});
  };

  return (
    <div className="w-full border border-zana-grey-300 rounded-lg bg-zana-grey-500 p-4 flex flex-col gap-4 overflow-x-scroll mt-4 text-s mb-5">
      <div className="flex gap-5 items-center">
        {filters?.map((filter, i) => (
          <div
            key={i}
            className={twMerge(
              "px-3.5 py-2.5 border border-zana-grey-200  rounded-lg bg-white text-sm hover:border-zana-primary-normal hover:bg-zana-primary-light whitespace-nowrap",
              activeFilters[filter.name] ? "border-zana-primary-normal bg-zana-primary-light" : ""
            )}
            id={filter.name}
          >
            <div
              onClick={() => {
                setOpenPopover(i);
              }}
              className="flex gap-2 items-center cursor-pointer"
            >
              <filter.icon size={20} />
              {filter.name}
              <FaChevronDown />
            </div>

            {openPopover === i && (
              <Popover
                openPopover={openPopover === i}
                content={filter.options.map((x) => ({
                  title: x.label,
                  onClick: () => {
                    const params = x.getParams();
                    setFilters((prev) => ({
                      ...prev,
                      ...params,
                    }));

                    setActiveFilters((prev) => ({
                      ...prev,
                      [filter.name]: x.label, // Only one active per group
                    }));
                  },
                }))}
                closePopover={() => {
                  setOpenPopover(null);
                }}
                buttonId={filter.name}
                topOffset={0.5}
              />
            )}
          </div>
        ))}
        {Object.entries(activeFilters)?.length > 0 ? (
          <p className="text-red-500 cursor-pointer whitespace-nowrap" onClick={handleClearAll}>
            Clear all
          </p>
        ) : (
          ""
        )}
      </div>
      {Object.entries(activeFilters)?.length > 0 ? (
        <div className="w-full flex gap-5 items-center pt-4 border-t  border-zana-grey-300">
          {Object.entries(activeFilters).map(([filterGroup, label], idx) => (
            <div
              className="text-zana-primary-normal bg-zana-primary-light border-zana-primary-normal border px-3 py-1.5 rounded-full flex gap-2 items-center cursor-pointer"
              key={idx}
              onClick={() => handleRemoveFilter(filterGroup)}
            >
              {label}
              <MdClose className="hover:text-red-500" />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FeedFilter;
