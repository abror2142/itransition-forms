import { useLoaderData } from "react-router-dom";
import useForm from "../hooks/useForm";
import Form from "../components/Form";
import { useEffect } from "react";
import { formatToObject } from "../utils/axios";
import { getFormMetaInfo, getFormDetail } from "../utils/api";

export const loader = async ({ params }) => {
    const id = parseInt(params?.id);
    const resp = await getFormDetail(id);
    const metaResp = await getFormMetaInfo();
    return { form: formatToObject(resp.data), metaData: formatToObject(metaResp.data)};
}

function FormUpdatePage() {
    const {form, metaData} = useLoaderData();
    const { initialize, initialized } = useForm();

    useEffect(() => {
        initialize(form);
    }, [])
    
    return (
        <div>
            <h1>Form Update</h1>
            {initialized &&
            <Form data={metaData} mode={"edit"}/>}
        </div>
    )
}

export default FormUpdatePage;