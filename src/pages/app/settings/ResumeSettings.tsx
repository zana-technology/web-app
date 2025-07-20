import { downloadIcon, fileIconPdf } from "@/assets";
import { Button, Dropzone, JobDetailsShell, PageLoader } from "@/components";
import { FileWithPreview } from "@/types";
import { useResumeSettings } from "./logic";

const ResumeSettings = () => {
  const { isLoading, loading, formik } = useResumeSettings();

  const { values, errors, setFieldValue, isSubmitting, isValid, dirty } = formik;

  return (
    <JobDetailsShell title="Application Documents">
      {loading || isLoading ? (
        <PageLoader />
      ) : (
        <div className="flex flex-col text-sm gap-4">
          {values.resume?.map((x, i) => (
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
          {values.resume.length < 1 && (
            <>
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
                errorMessage={errors.resume as string}
                fileTypes={["doc"]}
                maxSize={5}
                required
              />
              <div className="sm:flex w-full justify-end gap-8 mt-5">
                <Button
                  title="Save"
                  type="submit"
                  loading={isSubmitting}
                  disabled={!(isValid && dirty)}
                  className="w-full sm:w-[380px]"
                />
              </div>
            </>
          )}
        </div>
      )}
    </JobDetailsShell>
  );
};

export default ResumeSettings;
