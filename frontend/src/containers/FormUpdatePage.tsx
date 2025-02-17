import { useLoaderData } from "react-router-dom";
import axios from "../utils/axios";
import useForm from "../hooks/useForm";
import Form from "../components/Form";
import { useEffect, useState } from "react";

export const loader = async ({ params }) => {
    const url = `/form/${params.id}`;
    const resp = await axios.get(url);
    const metaResp = await axios.get('/form-meta');
    console.log(metaResp.data)
    return { env: JSON.parse(resp.data), metaData: JSON.parse(metaResp.data)};
}

function FormUpdatePage() {
    const {env, metaData} = useLoaderData();
    const { initialize, initialized, formFields} = useForm();

    useEffect(() => {
        initialize(env);
    }, [])
    
    console.log(metaData);
    return (
        <div>
            <h1>Form Update</h1>
            {initialized &&
            <Form data={metaData} mode={"edit"}/>}
        </div>
    )
}

export default FormUpdatePage;