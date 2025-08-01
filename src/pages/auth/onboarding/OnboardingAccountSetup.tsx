import { Dropzone, Input, PhoneInput } from "@/components";
import { FileWithPreview, OnboardingFormValues } from "@/types";
import { FormikProps } from "formik";

const OnboardingAccountSetup = ({ formik }: { formik: FormikProps<OnboardingFormValues> }) => {
  const { values, touched, handleBlur, errors, handleChange, setFieldValue } = formik;

  return (
    <>
      <Input
        label="Full name"
        name="full_name"
        value={values.full_name}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={errors.full_name}
        touched={touched.full_name}
        placeholder="e.g Kesiena Omonigho, Samson "
        required
        note="This name should tally with the name that is on your CV"
      />
      <PhoneInput
        label="Phone number"
        name={`phone_number`}
        value={values?.phone_number as string}
        onChange={(value) => {
          setFieldValue(`phone_number`, value);
        }}
        onBlur={handleBlur}
        errorMessage={errors.phone_number}
        touched={touched?.phone_number}
        defaultCountry={"US"}
      />
      <Input
        label="Portfolio link"
        name="portfolio_url"
        value={values.portfolio_url}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={errors.portfolio_url}
        touched={touched.portfolio_url}
        placeholder="http:// "
      />
      <Dropzone
        label="CV/Resume"
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
    </>
  );
};

export default OnboardingAccountSetup;
