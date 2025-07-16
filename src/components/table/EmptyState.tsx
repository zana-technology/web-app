import { avatar } from "@/assets";

export const EmptyState = ({ text = "No data found" }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center w-full text-center p-5">
      <img src={avatar} alt="empty" className="w-[10rem] mb-3" />
      <h3 className="text-2xl font-bold max-w-[768]">{text}</h3>
    </div>
  );
};

export default EmptyState;
