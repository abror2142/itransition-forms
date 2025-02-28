import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getFormAnalytics } from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import FormAnalyticsCard from "../components/Cards/FormAnalyticsCard";


function AnalyticsPage () {
    const { id } = useParams();
    const { authToken } = useAuth();
    const [form, setForm] = useState();

    useEffect(() => {
        const fetchAnalytics = async () => {
            if(id && authToken){
                const idNum = parseInt(id);
                const resp = await getFormAnalytics(idNum, authToken)
                setForm(JSON.parse(resp?.data) || []);
            }
        }
        fetchAnalytics();
    }, [])  

    return (
        <div>
            <FormAnalyticsCard form={form}/>
        </div>
    )
}

export default AnalyticsPage