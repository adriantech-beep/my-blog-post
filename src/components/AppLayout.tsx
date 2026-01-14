import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const AppLayout = () => {
  return (
    <div className="lg:w-full h-full mx-auto px-4 py-8 flex flex-col bg-gray-100">
      <Navigation />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
