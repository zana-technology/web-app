import { downloadIcon, fileIconPdf } from "@/assets";
import { JobDetailsShell } from "@/components";
import { convertUrlsToFiles } from "@/libs";
import { ApplicationData, FileWithPreview } from "@/types";
import { useEffect, useMemo, useState } from "react";

const ApplicationDocuments = ({ application }: { application: ApplicationData }) => {
  const docUrls = useMemo(() => {
    return [
      {
        url: application.resume.file_url,
        fileName: application.resume.file_name,
      },
      {
        url: application.cover_letter_url,
        fileName: "Cover Letter",
      },
    ];
  }, [application]);

  const [files, setFiles] = useState<FileWithPreview[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const docs = await convertUrlsToFiles(docUrls); // assume docUrls is available
      setFiles(docs);
    };

    fetchDocs();
  }, [docUrls]);

  return (
    <JobDetailsShell title="Application Documents">
      <div className="flex flex-col text-sm gap-4">
        {files?.map((x, i) => (
          <div
            className="w-full flex gap-3 p-3 justify-between border border-zana-grey-300 rounded-xl"
            key={i}
          >
            <div className="flex gap-3">
              <img src={fileIconPdf} alt="file icon" className="h-10 w-auto" />
              <div>
                <p>{x.name}</p>
                {x.size > 0 && <p>{x.size}</p>}
              </div>
            </div>
            <img src={downloadIcon} alt={"download"} className="w-4 h-4" />
          </div>
        ))}
      </div>
    </JobDetailsShell>
  );
};

export default ApplicationDocuments;
