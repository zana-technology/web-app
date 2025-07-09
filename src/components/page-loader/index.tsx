import { BarLoader, MoonLoader } from "react-spinners";

export const PageLoader = ({
  loading = true,
  title = "Please wait",
  className,
  variant = "default",
  hideTitle = true,
}: {
  loading?: boolean;
  hideTitle?: boolean;
  title?: string;
  className?: string;
  variant?: "default" | "bar";
}) => {
  return (
    <div className={`flex flex-col items-center w-full ${className ? className : ""}`}>
      {!hideTitle && <h3 className="mb-3 font-bold text-3xl">{title}</h3>}
      {variant === "bar" ? (
        <BarLoader color="#255A5A" loading={loading} />
      ) : (
        <MoonLoader color="#255A5A" loading={loading} size={75} />
      )}
    </div>
  );
};

export default PageLoader;
