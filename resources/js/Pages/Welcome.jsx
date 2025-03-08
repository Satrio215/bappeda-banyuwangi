import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const Welcome = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold">Welcome Page</h2>
        <p>Selamat datang di website kami!</p>
      </div>
    </div>
  );
};

export default Welcome;
