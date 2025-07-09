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
    { label: "High School Diploma", value: "high_school_diploma" },
    { label: "Associate of Arts", value: "associate_arts" },
    { label: "Associate of Science", value: "associate_science" },
    { label: "Bachelor of Arts", value: "bachelor_arts" },
    { label: "Bachelor of Science", value: "bachelor_science" },
    { label: "Master of Arts", value: "master_arts" },
    { label: "Master of Science", value: "master_science" },
    { label: "Master of Business Administration", value: "mba" },
    { label: "Doctor of Philosophy (Ph.D.)", value: "phd" },
    { label: "Doctor of Medicine (MD)", value: "md" },
    { label: "Juris Doctor (JD)", value: "jd" },
    { label: "Professional Certificate", value: "certificate" },
    { label: "Diploma", value: "diploma" },
    { label: "Some College", value: "some_college" },
  ];

  function getDegreeLabel(value: string): string {
    return degreeOptions.find((opt) => opt.value === value)?.label || value;
  }

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
                      label="Location"
                      name={`educational_qualifications.${i}.location`}
                      value={values?.educational_qualifications?.[i]?.location as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={
                        getIn(errors, `educational_qualifications.${i}.location`) as string
                      }
                      touched={
                        getIn(touched, `educational_qualifications.${i}.location`) as boolean
                      }
                      required
                      placeholder="College / University"
                    />
                    <Input
                      label="Graduation"
                      name={`educational_qualifications.${i}.completion_year`}
                      value={values?.educational_qualifications?.[i]?.completion_year as number}
                      onChange={(e) => {
                        const num = e.target.value ? Number(e.target.value) : "";
                        formik.setFieldValue(
                          `educational_qualifications.${i}.completion_year`,
                          num
                        );
                      }}
                      onBlur={handleBlur}
                      errorMessage={
                        getIn(errors, `educational_qualifications.${i}.completion_year`) as string
                      }
                      touched={
                        getIn(touched, `educational_qualifications.${i}.completion_year`) as boolean
                      }
                      required
                      placeholder="Year"
                      type="number"
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
                      completion_year: "",
                    })
                  }
                />
              </div>
            </>
          )}
        </FieldArray>
      ) : (
        <div className="flex flex-col gap-6">
          {profile?.educational_qualifications.length > 0 ? (
            profile?.educational_qualifications?.map((x, i) => (
              <div
                key={i}
                className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-3"
              >
                <div>
                  <p>
                    {getDegreeLabel(x?.degree)} in {x?.field_of_study}
                  </p>
                  <p className="text-gray-400">{x.institution_name}</p>
                </div>
                <div className="flex flex-col sm:items-end">
                  <p>
                    {x?.completion_year} - GPA:{x?.grade}
                  </p>
                  <p className="text-gray-400">{x.location}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="w-full"> Education not yet added</p>
          )}
        </div>
      )}
    </ProfileSection>
  );
};

export default Education;
