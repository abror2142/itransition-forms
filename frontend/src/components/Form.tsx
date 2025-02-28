import useForm from "../hooks/useForm";
import axios from "../utils/axios";
import FormSettings from "./Form/FormSettings";
import FormTitle from "./Form/FormTitle";
import FormBottomSideBar from "./Form/FormBottomSideBar";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FormMetaData } from "../schemas/FormMetaDataZod";
import { useAuth } from "../hooks/useAuth";
import { createForm, deleteForm, updateForm } from "../utils/api";
import { useRef } from "react";
import { uploadImage, deleteImage } from "../utils/uploader";
import { takeScreenshot } from "../utils/screenshot";
import DndFields from "./DndFields";
import FormActionBar from "./FormActionBar";

function Form({ data, mode }: { data: FormMetaData; mode: string }) {
  const { authToken } = useAuth();
  const { updateSubmitting, resetForm, updateFormInfoImage, formInfo, formFields } = useForm();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);
  
  const saveForm = async () => {
    updateSubmitting(true);
    const imageUrl = await handleScreenshot();
    const data = {
        formInfo: {
            ...formInfo,
            image: imageUrl || formInfo.image,
          },
        formFields
    }
    const json = JSON.stringify(data);

    try {
      if(authToken){
        const resp = await createForm(json, authToken);
        return navigate(`/`)
      }
    } catch(e) {
        console.log(e);
    } finally {
      updateSubmitting(false);
    }
  };

  const saveAsDraft = async () => {
    const url = "/form/draft/create";
    const data = {
      formInfo,
      formFields,
    };
    const json = JSON.stringify(data);
    try {
      const resp = await axios.post(url, json);
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFormHandler = async () => {
    // send Delete to backend;
    confirmAlert({
      title: "Confirm to Delete.",
      message: "Are you sure to delete this Form?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            if(mode === 'edit' && authToken){
              await deleteForm(authToken, parseInt(formInfo.id))
            }
            // Send delete to backend
            resetForm();
            return navigate("/");
          },
          className: "bg-red-500",
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleScreenshot = async () => {
    if(ref && ref.current){
      const imageFile = await takeScreenshot(ref);
      if(imageFile){
        const imageUrl = await handleUpload(imageFile);
        return imageUrl;
      }; 
    }
  }

  const handleUpload = async (image: File) => {
    if (formInfo.image)
      await deleteImage(formInfo.image);

    const imageUrl = await uploadImage(image);
    
    if (imageUrl) 
      updateFormInfoImage(imageUrl);
    return imageUrl;
  };

  const updateFormObj = async () => {
    const data = {
      formInfo: formInfo,
      formFields: formFields,
    };
    const json = JSON.stringify(data);
    if(authToken){
      try {
        await updateForm(authToken, parseInt(formInfo.id), json);
        return navigate(`/form/${formInfo.id}`);
      } catch (e) {
        console.log(e); 
      }
    }
  };

  return (
    <div ref={ref} className="w-full">
      <div className="flex flex-col gap-4 max-w-3xl mx-auto dark:text-gray-800 my-5">
        <FormSettings data={data} />
        <FormTitle formInfo={formInfo} />
        <DndFields />
        <FormBottomSideBar sequence={formFields.length} />
        <FormActionBar 
          mode={mode} 
          deleteForm={deleteFormHandler} 
          updateForm={updateFormObj} 
          saveAsDraft={saveAsDraft} 
          saveForm={saveForm}
          owner={formInfo.owner}
        />
      </div>
    </div>
  );
}

export default Form;