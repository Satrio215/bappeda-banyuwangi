import LandingLayout from "@/Layouts/LandingLayout";
import Landing from "@/components/Landing";
import Syarat from "@/components/Syarat";
import Create from "@/Pages/Input/Create";

const Welcome = () => {
  return (
    <div>
      <LandingLayout>
      <Syarat />
      <Landing />
      <Create />
      </LandingLayout>

    </div>
  );
};

export default Welcome;
