import {
  briefcaseIcon,
  codepenIcon,
  fileIcon,
  globeIcon,
  graduationHatIcon,
  userIcon,
} from "@/assets";
import { PageTitle, ProfileSection, Text } from "@/components";
import { MdOutlineEdit } from "react-icons/md";
import { useProfilePreview } from "./logic";
import { IoMdAdd } from "react-icons/io";
import { toSentenceCase } from "@/libs";

const ProfilePreview = () => {
  const { isLoading, profile, personalInformation } = useProfilePreview();

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="w-full px-5 py-7 bg-zana-color-100 border border-zana-color-300 rounded-2xl">
        <PageTitle
          title="Profile Preview"
          subtitle="Review and edit where needed, the information extracted from your CV"
        />
      </div>
      <ProfileSection
        section={{
          title: "Personal information",
          icon: userIcon,
        }}
        button={{
          title: "Edit",
          icon: <MdOutlineEdit />,
        }}
      >
        <div className="flex flex-col gap-6">
          {personalInformation?.map((x, i) => (
            <Text key={i} label={x.label} value={x.value} />
          ))}
        </div>
      </ProfileSection>
      <ProfileSection
        section={{
          title: "Skills",
          icon: codepenIcon,
        }}
        button={{
          title: "Add skills",
          icon: <IoMdAdd />,
        }}
      >
        <div className="flex items-center gap-4">
          {profile?.skills && profile?.skills?.length > 0 ? (
            <>
              {profile?.skills?.map((x, i) => (
                <div key={i}>{x}</div>
              ))}
            </>
          ) : (
            "Skills not yet added"
          )}
        </div>
      </ProfileSection>
      <ProfileSection
        section={{
          title: "Languages",
          icon: globeIcon,
        }}
        button={{
          title: "Add language",
          icon: <IoMdAdd />,
        }}
      >
        <div className="flex flex-col gap-4">
          {profile?.languages && profile?.languages?.length > 0 ? (
            <>
              {profile?.languages?.map((x, i) => (
                <div key={i} className="flex items-center justify-between">
                  <p>
                    {toSentenceCase(x?.language)}{" "}
                    <span className="text-gray-500 text-sm">Edit</span>
                  </p>
                  <p className="text-gray-500">
                    {toSentenceCase(x?.proficiency)}
                  </p>
                </div>
              ))}
            </>
          ) : (
            "Languages not yet added"
          )}
        </div>
      </ProfileSection>
      <ProfileSection
        section={{
          title: "Professional Summary ",
          icon: fileIcon,
        }}
        button={{
          title: "Edit",
          icon: <MdOutlineEdit />,
        }}
      >
        <p className="w-full">
          {profile?.professional_summary ??
            "Professional summary not yet added"}
        </p>
      </ProfileSection>
      <ProfileSection
        section={{
          title: "Work Experience",
          icon: briefcaseIcon,
        }}
        button={{
          title: "Add experience",
          icon: <IoMdAdd />,
        }}
      >
        <p className="w-full">
          {profile?.professional_summary ?? "Work Experience not yet added"}
        </p>
      </ProfileSection>
      <ProfileSection
        section={{
          title: "Education",
          icon: graduationHatIcon,
        }}
        button={{
          title: "Add education",
          icon: <IoMdAdd />,
        }}
      >
        <p className="w-full">
          {profile?.professional_summary ?? "Work Experience not yet added"}
        </p>
      </ProfileSection>
      <ProfileSection
        section={{
          title: "Certifications",
          icon: graduationHatIcon,
        }}
        button={{
          title: "Add certification",
          icon: <IoMdAdd />,
        }}
      >
        <p className="w-full">
          {profile?.professional_summary ?? "Work Experience not yet added"}
        </p>
      </ProfileSection>
    </div>
  );
};

export default ProfilePreview;
