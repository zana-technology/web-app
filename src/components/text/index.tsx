import { toSentenceCase } from "@/libs";
import { twMerge } from "tailwind-merge";

interface TextProps {
  label?: string;
  value: string | number;
  variant?: "default" | "beside" | "switch";
  hasStatus?: boolean;
  sentenceCase?: boolean;
}

export const Text = ({
  label,
  value,
  variant = "default",
  //   hasStatus = false,
  sentenceCase = false,
}: TextProps) => {
  return (
    <div className={`max-w-prose ${variant === "beside" ? "grid grid-cols-[40%_1fr] gap-5" : ""}`}>
      {label ? (
        <p
          className={twMerge(
            "text-gray-500 text-sm mb-1",
            variant === "beside" ? "font-semibold text-dark-700 text-base" : "",
            variant === "switch" ? "font-semibold text-dark-700" : ""
          )}
        >
          {label}
        </p>
      ) : (
        ""
      )}

      <p className={twMerge("break-words", variant === "switch" ? "text-dark-400 text-sm" : "")}>
        {sentenceCase ? toSentenceCase(value as string) : value}
      </p>
    </div>
  );
};

export default Text;
