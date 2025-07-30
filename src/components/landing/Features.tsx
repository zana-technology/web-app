import { applicationScreen, feedScreen, resumeScreen } from "@/assets";
import { useWindowWidth } from "@/hooks";
import DesktopFeatures from "./DesktopFeatures";

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

  const width = useWindowWidth();

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
        <DesktopFeatures items={items} />
      )}
    </div>
  );
};

export default Features;
