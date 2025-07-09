import PageTitle from "../page-title";
import { Button } from "../button";
import { ReactNode } from "react";

interface ProfileSectionProps {
  section: {
    title: string;
    icon: string;
  };
  button: {
    title: string;
    icon: ReactNode;
    type?: "button" | "submit";
    onClick?: () => void;
    loading?: boolean;
  };
  children: ReactNode;
}

export const ProfileSection = ({ section, button, children }: ProfileSectionProps) => {
  return (
    <div className="border border-zana-grey-100 w-full rounded-xl  p-3">
      <div className="flex items-center justify-between border-b border-dashed border-b-zana-grey-300 mb-4 pb-1 flex-wrap">
        <PageTitle
          title={section?.title}
          variant="small"
          icon={<img src={section?.icon} className="w-5" />}
          className="whitespace-nowrap"
        />
        <Button
          title={button.title}
          icon={button.icon}
          iconPosition="left"
          variant="text"
          type={button?.type ?? "button"}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            button?.onClick?.();
          }}
          loading={button?.loading}
        />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ProfileSection;
