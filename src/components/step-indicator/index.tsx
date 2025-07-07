import { Step } from "@/types";
import { BsCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}
export const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      {steps?.map((x, i) => (
        <div
          key={i}
          className={`flex items-center cursor-pointer`}
          onClick={() => {
            if (x.step <= currentStep) {
              navigate(x.route);
            }
          }}
        >
          {currentStep === x.step ? (
            <div className="flex h-7 items-center px-[3px] rounded-full border border-zana-primary-normal gap-0.5 ">
              <div className="h-5 w-5 rounded-full border border-dashed border-green-500 bg-green-50"></div>
              <p className="whitespace-nowrap">{x?.title}</p>
            </div>
          ) : currentStep > x.step ? (
            <div className="flex h-7 items-center justify-center rounded-full w-7 bg-green-500">
              <BsCheck size={20} className="text-white" />
            </div>
          ) : (
            <div className="flex h-7 items-center p-1 border rounded-full w-7 border-zana-grey-300">
              <div className=" bg-zana-grey-100 rounded-full h-full w-full"></div>
            </div>
          )}
          {i + 1 < steps.length ? (
            <div className="w-7 border border-zana-grey-300"></div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
