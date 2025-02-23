import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import FormDashboardCard from "../components/Cards/FormDashboardCard";
import FormDashboardAnswerCard from "../components/Cards/FormDashboardAnswerCard";
import { getDashboardInfo } from "../utils/api";

interface DashboardFormData {
    id: number;
    title: string;
    topic_id: number;
    description: string;
    topic_name: string;
    type_id: number;
    type_name: string;
    response_count: number;
    user_count: number;
    created_at: string;
}

interface DashboardAnswerData {
   id: number;
    created_at: string;
    form_id: number;
    form_title: string;
    email: string;
}

interface DashboardData {
    forms: DashboardFormData[],
    answers: DashboardAnswerData[]
}


function Dashboard() {
    const { authToken } = useAuth();
    const [data, setData] = useState<DashboardData>();

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