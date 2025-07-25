import { avatar } from "@/assets";
import { useEffect, useRef, useState } from "react";

export const MeetZana = () => {
  const items = [
    "Almost there! Great job",
    "Hi! there 👋",
    "Onboarding complete",
    "See what made you a match",
    "Zana has generated you CV",
    "Interview scheduled",
    "Auto applied",
    "Take a cloud course",
  ];

  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="mt-20 sm:mt-56 flex flex-col items-center w-full">
      <div className="flex flex-col items-center text-center mb-10">
        <p className="text-sm text-zana-primary-normal mb-3">MEET ZANA</p>
        <h1 className="font-medium max-w-[771px] text-3xl sm:text-5xl ">
          Your 24/7 job application assistant that does all the job for you
        </h1>
      </div>
      <div className="flex items-center flex-col w-full px-5 ">
        <img src={avatar} alt="Zana Avatar" className="h-[123px]" />
        <div className="bg-zana-primary-normal h-[400px] sm:h-[520px] flex justify-center items-center relative w-full rounded-lg">
          <div className="flex flex-col items-center gap-6" ref={containerRef}>
            {items.map((item, i) => {
              const position = i - index;
              let scale = 1;
              let opacity = 1;

              if (position !== 0) {
                scale = 0.7;
                opacity = 0.4;
              }

              if (position === -1 || position === 1) {
                scale = 0.85;
                opacity = 0.7;
              }

              // For looping effect
              let adjustedPosition = position;
              if (position <= -Math.floor(items.length / 2)) adjustedPosition += items.length;
              if (position >= Math.floor(items.length / 2)) adjustedPosition -= items.length;

              return (
                <div
                  key={i}
                  className="absolute transition-all duration-500 ease-in-out text-center w-full sm:text-xl"
                  style={{
                    transform: `translateY(${adjustedPosition * 40}px) scale(${scale})`,
                    opacity,
                    color: position === 0 ? "white" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetZana;
