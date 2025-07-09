import { graduationHatIcon } from "@/assets";
import { Button, Input, PageTitle, ProfileSection } from "@/components";
import DateInput from "@/components/input/DateInput";
import { capitalizeFirstLetter } from "@/libs";
import { PreviewChildProps } from "@/types";
import { FieldArray, getIn } from "formik";
import moment from "moment";
import { BsCheck } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { twMerge } from "tailwind-merge";

const Certifications = ({ profile, formik, showForm, showFormHandler }: PreviewChildProps) => {
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
        title: "Certifications",
        icon: graduationHatIcon,
      }}
      button={{
        title: showForm?.certifications ? "Save" : "Add certification",
        icon: showForm?.certifications ? <BsCheck size={24} /> : <IoMdAdd />,
        onClick: () => {
          if (!showForm?.certifications) {
            showFormHandler({ certifications: true });
          } else {
            handleSubmit();
          }
        },
        loading: isSubmitting,
      }}
    >
      {showForm?.certifications ? (
        <FieldArray name="certifications">
          {({ push, remove }) => (
            <>
              <div className="flex flex-col gap-5">
                <PageTitle title="Add Certification" variant="small" />
                {values?.certifications?.map((_, i) => (
                  <div
                    key={i}
                    className={twMerge(
                      "flex flex-col gap-5 bg-gray-50 border border-zana-grey-200 rounded-lg p-5"
                    )}
                  >
                    <Input
                      label="Certification name"
                      name={`certifications.${i}.name`}
                      value={values?.certifications?.[i]?.name as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={getIn(errors, `certifications.${i}.name`) as string}
                      touched={getIn(touched, `certifications.${i}.name`) as boolean}
                      required
                    />
                    <Input
                      label="Issuing organisation"
                      name={`certifications.${i}.issuing_organization`}
                      value={values?.certifications?.[i]?.issuing_organization as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={
                        getIn(errors, `certifications.${i}.issuing_organization`) as string
                      }
                      touched={
                        getIn(touched, `certifications.${i}.issuing_organization`) as boolean
                      }
                      required
                    />
                    <Input
                      label="Credential ID"
                      name={`certifications.${i}.credential_id`}
                      value={values?.certifications?.[i]?.credential_id as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={getIn(errors, `certifications.${i}.credential_id`) as string}
                      touched={getIn(touched, `certifications.${i}.credential_id`) as boolean}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <DateInput
                        label="Issue date"
                        name={`certifications.${i}.issue_date`}
                        value={values?.certifications?.[i]?.issue_date as string}
                        onChange={(date) => {
                          setFieldValue(
                            `certifications.${i}.issue_date`,
                            moment(date as Date).format("YYYY-MM-DD")
                          );
                        }}
                        onBlur={handleBlur}
                        errorMessage={getIn(errors, `certifications.${i}.issue_date`)}
                        touched={getIn(touched, `certifications.${i}.issue_date`)}
                        excludeFutureDays
                      />
                      <DateInput
                        label="Expiration date"
                        name={`certifications.${i}.expiration_date`}
                        value={values?.certifications?.[i]?.expiration_date as string}
                        onChange={(date) => {
                          setFieldValue(
                            `certifications.${i}.expiration_date`,
                            moment(date as Date).format("YYYY-MM-DD")
                          );
                        }}
                        onBlur={handleBlur}
                        errorMessage={getIn(errors, `certifications.${i}.expiration_date`)}
                        touched={getIn(touched, `certifications.${i}.expiration_date`)}
                        excludeFutureDays
                      />
                    </div>

                    <div
                      className={twMerge(
                        "grid grid-cols-2 gap-2 w-full",
                        values?.certifications?.length > 1 ? "grid-cols-3" : ""
                      )}
                    >
                      {values?.certifications && values?.certifications?.length > 1 ? (
                        <Button
                          title="Remove Certification"
                          onClick={() => remove(i)}
                          variant="text"
                        />
                      ) : (
                        ""
                      )}
                      <Button
                        title="Cancel"
                        onClick={() => {
                          showFormHandler({ certifications: false });
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
                  title="+ Add Certification"
                  onClick={() =>
                    push({
                      name: "",
                      issuing_organization: "",
                      issue_date: "",
                      expiration_date: "",
                      credential_id: "",
                      credential_url: "",
                    })
                  }
                />
              </div>
            </>
          )}
        </FieldArray>
      ) : (
        <div className="flex flex-col gap-6">
          {profile?.certifications?.length > 0 ? (
            profile?.certifications?.map((x, i) => (
              <div className="w-full" key={i}>
                <p>{capitalizeFirstLetter(x.name)}</p>
                <p className="text-gray-400 text-sm">
                  {capitalizeFirstLetter(x.issuing_organization)}
                </p>

                <div className="flex justify-between items-center">
                  <p>Credential ID: {x.credential_id}</p>
                  <p>Issued: {moment(x.issue_date).format("MMMM YYYY")}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="w-full"> Certifications not yet added</p>
          )}
        </div>
      )}
    </ProfileSection>
  );
};

export default Certifications;
