import LandingLayout from "@/Layouts/LandingLayout";
import Cari from "@/Pages/Input/Cari";
import Footer from "@/components/Footer";

const Status = ({ no_tiket, status, user }) => {
    return (
        <div>
            <LandingLayout>
                <Cari no_tiket={no_tiket} status={status} user={user} />
            </LandingLayout>
        </div>
    );
};

export default Status;
