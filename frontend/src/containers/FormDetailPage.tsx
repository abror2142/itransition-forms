import { Link, useLoaderData } from "react-router-dom";
import FormCard from "../components/Cards/FormCard";
import { useAuth } from "../hooks/useAuth";
import FormComments from "../components/FormComments";
import FormLike from "./FormLike";
import { getFormDetail } from "../utils/api";
import { Params } from "../types/Params";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const loader = async ({ params }: Params) => {
    const id = parseInt(params?.id);
    const resp = await getFormDetail(id);
    return resp.data;
}

function FormDetailPage () {
    const data = useLoaderData();
    const form = JSON.parse(data);
    const { user } = useAuth();
    const [mode, setMode] = useState<string>("readonly");
    const navigate = useNavigate();

    const type = form.formInfo?.type?.name ;
    if (type === "Private"){
        return navigate('/');
    }

    useEffect(() => {
        if(user){
            if(type === "Public")
                setMode('answer')
            else if(type === "Protected"){
                const findUser = form.formInfo?.users.find((person) =>  person.id == user.id) != null;
                if(findUser)
                    setMode('answer')
                else
                    setMode('readonly')
            } 
        } else {
            setMode('readonly')
        }
    }, [form])

    return (
        <div>
            <div className="w-full flex flex-col gap-4 mt-5 items-center max-w-2xl mx-auto">
                <div className="flex justify-between items-center w-full">
                { user?.id === form?.formInfo?.owner?.id 
                    && <div>
                        <Link to={`/form/edit/${form.formInfo.id}`} className="px-4 py-1.5 bg-white rounded-md dark:bg-dark-blue-light">Edit</Link>
                    </div>
                }
                <div>
                    Mode: <span className="px-4 py-1 bg-white rounded-md dark:bg-dark-blue-light">{mode}</span>
                </div>
                </div>
                <FormCard form={form} mode={mode} />
                <FormLike formId={form.formInfo.id} />
                <FormComments formId={form.formInfo.id} />
            </div>
            
        </div>
    )
}

export default FormDetailPage;