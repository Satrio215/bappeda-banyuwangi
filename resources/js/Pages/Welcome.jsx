import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";
import Syarat from "@/components/Syarat";
import Create from "@/Pages/Input/Create";

const Welcome = ({ user }) => {
  return (
    <div>
      <Syarat />
      <Header />
      <Navbar user={user}/>
      <Landing />
      <Create />

    </div>
  );
};

export default Welcome;
