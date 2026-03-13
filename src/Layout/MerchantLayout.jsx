import { Outlet } from "react-router-dom";
import MerchantNavbar from "../components/layouts/Merchant/MerchantNavbar";
import MerchantFooter from "../components/layouts/Merchant/MerchantFooter";

const MerchantLayout = () => {
  return (
    <>
      <MerchantNavbar />

      <main>
        <Outlet />
      </main>
      <MerchantFooter/>
    </>
  );
};

export default MerchantLayout;