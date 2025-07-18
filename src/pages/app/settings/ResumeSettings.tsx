import { downloadIcon, fileIconPdf } from "@/assets";
import { Dropzone, JobDetailsShell, PageLoader } from "@/components";
import { convertUrlsToFiles } from "@/libs";
import { useOnboarding } from "@/pages/auth/onboarding/logic";
import { FileWithPreview } from "@/types";
import { useEffect, useMemo, useState } from "react";

const ResumeSettings = () => {
  const application = useMemo(() => {
    return {
      resume: {
        file_name: "JaneDoe_Resume.pdf",
        file_type: "application/pdf",
        is_primary: true,
        file_url: "https://example.com/resumes/janedoe_resume.pdf",
        uid: "resume_987654321",
        version: 2,
        created_at: "2025-07-05T08:30:00.000Z",
        updated_at: "2025-07-10T12:45:00.000Z",
      },
      cover_letter_url: "https://example.com/coverletters/janedoe_coverletter.pdf",
    };
  }, []);
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      const docs = await convertUrlsToFiles(docUrls); // assume docUrls is available
      setFiles(docs);
      setLoading(false);
    };

    fetchDocs();
  }, [docUrls]);

  const { formik } = useOnboarding();

  const { values, errors, setFieldValue } = formik;

  return (
    <JobDetailsShell title="Application Documents">
      {loading ? (
        <PageLoader />
      ) : (
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
          <Dropzone
            // label="CV/Resume"
            title="Upload Your CV/Resume"
            subtitle="Upload your cv to start applying faster. Zana works best with a resume on file."
            info="Supports PDF, DOC, DOCX (Max 5MB)"
            maxNumOfImages={1}
            files={values?.resume as FileWithPreview[]}
            setFiles={async (file: File[]) => {
              setFieldValue("resume", file);
            }}
            errorMessage={errors.resume}
            fileTypes={["doc"]}
            maxSize={5}
            required
          />
        </div>
      )}
    </JobDetailsShell>
  );
};

export default ResumeSettings;
