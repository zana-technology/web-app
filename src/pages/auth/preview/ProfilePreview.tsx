import { userIcon } from "@/assets";
import { Button, PageTitle, ProfileSection } from "@/components";
import { title } from "process";
import { MdOutlineEdit } from "react-icons/md";

const ProfilePreview = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full px-5 py-7 bg-zana-color-100 border border-zana-color-300 rounded-2xl mb-7">
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
        ABC
      </ProfileSection>
    </div>
  );
};

export default ProfilePreview;
