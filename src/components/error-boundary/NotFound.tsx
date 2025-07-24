import { avatar } from "@/assets";
import { useNavigate, useRouteError } from "react-router-dom";
import { Button } from "../button";
import { routes } from "@/router";

export function NotFound() {
  const error = useRouteError();
  console.error(error);

  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col justify-center items-center flex-1 p-5 h-screen">
      <h1 className="font-bold text-[150px]">404</h1>
      <img src={avatar} alt="Zana Avatar" className="h-[142px]" />
      <div className="bg-zana-primary-normal text-white w-full xs:w-[442px] flex flex-col items-center justify-center text-center p-6 rounded-xl gap-8 min-h-[230px]">
        <p className="text-2xl">
          Seems you have wandered into the unknown, this page has either been removed or does not
          exist
        </p>

        <Button
          title="Go to Login"
          fullWidth
          type="submit"
          showArrow={true}
          className="bg-zana-color-500 text-zana-primary-normal hover:bg-zana-color-500 hover:text-zana-primary-normal"
          onClick={() => {
            navigate(routes.auth.login);
          }}
        />
      </div>
    </div>
  );
}
