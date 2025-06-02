import LandingLayout from "@/Layouts/LandingLayout";
import Landing from "@/components/Landing";
import Syarat from "@/components/Syarat";
import Create from "@/Pages/Input/Create";

const Welcome = ({ email, user }) => {
    return (
        <div>
            <LandingLayout>
                <Syarat />
                <Landing user={user} />
                {email && <Create email={email} />}
            </LandingLayout>
        </div>
    );
};

export default Welcome;
