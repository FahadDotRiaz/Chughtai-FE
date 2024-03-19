/* eslint-disable no-unused-vars */
import CustomTabs from "../../components/CustomTabs";
import AI_DASHBOARD from "./AI";
import CEO_Dashboard from "./CEO";
import FinanceDashboard from "./Finance";
import Hod from "./HOD/Index";
import Hr from "./HR";
import Rm from "./RM/Index";
import Recruitment from "./Recruitment";
import Store from "./Store";

const Dashboard = () => {
  const tabsData = [
    { label: "Admin", content: <CEO_Dashboard /> },
    // { label: "Finance", content: <FinanceDashboard /> },
    // { label: "HR", content: <Hr /> },
    { label: "Dept. HOD", content: <Hod /> },
    // { label: "Recruitment", content: <Recruitment /> },
    { label: "RM", content: <Rm /> },
    { label: "Store", content: <Store /> },
    { label: "AI", content: <AI_DASHBOARD /> },
  ];
  return <CustomTabs tabsData={tabsData} />;
};
export default Dashboard;
