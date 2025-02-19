import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "../utils/axios";


function Dashboard() {
    const { authToken, user } = useAuth();
    const [data, setData] = useState();

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
        <div className="grid grid-cols-2">
            <div className="bg-blue-600 w-40">
            </div>
            <div className="bg-gray-200 h-full">
                {forms.map((form) => {
                    return (
                        <div key={form.id}>
                            <p>{form.title}</p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Dashboard;