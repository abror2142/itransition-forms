import { Link, useLoaderData } from "react-router-dom";
import axios from "../utils/axios";
import FormCard from "../components/Cards/FormCard";
import { useAuth } from "../hooks/useAuth";

export const loader = async ({ params }) => {
    const resp = await axios.get(`/form/${params.id}`);
    return JSON.parse(resp.data);
}

function FormDetailPage () {
    const form = useLoaderData();
    const { user } = useAuth();
    console.log(form)
    return (
        <div className="flex flex-col gap-4 mt-5 items-center max-w-2xl mx-auto">
            { user?.id === form?.formInfo?.owner?.id 
                && <div>
                    <Link to={`/form/edit/${form.formInfo.id}`} className="px-4 py-1.5 bg-white rounded-md">Edit</Link>
                </div>
            }
            <FormCard form={form} />
        </div>
    )
}

export default FormDetailPage;