import { addJobScreen, applicationScreen, feedScreen, resumeScreen } from "@/assets";
import { useWindowWidth } from "@/hooks";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export const Features = () => {
  const items = [
    {
      title: "AUTO-APPLY AND PERSONALISED FEED",
      heading: "Never miss an opportunity again",
      body: [
        "Tell Zana what you want once; she’ll apply to matching roles for you automatically.",
        "A living dashboard of your job hunt, updated every time Zana makes a move",
        "Smart, safe, and flexible; Zana never applies outside your boundaries",
      ],
      image: feedScreen,
    },
    {
      title: "RESUME OPTIMISATION",
      heading: "Make Every CV an Interview Magnet",
      body: [
        "Smart versions of your resume for every job type",
        "Zana picks the best version based on job context, automatically",
        "Get real-time insights and tips to boost your CV’s performance",
      ],
      image: resumeScreen,
    },
    {
      title: "APPLICATION TRACKING DASHBOARD",
      heading: "See Every Application, All in One Place",
      body: [
        "Zana tracks every job you’ve applied to, from start to offer",
        "Your dashboard updates automatically as your job hunt moves forward",
        "See real-time scores and next steps for every application, no spreadsheets needed",
      ],
      image: applicationScreen,
    },
    // {
    //   title: "MANUAL JOB SUBMISSION",
    //   heading: "Complete flexibility",
    //   body: [
    //     "Submit any job URL and let Zana handle the application process",
    //     "Perfect for referrals and niche job boards not in our feed",
    //     "Automatic parsing for supported sites with manual tracking fallback",
    //   ],
    //   image: addJobScreen,
    // },
  ];

  const [showIndex, setShowIndex] = useState(0);
  const containerRef = useRef(null);

  const width = useWindowWidth();

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
    <div>
      {width < 1024 ? (
        <div className="mt-10 sm:mt-20 py-10 sm:py-20 px-4 sm:px-24 flex flex-col gap-10">
          {items.map((x, i) => (
            <div key={i} className="flex flex-col gap-8">
              <div className="flex-col">
                <p className="text-sm text-zana-primary-normal mb-2">{x.title}</p>
                <h3 className="text-3xl mb-8 font-medium max-w-[70%]">{x.heading}</h3>
                <div className="flex flex-col gap-4">
                  {x.body.map((y, idx) => (
                    <p key={idx} className="max-w-[80%]">
                      {y}
                    </p>
                  ))}
                </div>
              </div>
              <img src={x.image} alt={x.title} className="w-full" />
            </div>
          ))}
        </div>
      ) : (
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
                      className={twMerge(
                        "text-5xl mb-12 font-medium",
                        showIndex === i ? "" : "hidden"
                      )}
                    >
                      {item.heading}
                    </h3>
                    <div
                      className={twMerge("flex flex-col gap-4", showIndex === i ? "" : "hidden")}
                    >
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
      )}
    </div>
  );
};

export default Features;
