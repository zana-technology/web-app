import { bullseyeIcon } from "@/assets";
import { JobData } from "@/types";

const Jobs = ({ jobs }: { jobs: JobData[] }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-6 mt-8">
      {jobs?.map((x, i) => (
        <div key={i} className="rounded-2xl bg-zana-grey-500 border border-zana-grey-100 p-2">
          <div className="bg-white border border-zana-grey-100 py-4 px-3">
            <div className="flex justify-between">
              <div className="flex gap-2.5 items-center">
                <img src={x.companyLogo} className="h-10 w-10 object-cover" />
                <div>
                  <h5 className="font-semibold">{x?.title}</h5>
                  <p className="text-sm text-gray-500">{x?.company}</p>
                </div>
              </div>
              <div>
                <MatchPercentage value={x.match as number} key={i} />
              </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );
};

export default Jobs;

const MatchPercentage = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center text-xs text-util-brand-500">
      <img src={bullseyeIcon} alt="match" className="w-4 h-4 mr-0.5" />
      <p>{value}% match</p>
    </div>
  );
};
