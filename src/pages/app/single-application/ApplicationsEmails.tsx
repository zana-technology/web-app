import { mailReadIcon, mailUnreadIcon } from "@/assets";
import { JobDetailsShell } from "@/components";
import { ApplicationData, JobCorrespondence } from "@/types";
import moment from "moment";

const ApplicationsEmails = ({ application }: { application: ApplicationData }) => {
  const correspondence: JobCorrespondence = {
    company: application.company,
    jobTitle: application.job_role,
    thread: application.thread,
  };

  const formatDateForDisplay = (dateString: string): string => {
    const date = moment(dateString);
    const now = moment();

    if (date.isSame(now, "day")) {
      return date.format("h:mm A"); // Today → show time
    }

    const daysAgo = now.diff(date, "days");

    if (daysAgo >= 1 && daysAgo <= 10) {
      return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`; // 1–10 days ago
    }

    return date.format("D/MM/YYYY"); // Older than 10 days
  };

  return (
    <JobDetailsShell title="Related Emails">
      <div className="flex flex-col text-sm">
        {correspondence.thread?.map((x, i) => (
          <div className="flex justify-between gap-3 p-3 flex-col sm:flex-row" key={i}>
            <div className="flex gap-3">
              <img src={x?.isRead ? mailReadIcon : mailUnreadIcon} className="w-5 h-5" alt="mail" />
              <div>
                <p className="font-semibold">{correspondence?.company}</p>
                <p>{x?.subject}</p>
              </div>
            </div>
            <div className="flex flex-col sm:items-end">
              {x.status === "interview scheduled" && (
                <p className="text-util-warning-500">{x.status.toUpperCase()}</p>
              )}
              <p>{formatDateForDisplay(x?.sentAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </JobDetailsShell>
  );
};

export default ApplicationsEmails;
