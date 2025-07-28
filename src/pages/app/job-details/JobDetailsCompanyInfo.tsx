import { linkIcon } from "@/assets";
import { Button, JobDetailsShell, Text } from "@/components";
import { constant } from "@/libs";
import { JobData } from "@/types";

const JobDetailsCompanyInfo = ({ job }: { job: JobData }) => {
  return (
    <>
      <JobDetailsShell title={`About ${job?.company?.name ? job?.company?.name : ""}`}>
        <p className="mb-3">{job?.companyInfo?.about}</p>
        <div className="grid xs:grid-cols-2 gap-3">
          <Text label="Industry" value={(job?.company?.industry as string) ?? constant.notAdded} />
          <Text label="Company Size" value={(job?.company?.size as string) ?? constant.notAdded} />
          <Text
            label="Founded"
            value={(job?.company?.year_founded as number) ?? constant.notAdded}
          />

          <div>
            <p className="text-gray-500 text-sm mb-1">Website</p>
            {job?.company?.website ? (
              <Button
                title="Visit site"
                variant="text"
                icon={<img src={linkIcon} className="w-4 h-4" />}
                className="p-0"
                onClick={() => {
                  window.open(job?.company?.website as string, "_blank");
                }}
              />
            ) : (
              <p>{constant.notAdded}</p>
            )}
          </div>
        </div>
      </JobDetailsShell>
    </>
  );
};

export default JobDetailsCompanyInfo;
