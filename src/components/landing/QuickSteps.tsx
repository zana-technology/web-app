import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { routes } from "@/router";

export const QuickSteps = () => {
  const navigate = useNavigate();

  const steps = [
    {
      title: "Quick setup",
      text: "Upload your resume, set your job preferences, and connect your email",
    },
    {
      title: "Auto-apply begins",
      text: "Zana immediately starts finding and applying to relevant jobs",
    },
    {
      title: "Track & optimise",
      text: "Monitor your applications, review ATS scores, and adjust your strategy",
    },
    {
      title: "Land Interviews",
      text: "Focus on interview preparation while Zana handles the application",
    },
  ];
  return (
    <div className="mt-10 sm:mt-20 py-10 sm:py-20 px-4 sm:px-24 flex flex-col items-center text-center gap-24 w-full bg-[linear-gradient(to_top,rgba(37,90,90,0.3)_0%,transparent_30%)] rounded-3xl">
      <h3 className="font-medium max-w-[570px] text-3xl sm:text-5xl">
        Ready to have an edge in the job market?
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-5 w-full">
        {steps?.map((step, i) => (
          <div key={i} className="flex flex-col items-center max-w-[240px]">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-2xl font-extrabold bg-zana-primary-normal text-white mb-4">
              {i + 1}
            </div>
            <h4 className="text-xl font-medium">{step.title}</h4>
            <p className="text-dark-400">{step.text}</p>
          </div>
        ))}
      </div>
      <Button
        title="Get started for free"
        onClick={() => {
          navigate(routes.auth.signup);
        }}
        className="font-semibold"
      />
    </div>
  );
};

export default QuickSteps;
