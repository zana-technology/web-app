import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const DesktopFeatures = ({
  items,
}: {
  items: {
    title: string;
    heading: string;
    body: string[];
    image: string;
  }[];
}) => {
  const [showIndex, setShowIndex] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const segmentSize = 1 / items.length;
    let currentIndex;

    if (v >= 1 - segmentSize * 0.1) {
      currentIndex = items.length - 1;
    } else {
      currentIndex = Math.min(Math.round(v / segmentSize), items.length - 1);
    }

    if (currentIndex !== showIndex) {
      setShowIndex(currentIndex);
    }
  });
  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen mt-10 sm:mt-20 py-10 sm:py-20 px-4 sm:px-24 flex items-center">
        <div className="grid grid-cols-2 xl:grid-cols-[1fr_606px] gap-20">
          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <div className="flex flex-col" key={i}>
                <p
                  className={twMerge(
                    "text-sm text-zana-primary-normal cursor-pointer",
                    showIndex === i ? "mb-2" : ""
                  )}
                  onClick={() => setShowIndex(i)}
                >
                  {item.title}
                </p>
                <h3
                  className={twMerge("text-5xl mb-12 font-medium", showIndex === i ? "" : "hidden")}
                >
                  {item.heading}
                </h3>
                <div className={twMerge("flex flex-col gap-4", showIndex === i ? "" : "hidden")}>
                  {item.body.map((y, idx) => (
                    <p key={idx} className="max-w-[80%]">
                      {y}
                    </p>
                  ))}
                </div>
                {showIndex === i ? (
                  <div className="hidden lg:block h-0.5 w-[80%] relative mt-7 bg-zana-primary-light">
                    <div
                      className="h-0.5 bg-zana-primary-normal w-[25%] absolute"
                      style={{ left: `${i * 25}%` }}
                    ></div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={items[showIndex].image}
                src={items[showIndex].image}
                alt={items[showIndex].title}
                className="w-full"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopFeatures;
