import { downloadGreyIcon, fileIconPdf, trashIcon } from "@/assets";
import { Button, Dropzone, JobDetailsShell, PageLoader } from "@/components";
import { FileWithPreview } from "@/types";
import { useResumeSettings } from "./logic";
import { GoKebabHorizontal } from "react-icons/go";
import { useState } from "react";
import Popover from "@/components/popover";
import { MoonLoader } from "react-spinners";
import { downloadFile } from "@/libs";

const ResumeSettings = () => {
  const { isLoading, loading, formik, updateResume, setUpdateResume, loadingDelete, deleteResume } =
    useResumeSettings();

  const { values, errors, setFieldValue, isSubmitting, isValid, dirty, handleSubmit } = formik;

  const [openPopover, setOpenPopover] = useState<number | null>(null);

  return (
    <JobDetailsShell title="Application Documents">
      {loading || isLoading ? (
        <PageLoader />
      ) : (
        <div className="flex flex-col text-sm gap-4">
          {!updateResume ? (
            <>
              {" "}
              {values.resume?.map((x, i) => (
                <div
                  className="w-full flex gap-3 p-3 justify-between border border-zana-grey-300 rounded-xl"
                  key={i}
                >
                  <div className="flex gap-3 truncate">
                    <img src={fileIconPdf} alt="file icon" className="h-10 w-auto" />
                    <div>
                      <p>{x.name}</p>
                      {x.size > 0 && <p>{x.size}</p>}
                    </div>
                  </div>
                  <div className="cursor-pointer flex-shrink-0" id={`cv-options-${i}`}>
                    {loadingDelete ? (
                      <MoonLoader color="#414651" loading={loadingDelete} size={20} />
                    ) : (
                      <GoKebabHorizontal
                        size={20}
                        onClick={() => {
                          setOpenPopover(i);
                        }}
                      />
                    )}
                    {openPopover === i && (
                      <Popover
                        openPopover={openPopover === i}
                        content={[
                          {
                            title: "Download",
                            icon: downloadGreyIcon,
                            onClick: () => {
                              console.log("downloading", x);
                              downloadFile(x);
                            },
                          },
                          ...(values?.resume?.length > 1
                            ? [
                                {
                                  title: "Remove CV",
                                  icon: trashIcon,
                                  onClick: () => {
                                    deleteResume(x?.id as string);
                                  },
                                },
                              ]
                            : []),
                        ]}
                        closePopover={() => {
                          setOpenPopover(null);
                        }}
                        buttonId={`cv-options-${i}`}
                        topOffset={-1}
                      />
                    )}
                  </div>
                </div>
              ))}
              <div className="sm:flex w-full justify-end gap-8 mt-5">
                <Button
                  title="Update Resume"
                  className="w-full sm:w-[380px]"
                  onClick={() => {
                    setUpdateResume(true);
                  }}
                />
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
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
              <div className="flex flex-col sm:flex-row w-full justify-end gap-5 mt-5">
                <Button
                  title="Cancel"
                  variant="outlined"
                  onClick={() => {
                    setUpdateResume(false);
                  }}
                  className="w-full sm:w-40"
                />
                <Button
                  title="Save"
                  type="submit"
                  loading={isSubmitting}
                  disabled={!(isValid && dirty)}
                  className="w-full sm:w-[380px]"
                />
              </div>
            </form>
          )}
        </div>
      )}
    </JobDetailsShell>
  );
};

export default ResumeSettings;
