import { Link, useLoaderData } from "react-router-dom";
import FormCard from "../components/Cards/FormCard";
import { useAuth } from "../hooks/useAuth";
import FormComments from "../components/FormComments";
import FormLike from "./FormLike";
import { getFormDetail } from "../utils/api";

export const loader = async ({ params }) => {
    const id = parseInt(params?.id);
    const resp = await getFormDetail(id);
    return JSON.parse(resp.data);
}

function FormDetailPage () {
    const form = useLoaderData();
    const { user } = useAuth();
    console.log(form)
    return (
        <div className="w-full flex flex-col gap-4 mt-5 items-center max-w-2xl mx-auto">
            { user?.id === form?.formInfo?.owner?.id 
                && <div>
                    <Link to={`/form/edit/${form.formInfo.id}`} className="px-4 py-1.5 bg-white rounded-md">Edit</Link>
                </div>
            }
            <FormCard form={form} />
            <FormLike formId={form.formInfo.id} />
            <FormComments formId={form.formInfo.id} />
        </div>
    )
}

export default FormDetailPage;