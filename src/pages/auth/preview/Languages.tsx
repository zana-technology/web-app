import { globeIcon } from "@/assets";
import { Button, Input, PageTitle, ProfileSection, Select } from "@/components";
import { toSentenceCase } from "@/libs";
import { PreviewChildProps } from "@/types";
import { FieldArray, getIn } from "formik";
import { BsCheck } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const Languages = ({ profile, formik, showForm, showFormHandler }: PreviewChildProps) => {
  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    touched,
    isSubmitting,
    handleSubmit,
  } = formik;

  const languageProficiencyOptions = [
    { label: "Native / Bilingual", value: "native" },
    { label: "Fluent", value: "fluent" },
    { label: "Professional Working Proficiency", value: "professional" },
    { label: "Limited Working Proficiency", value: "limited" },
    { label: "Elementary Proficiency", value: "elementary" },
    { label: "Basic Understanding", value: "basic" },
  ];

  return (
    <ProfileSection
      section={{
        title: "Languages",
        icon: globeIcon,
      }}
      button={{
        title: showForm?.languages ? "Done editing" : "Add language",
        icon: showForm?.languages ? <BsCheck size={24} /> : <IoMdAdd />,
        onClick: () => {
          if (!showForm?.languages) {
            showFormHandler({ languages: true });
          } else {
            handleSubmit();
          }
        },
        loading: isSubmitting,
      }}
    >
      {showForm?.languages ? (
        <FieldArray name="languages">
          {({ push, remove }) => (
            <>
              <div className="flex flex-col gap-5 bg-gray-50 border border-zana-grey-200 rounded-lg p-5">
                <PageTitle title="Add Languages" variant="small" />
                {values?.languages?.map((_, i) => (
                  <div
                    key={i}
                    className={twMerge(
                      "grid grid-cols-2 gap-5 w-full items-end",
                      values?.languages?.length > 1 ? "grid-cols-[1fr_1fr_40px]" : ""
                    )}
                  >
                    <Input
                      label="Language"
                      name={`languages.${i}.language`}
                      value={values?.languages?.[i]?.language as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={getIn(errors, `languages.${i}.language`) as string}
                      touched={getIn(touched, `languages.${i}.language`) as boolean}
                    />
                    <Select
                      label="Proficiency"
                      name={`languages.${i}.proficiency`}
                      value={values?.languages?.[i]?.proficiency as string}
                      onBlur={handleBlur}
                      errorMessage={getIn(errors, `languages.${i}.proficiency`) as string}
                      touched={getIn(touched, `languages.${i}.language`) as boolean}
                      onChange={(item) => {
                        setFieldValue(`languages.${i}.proficiency`, item.value);
                      }}
                      options={languageProficiencyOptions}
                    />

                    {values?.languages && values?.languages?.length > 1 ? (
                      <MdOutlineDeleteForever
                        className="text-red-500 cursor-pointer"
                        size={24}
                        onClick={() => remove(i)}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-5">
                  <Button
                    title="Cancel"
                    onClick={() => {
                      showFormHandler({ languages: false });
                    }}
                    variant="outlined"
                    className="bg-white"
                  />
                  <Button
                    title="+ Add Language"
                    onClick={() =>
                      push({
                        language: "",
                        proficiency: "",
                      })
                    }
                    className="flex-1"
                  />
                </div>
              </div>
            </>
          )}
        </FieldArray>
      ) : (
        <div className="flex flex-col gap-4">
          {profile?.languages && profile?.languages?.length > 0 ? (
            <>
              {profile?.languages?.map((x, i) => (
                <div key={i} className="flex items-center justify-between">
                  <p>{toSentenceCase(x?.language)}</p>
                  <p className="text-gray-500">{toSentenceCase(x?.proficiency)}</p>
                </div>
              ))}
            </>
          ) : (
            "Languages not yet added"
          )}
        </div>
      )}
    </ProfileSection>
  );
};

export default Languages;
