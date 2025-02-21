import useForm from "../hooks/useForm";
import axios from "../utils/axios";
import FormSettings from "./Form/FormSettings";
import FormTitle from "./Form/FormTitle";
import FormBottomSideBar from "./Form/FormBottomSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FormMetaData } from "../schemas/FormMetaDataZod";
import { useAuth } from "../hooks/useAuth";
import {
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DndContext,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useRef, useState } from "react";
import { FormField } from "../types/FormField";
import SortableFormField from "./SortableFormField";
import { toBlob } from "html-to-image";
import { uploadImage, deleteImage } from "../utils/uploader";
import { useCallback } from "react";
import { v4 as uuid4 } from "uuid";

function Form({ data, mode }: { data: FormMetaData; mode: string }) {
  const { authToken } = useAuth();
  const { updateSubmitting, resetForm, updateDraggable, updateFormInfoImage } = useForm();
  const navigate = useNavigate();
  const { formInfo, formFields } = useForm();
  const [activeField, setActiveField] = useState<FormField | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeField = formFields.find((field) => field.sequence == active.id);
    setActiveField(activeField);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeNode = formFields.find((field) => field.sequence == active?.id);
    const overNode = formFields.find((field) => field.sequence == over?.id);
    console.log(activeNode, overNode);

    if (!activeField || !overNode) return;

    const activeIndex = formFields.findIndex(
      (field) => field.sequence == active.id
    );
    const overIndex = formFields.findIndex(
      (field) => field.sequence == over.id
    );

    if (activeIndex !== overIndex) {
      updateDraggable(activeIndex, overIndex);
    }
    setActiveField(undefined);
  };

  const handleDragCancel = () => {
    setActiveField(undefined);
  };

  const saveForm = async () => {
    const imageUrl = await handleScreenshot();
    updateSubmitting(true);
    const url = "/api/form-create"
    const data = {
        formInfo: {
            ...formInfo,
            image: imageUrl || formInfo.image, // Fallback to existing if needed
          },
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

  const deleteForm = async () => {
    // send Delete to backend;
    confirmAlert({
      title: "Confirm to Delete.",
      message: "Are you sure to delete this Form?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
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

  const handleScreenshot = useCallback(async () => {
    if (ref.current === null) {
      return;
    }
    try {
      const blob = await toBlob(ref.current, {
        cacheBust: true,
        backgroundColor: "#eef2ff",
      });
      if (!blob) throw new Error("Can't take screenshot!");

      const file = new File([blob], `screenshot${uuid4()}.png`, {
        type: "image/png",
      });
      const imageUrl =await handleUpload(file);
      return imageUrl;
    } catch (e) {
      console.log(e);
    }
  }, [ref]);

  const handleUpload = async (image: File) => {
    // if already have an image delete it to replace
    if (formInfo.image) {
      await deleteImage(formInfo.image);
    }
    const imageUrl = await uploadImage(image);
    if (imageUrl) updateFormInfoImage(imageUrl);
    return imageUrl;
  };

  const updateForm = async () => {
    const data = {
      formInfo: formInfo,
      formFields: formFields,
    };
    const json = JSON.stringify(data);
    const url = `form/update/${formInfo.id}`;
    try {
      const resp = await axios.put(url, json, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      });
      return navigate(`/form/${formInfo.id}`);
    } catch (e) {
      if (e.response) {
        console.error("Backend Error:", e.response.data);
      } else {
        console.error("Error:", e.message);
      }
    }
  };

  return (
    <div ref={ref}>
      <div className="flex flex-col gap-4 max-w-3xl mx-auto dark:text-gray-800 my-5">

        <FormSettings data={data} />

        <FormTitle formInfo={formInfo} />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={formFields.map((field) => field.sequence)}
            strategy={verticalListSortingStrategy}
          >
            {formFields.map((formField) => (
              <SortableFormField key={formField.id} formField={formField} />
            ))}
          </SortableContext>

          <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
            {activeField ? (
              <SortableFormField formField={activeField} forceDragging={true} />
            ) : null}
          </DragOverlay>
        </DndContext>

        <FormBottomSideBar order={formFields.length} />
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
            {mode === "create" && (
              <button
                onClick={saveAsDraft}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Save as Draft
              </button>
            )}
            {mode === "create" && (
              <button
                onClick={saveForm}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
              >
                Save
              </button>
            )}
            {mode === "edit" && (
              <button
                onClick={updateForm}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
