import { Outlet } from "react-router-dom";
import UserNavbar from "../components/layouts/User/UserNavbar";
import UserFooter from "../components/layouts/User/UserFooter";

const UserLayout = () => {
  return (
    <>
      <UserNavbar />

      <main>
        <Outlet />
      </main>
      <UserFooter/>
    </>
  );
};

export default UserLayout;