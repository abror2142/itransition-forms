import useForm from "../hooks/useForm";
import axios from "../utils/axios";
import FormSettings from "./Form/FormSettings";
import FormTitle from "./Form/FormTitle";
import QuestionField from "./QuestionField";
import ImageField from "./ImageField/ImageField";
import TextField from "./TextField/TextField";
import FormBottomSideBar from "./Form/FormBottomSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { FormMetaData } from "../schemas/FormMetaDataZod";
import { useAuth } from "../hooks/useAuth";

function Form ({ data, mode }: {data: FormMetaData, mode: string}) {
    const { authToken } = useAuth();
    const {updateSubmitting, resetForm } = useForm();
    const navigate = useNavigate();
    const {formInfo, formFields} = useForm();

    const saveForm = async () => {
        updateSubmitting(true);
        const url = "/api/form-create"
        const data = {
            formInfo,
            formFields
        }
        const json = JSON.stringify(data);
        try {
            const resp = await axios.post(url, json, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(resp);
        } catch(e) {
            console.log(e);
        }

        console.log(json);
    }   

    const saveAsDraft = async () => {
        const url = "/form/draft/create"
        const data = {
            formInfo,
            formFields
        }
        const json = JSON.stringify(data);
        try {
            const resp = await axios.post(url, json);
            console.log(resp);
        } catch(e) {
            console.log(e);
        }
    }

    const deleteForm = async () => {
        // send Delete to backend;
        confirmAlert({
            title: 'Confirm to Delete.',
            message: 'Are you sure to delete this Form?',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>{
                    // Send delete to backend
                    resetForm();
                    return navigate('/');
                },
                className: "bg-red-500"
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
        })
    }

    const updateForm = async () => {
        const data = {
            formInfo: formInfo,
            formFields: formFields
        }
        const json = JSON.stringify(data);
        const url = `form/update/${formInfo.id}`;
        try{
            const resp = await axios.put(url , json, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });
            return navigate(`/form/${formInfo.id}`)
        }catch (e){
            if (e.response) {
                console.error('Backend Error:', e.response.data);
            } else {
                console.error('Error:', e.message);
            }
        }
    }

    return (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto dark:text-gray-800 my-5">
            <FormSettings data={data} />
            
            <FormTitle formInfo={formInfo} />

            {formFields.map((formField, index: number) => {
                if(formField.type === 'question')
                    return <QuestionField formField={formField} key={"question-field-" + index} />
                if(formField.type === 'image')
                    return <ImageField formField={formField} key={"image-field-" + index} />
                if(formField.type === 'text')
                    return <TextField formField={formField} key={"text-field-" + index} />
            })}
           
            <FormBottomSideBar order={formFields.length}/>
            <div className="flex justify-between items-center">
                <div>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                        onClick={deleteForm}
                    >
                        Delete <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                <div className="flex gap-4 items-center justify-end">
                    {mode === 'create' && <button
                        onClick={saveAsDraft}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                    >Save as Draft</button>}
                    {mode === 'create' && <button
                        onClick={saveForm}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
                    >Save</button>}
                    {mode === 'edit' && <button
                        onClick={updateForm}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
                    >Update</button>}
                </div>
            </div>
        </div>
    )
}

export default Form;