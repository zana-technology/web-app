import { avatar } from "@/assets";
import { useRouteError } from "react-router-dom";
import { Button } from "../button";

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="w-full flex flex-col justify-center items-center flex-1 p-5 h-screen">
      <h1 className="font-bold text-[100px]">OOPS!</h1>
      <img src={avatar} alt="Zana Avatar" className="h-[142px]" />
      <div className="bg-zana-primary-normal text-white w-full xs:w-[442px] flex flex-col items-center justify-center text-center p-6 rounded-xl gap-8 min-h-[230px]">
        <p className="text-2xl">
          Something went wrong. Please try again later or go back to home page
        </p>

        <Button
          title="Go back Home"
          fullWidth
          type="submit"
          showArrow={true}
          className="bg-zana-color-500 text-zana-primary-normal hover:bg-zana-color-500 hover:text-zana-primary-normal"
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>
    </div>
  );
}
