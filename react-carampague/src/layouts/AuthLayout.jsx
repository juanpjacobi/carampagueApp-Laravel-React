import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <main className="m-auto flex flex-col items-center">
      <div className="w-full border-b border-slate-200 items-center flex flex-col">
        <img
          src="../img/logo.jpg"
          alt="imagen logotipo"
          className="max-w-2xl"
        />
      </div>
      <div className="max-w-2xl p-10 w-full">
        <Outlet />
      </div>
    </main>
  );
};
