import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import FormDashboardCard from "../components/Cards/FormDashboardCard";
import FormDashboardAnswerCard from "../components/Cards/FormDashboardAnswerCard";
import { getDashboardInfo } from "../utils/api";

function Dashboard() {
    const { authToken } = useAuth();
    const [data, setData] = useState();

    useEffect(() => { 
        const fetchDashboard = async () => {
            if(authToken){
                try{
                    const resp = await getDashboardInfo(authToken);
                    setData(resp.data);
                }catch(e) {
                    console.log(e);
                }
            }
        }   
        fetchDashboard();
    }, [])

    const forms = data?.forms || [];
    const answers = data?.answers || [];

    return (
      
        <div className="h-full col-span-10 flex gap-4">
            <div className="w-[220px] bg-amber-800">

            </div>
            <div className="grow-1 grid grid-cols-3 gap-4 m-5">
                {forms.map((form) => {
                   return(<FormDashboardCard form={form}/>)
                })}
            </div>

            <div className="w-[240px] bg-amber-800 flex items-center flex-col gap-2 pt-2 px-2">
                <p className="text-lg text-white">Answers</p>
                {answers.map((answer) => {
                   return(<FormDashboardAnswerCard answer={answer}/>)
                })}
            </div>
        </div>
    
    )
}

export default Dashboard;