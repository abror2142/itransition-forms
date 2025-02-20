import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "../utils/axios";
import * as React from 'react';
import FormDashboardCard from "../components/Cards/FormDashboardCard";
import FormDashboardAnswerCard from "../components/Cards/FormDashboardAnswerCard";

function Dashboard() {
    const { authToken } = useAuth();
    const [data, setData] = useState();
    const [page, setPage] = React.useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    useEffect(() => {
        
        const fetchDashboard = async () => {
            const url = "/api/dashboard";
            const resp = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setData(resp.data);
        }
        if(authToken)
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