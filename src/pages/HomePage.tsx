import Header from "../shared/components/Header";
import DashboardPage from "./DashboardPage";

function HomePage() {
  const navLinks = [
    "Dashboard",
    "Watchlist",
    "Portfolio",
    "Positions",
    "Orders",
  ];

  return (
    <div>
      <Header navLinks={navLinks}></Header>
      <DashboardPage></DashboardPage>
    </div>
  );
}

export default HomePage;
