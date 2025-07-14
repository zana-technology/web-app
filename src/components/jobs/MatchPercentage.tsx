import { bullseyeIcon } from "@/assets";

export const MatchPercentage = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center text-xs text-util-brand-500">
      <img src={bullseyeIcon} alt="match" className="w-4 h-4 mr-0.5" />
      <p>{value}% match</p>
    </div>
  );
};
