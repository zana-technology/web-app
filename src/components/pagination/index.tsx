import { Dispatch, SetStateAction, useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { Button } from "../button";
import { useWindowWidth } from "@/hooks";

export const Pagination = ({
  setCurrentOffset,
  currentOffset,
  total,
  limit,
  className,
}: {
  setCurrentOffset: Dispatch<SetStateAction<number>>;
  currentOffset: number;
  total: number;
  limit: number;
  className?: string;
}) => {
  const width = useWindowWidth();
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(currentOffset / limit);

  const pageButtons = useMemo((): (number | string)[] => {
    const pages: (number | string)[] = [];
    const all = Array.from({ length: totalPages }, (_, i) => i);

    const first = all.slice(0, 3);
    const last = all.slice(-3);

    const inFirst = currentPage <= 2;
    const inLast = currentPage >= totalPages - 3;

    if (inFirst) {
      pages.push(...first);
      if (totalPages > 6) pages.push("...");
      if (totalPages > 3) pages.push(...last);
    } else if (inLast) {
      pages.push(...first);
      if (totalPages > 6) pages.push("...");
      pages.push(...last);
    } else {
      pages.push(...first);
      pages.push("...");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push("...");
      pages.push(...last);
    }

    return [...new Set(pages)];
  }, [currentPage, totalPages]);

  const btnClass =
    "w-10 h-10 text-sm rounded-md flex items-center justify-center cursor-pointer text-dark-400 enabled:hover:text-dark-800 enabled:hover:bg-zana-grey-500 disabled:opacity-50";

  return (
    <div
      className={twMerge(
        "flex justify-between items-center gap-0.5 w-full overflow-hidden",
        className
      )}
    >
      {width < 640 ? (
        <button
          onClick={() => setCurrentOffset(Math.max(currentOffset - limit, 0))}
          disabled={currentPage === 0}
          className="border border-zana-grey-200 rounded-md h-9 w-9 flex items-center justify-center"
        >
          <IoMdArrowBack size={20} />
        </button>
      ) : (
        <Button
          variant="text"
          title="Previous"
          icon={<IoMdArrowBack size={20} />}
          iconPosition="left"
          className="text-sm"
          onClick={() => setCurrentOffset(Math.max(currentOffset - limit, 0))}
          disabled={currentPage === 0}
        />
      )}

      {width < 640 ? (
        <div className="text-sm">
          {" "}
          Page {currentPage + 1} of {totalPages}
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          {pageButtons.map((page, index) =>
            page === "..." ? (
              <BsThreeDots key={`dots-${index}`} size={20} />
            ) : (
              <button
                key={`page-${page}`}
                onClick={() => setCurrentOffset((page as number) * limit)}
                className={twMerge(
                  btnClass,
                  currentPage === page ? "text-dark-800 bg-zana-grey-500" : ""
                )}
              >
                {(page as number) + 1}
              </button>
            )
          )}
        </div>
      )}

      {width < 640 ? (
        <button
          onClick={() =>
            setCurrentOffset(Math.min(currentOffset + limit, (totalPages - 1) * limit))
          }
          disabled={currentPage === totalPages - 1}
          className="border border-zana-grey-200 rounded-md h-9 w-9 flex items-center justify-center"
        >
          <IoMdArrowForward size={20} />
        </button>
      ) : (
        <Button
          variant="text"
          title="Next"
          icon={<IoMdArrowForward size={20} />}
          className="text-sm"
          onClick={() =>
            setCurrentOffset(Math.min(currentOffset + limit, (totalPages - 1) * limit))
          }
          disabled={currentPage === totalPages - 1}
        />
      )}
    </div>
  );
};

export default Pagination;
