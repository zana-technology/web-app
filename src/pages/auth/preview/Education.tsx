import { graduationHatIcon } from "@/assets";
import { Button, Input, PageTitle, ProfileSection, Select } from "@/components";
import { PreviewChildProps } from "@/types";
import { FieldArray, getIn } from "formik";
import { BsCheck } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { twMerge } from "tailwind-merge";

const Education = ({ profile, formik, showForm, showFormHandler }: PreviewChildProps) => {
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

  const degreeOptions = [
    { label: "High School Diploma", value: "high_school" },
    { label: "Associate Degree", value: "associate" },
    { label: "Bachelor's Degree", value: "bachelor" },
    { label: "Master's Degree", value: "master" },
    { label: "Doctorate (Ph.D.)", value: "phd" },
    { label: "Professional Degree (e.g. MD, JD)", value: "professional" },
    { label: "Certificate / Diploma", value: "certificate" },
    { label: "Some College", value: "some_college" },
  ];

  return (
    <ProfileSection
      section={{
        title: "Education",
        icon: graduationHatIcon,
      }}
      button={{
        title: showForm?.education ? "Save" : "Add education",
        icon: showForm?.education ? <BsCheck size={24} /> : <IoMdAdd />,
        onClick: () => {
          if (!showForm?.education) {
            showFormHandler({ education: true });
          } else {
            handleSubmit();
          }
        },
        loading: isSubmitting,
      }}
    >
      {showForm?.education ? (
        <FieldArray name="educational_qualifications">
          {({ push, remove }) => (
            <>
              <div className="flex flex-col gap-5">
                <PageTitle title="Add Education" variant="small" />
                {values?.educational_qualifications?.map((_, i) => (
                  <div
                    key={i}
                    className={twMerge(
                      "flex flex-col gap-5 bg-gray-50 border border-zana-grey-200 rounded-lg p-5"
                    )}
                  >
                    <Input
                      label="Institution"
                      name={`educational_qualifications.${i}.institution_name`}
                      value={values?.educational_qualifications?.[i]?.institution_name as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={
                        getIn(errors, `educational_qualifications.${i}.institution_name`) as string
                      }
                      touched={
                        getIn(
                          touched,
                          `educational_qualifications.${i}.institution_name`
                        ) as boolean
                      }
                      required
                      placeholder="College / University"
                    />
                    <Input
                      label="Graduation"
                      name={`educational_qualifications.${i}.end_date`}
                      value={values?.educational_qualifications?.[i]?.end_date as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={
                        getIn(errors, `educational_qualifications.${i}.end_date`) as string
                      }
                      touched={
                        getIn(touched, `educational_qualifications.${i}.end_date`) as boolean
                      }
                      required
                      placeholder="Year"
                    />
                    <Select
                      label="Degree and Major"
                      name={`educational_qualifications.${i}.degree`}
                      value={values?.educational_qualifications?.[i]?.degree as string}
                      onBlur={handleBlur}
                      errorMessage={
                        getIn(errors, `educational_qualifications.${i}.degree`) as string
                      }
                      touched={getIn(touched, `educational_qualifications.${i}.degree`) as boolean}
                      onChange={(item) => {
                        setFieldValue(`educational_qualifications.${i}.degree`, item.value);
                      }}
                      options={degreeOptions}
                      required
                    />
                    <Input
                      name={`educational_qualifications.${i}.field_of_study`}
                      value={values?.educational_qualifications?.[i]?.field_of_study as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={
                        getIn(errors, `educational_qualifications.${i}.field_of_study`) as string
                      }
                      touched={
                        getIn(touched, `educational_qualifications.${i}.field_of_study`) as boolean
                      }
                      required
                      placeholder="Major / Field"
                    />
                    <Input
                      label="GPA"
                      name={`educational_qualifications.${i}.grade`}
                      value={values?.educational_qualifications?.[i]?.grade as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={
                        getIn(errors, `educational_qualifications.${i}.grade`) as string
                      }
                      touched={getIn(touched, `educational_qualifications.${i}.grade`) as boolean}
                      required
                      placeholder="3.9/5.0"
                    />

                    <div
                      className={twMerge(
                        "grid grid-cols-2 gap-2 w-full",
                        values?.educational_qualifications?.length > 1 ? "grid-cols-3" : ""
                      )}
                    >
                      {values?.educational_qualifications &&
                      values?.educational_qualifications?.length > 1 ? (
                        <Button title="Remove Degree" onClick={() => remove(i)} variant="text" />
                      ) : (
                        ""
                      )}
                      <Button
                        title="Cancel"
                        onClick={() => {
                          showFormHandler({ education: false });
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
                  title="+ Add Education"
                  onClick={() =>
                    push({
                      institution_name: "",
                      location: "",
                      degree: "",
                      field_of_study: "",
                      description: "",
                      grade: "",
                      start_date: "",
                      end_date: "",
                    })
                  }
                />
              </div>
            </>
          )}
        </FieldArray>
      ) : (
        <p className="w-full">{profile?.professional_summary ?? "Work Experience not yet added"}</p>
      )}
    </ProfileSection>
  );
};

export default Education;
