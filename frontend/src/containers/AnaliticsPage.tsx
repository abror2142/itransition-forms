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
            const resp = await getFormAnalytics(id, authToken)
            setForm(JSON.parse(resp?.data) || []);
        }
        if(authToken && id){
            fetchAnalytics();
        }
    }, [])  

    console.log(form)
    return (
        <div>
            <FormAnalyticsCard form={form}/>
        </div>
    )
}

export default AnalyticsPage