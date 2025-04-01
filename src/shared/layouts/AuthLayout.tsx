import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground/AnimatedBackground";

const AuthLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />{" "}
      </main>
      <Footer />
      <AnimatedBackground />
    </div>
  );
};

export default AuthLayout;
