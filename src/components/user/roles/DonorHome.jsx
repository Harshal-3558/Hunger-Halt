import { useSelector } from "react-redux";
import CreateDonation from "./donor/CreateDonation";

export default function DonorHome(){
    const user = useSelector((state) => state.auth.user);
    return(
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
            <div className="md:flex justify-between space-y-2">
               <CreateDonation/>

                <div className="h-32 md:h-44 w-full md:w-[600px] bg-slate-200 border rounded-xl">

                </div>
            </div>
        </div>
    )
}