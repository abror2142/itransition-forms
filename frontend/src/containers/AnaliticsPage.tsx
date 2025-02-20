import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "../utils/axios";
import { useAuth } from "../hooks/useAuth";
import FormAnalyticsCard from "../components/Cards/FormAnalyticsCard";


function AnalyticsPage () {
    const { id } = useParams();
    const { authToken } = useAuth();
    const [data, setData] = useState();
    const [form, setForm] = useState();

    useEffect(() => {
        const fetchAnalytics = async () => {
            const url = `api/form-analytics/${id}`;
            const resp = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            setForm(JSON.parse(resp?.data) || []);
        }
        if(authToken)
            fetchAnalytics();
    }, [])  

    console.log(form)
    return (
        <div>
            <FormAnalyticsCard form={form}/>
        </div>
    )
}

export default AnalyticsPage