import { briefcaseIcon } from "@/assets";
import {
  Button,
  Checkbox,
  DangerousContent,
  Input,
  PageTitle,
  ProfileSection,
  QuillInput,
} from "@/components";
import DateInput from "@/components/input/DateInput";
import { PreviewChildProps } from "@/types";
import { FieldArray, getIn } from "formik";
import { BsCheck } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import { capitalizeFirstLetter } from "@/libs";

const WorkExperience = ({ profile, formik, showForm, showFormHandler }: PreviewChildProps) => {
  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    touched,
    isSubmitting,
    handleSubmit,
    handleChange,
  } = formik;
  return (
    <ProfileSection
      section={{
        title: "Work Experience",
        icon: briefcaseIcon,
      }}
      button={{
        title: showForm?.workExperience ? "Save" : "Add experience",
        icon: showForm?.workExperience ? <BsCheck size={24} /> : <IoMdAdd />,
        onClick: () => {
          if (!showForm?.workExperience) {
            showFormHandler({ workExperience: true });
            if (values?.work_experiences?.length < 2) {
              setFieldValue("work_experiences.0.is_current", false);
            }
          } else {
            handleSubmit();
          }
        },
        loading: isSubmitting,
      }}
    >
      {showForm?.workExperience ? (
        <FieldArray name="work_experiences">
          {({ push, remove }) => (
            <>
              <div className="flex flex-col gap-5">
                <PageTitle title="Add New Experience" variant="small" />
                {values?.work_experiences?.map((_, i) => (
                  <div
                    key={i}
                    className={twMerge(
                      "flex flex-col gap-5 bg-gray-50 border border-zana-grey-200 rounded-lg p-5"
                    )}
                  >
                    <Input
                      label="Job title"
                      name={`work_experiences.${i}.job_title`}
                      value={values?.work_experiences?.[i]?.job_title as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={getIn(errors, `work_experiences.${i}.job_title`) as string}
                      touched={getIn(touched, `work_experiences.${i}.job_title`) as boolean}
                      required
                      placeholder="e.g Software engineer"
                    />
                    <Input
                      label="Company Name"
                      name={`work_experiences.${i}.company_name`}
                      value={values?.work_experiences?.[i]?.company_name as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={getIn(errors, `work_experiences.${i}.company_name`) as string}
                      touched={getIn(touched, `work_experiences.${i}.company_name`) as boolean}
                      required
                      placeholder="e.g Amazon"
                    />
                    <Input
                      label="Location"
                      name={`work_experiences.${i}.location`}
                      value={values?.work_experiences?.[i]?.location as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={getIn(errors, `work_experiences.${i}.location`) as string}
                      touched={getIn(touched, `work_experiences.${i}.location`) as boolean}
                      required
                      placeholder="e.g New York"
                    />
                    <DateInput
                      label="Start date"
                      name={`work_experiences.${i}.start_date`}
                      value={values?.work_experiences?.[i]?.start_date as string}
                      onChange={(date) => {
                        setFieldValue(
                          `work_experiences.${i}.start_date`,
                          moment(date as Date).format("YYYY-MM-DD")
                        );
                      }}
                      onBlur={handleBlur}
                      errorMessage={getIn(errors, `work_experiences.${i}.start_date`)}
                      touched={getIn(touched, `work_experiences.${i}.start_date`)}
                      excludeFutureDays
                    />
                    {!values?.work_experiences?.[i]?.is_current && (
                      <DateInput
                        label="end date"
                        name={`work_experiences.${i}.end_date`}
                        value={values?.work_experiences?.[i]?.end_date as string}
                        onChange={(date) => {
                          setFieldValue(
                            `work_experiences.${i}.end_date`,
                            moment(date as Date).format("YYYY-MM-DD")
                          );
                        }}
                        onBlur={handleBlur}
                        errorMessage={getIn(errors, `work_experiences.${i}.end_date`)}
                        touched={getIn(touched, `work_experiences.${i}.end_date`)}
                        excludeFutureDays
                      />
                    )}
                    <Checkbox
                      id={`work_experiences.${i}.is_current`}
                      name={`work_experiences.${i}.is_current`}
                      title={"Currently work here"}
                      checked={values?.work_experiences?.[i]?.is_current as boolean}
                      onChange={() =>
                        setFieldValue(
                          `work_experiences.${i}.is_current`,
                          !values?.work_experiences?.[i]?.is_current
                        )
                      }
                      className="p-2.5"
                    />
                    <QuillInput
                      label="Description"
                      name={`work_experiences.${i}.description`}
                      value={values?.work_experiences?.[i]?.description as string}
                      onChange={(content) =>
                        setFieldValue(`work_experiences.${i}.description`, content)
                      }
                      errorMessage={getIn(errors, `work_experiences.${i}.description`) as string}
                      touched={getIn(touched, `work_experiences.${i}.description`) as boolean}
                      placeholder="Describe your key responsibilities and achievements"
                    />
                    {/* <TextArea
                      label="Description"
                      name={`work_experiences.${i}.description`}
                      value={values?.work_experiences?.[i]?.description as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={getIn(errors, `work_experiences.${i}.description`) as string}
                      touched={getIn(touched, `work_experiences.${i}.description`) as boolean}
                      placeholder="Describe your key responsibilities and achievements"
                    /> */}
                    <div
                      className={twMerge(
                        "grid grid-cols-2 gap-2 w-full",
                        values?.work_experiences?.length > 1 ? "grid-cols-3" : ""
                      )}
                    >
                      {values?.work_experiences && values?.work_experiences?.length > 1 ? (
                        <Button title="Remove Position" onClick={() => remove(i)} variant="text" />
                      ) : (
                        ""
                      )}
                      <Button
                        title="Cancel"
                        onClick={() => {
                          showFormHandler({ workExperience: false });
                        }}
                        variant="outlined"
                        className="bg-white"
                        fullWidth
                      />
                      <Button
                        title="Save"
                        onClick={() => {
                          handleSubmit();
                        }}
                        className="flex-1"
                        fullWidth
                        loading={isSubmitting}
                      />
                    </div>
                  </div>
                ))}

                <Button
                  title="+ Add Experience"
                  onClick={() =>
                    push({
                      company_name: "",
                      job_title: "",
                      location: "",
                      description: "",
                      start_date: "",
                      end_date: "",
                      is_current: false,
                    })
                  }
                />
              </div>
            </>
          )}
        </FieldArray>
      ) : (
        <div className="flex flex-col gap-6">
          {profile?.work_experiences?.length > 0 ? (
            profile?.work_experiences?.map((x, i) => (
              <div className="w-full" key={i}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <p>{capitalizeFirstLetter(x.job_title)}</p>
                    <p className="text-gray-400">{capitalizeFirstLetter(x.company_name)}</p>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <p>
                      {moment(x.start_date).format("MMMM YYYY")} -{" "}
                      {x.is_current || !x.end_date
                        ? "Present"
                        : moment(x.end_date).format("MMMM YYYY")}{" "}
                    </p>
                    <p className="text-gray-400">{x.location}</p>
                  </div>
                </div>

                <DangerousContent
                  content={x?.description}
                  className="[&>p]:relative
                      [&>p]:pl-4
                      [&>p]:before:content-['•']
                      [&>p]:before:absolute
                      [&>p]:before:left-0
                    [&>p]:before:text-zinc-700 flex flex-col gap-1 mt-2"
                />
              </div>
            ))
          ) : (
            <p className="w-full"> Work Experience not yet added</p>
          )}
        </div>
      )}
    </ProfileSection>
  );
};

export default WorkExperience;
