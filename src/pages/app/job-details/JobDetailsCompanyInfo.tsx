import { linkIcon } from "@/assets";
import { Button, JobDetailsShell, Text } from "@/components";
import { JobData } from "@/types";

const JobDetailsCompanyInfo = ({ job }: { job: JobData }) => {
  return (
    <>
      <JobDetailsShell title={`About ${job.company}`}>
        <p className="mb-3">{job?.companyInfo?.about}</p>
        <div className="grid xs:grid-cols-2 gap-3">
          <Text label="Industry" value={job?.companyInfo?.industry as string} />
          <Text label="Company Size" value={job?.companyInfo?.size as string} />
          <Text label="Founded" value={job?.companyInfo?.founded as number} />

          <div>
            <p className="text-gray-500 text-sm mb-1">Website</p>
            <Button
              title="Visit site"
              variant="text"
              icon={<img src={linkIcon} className="w-4 h-4" />}
              className="p-0"
            />
          </div>
        </div>
      </JobDetailsShell>
    </>
  );
};

export default JobDetailsCompanyInfo;
