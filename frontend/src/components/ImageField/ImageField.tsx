import { useState, useEffect } from "react";
import TiptapQuestionTitle from "../tiptap/TiptapQuestionTitle";
import OutsideAlerter from "../../hooks/useOutsideAlterter";
import FormSideBar from "../Form/FormSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faGrip, faTrash } from "@fortawesome/free-solid-svg-icons";
import useForm from "../../hooks/useForm";
import Image from "../../classes/Image";
import { uploadImage, deleteImage } from "../../utils/uploader";
import { useSortable } from "@dnd-kit/sortable";

function ImageField({ formField }: { formField: Image }) {
  const { updateFormFieldImage, updateImageFieldCaption } = useForm();
  const [active, setActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { removeFormField } = useForm();
  const [image, setImage] = useState<File | null>();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const {attributes, listeners, setActivatorNodeRef } = useSortable({id: formField.sequence});

   async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
      const file = event.target.files?.[0];
      if (file) {
        setImage(file);
        setUploadingImage(true);
      }
    }
  
    useEffect(() => {
      const handleUpload = async (image: File) => {
        // if already have an image delete it to replace
        if(formField.image){
          await deleteImage(formField.image);
        }
        const imageUrl = await uploadImage(image)
        if(imageUrl)
          updateFormFieldImage(formField.id, imageUrl);
        setUploadingImage(false);
      };
      
      if(image) {
        handleUpload(image);
      }
    }, [image])
  
    const cancelImage = async () => {
      if(formField.image)
        await deleteImage(formField.image)
      setImage(null);
    };

  return (
    <OutsideAlerter setActive={setActive}>
      <div className="flex gap-2 relative">
        <div
          className={` border-l-6 border-blue-500 ${
            active ? "rounded-s-md" : "border-transparent"
          } grow-1`}
          onClick={() => setActive(true)}
        >
          <div className="dark:border dark:border-dark-border">
            <div
              className={`bg-white px-3 py-3 flex flex-col gap-4 dark:bg-dark-card-light ${
                active ? "rounded-rt-lg" : "rounded-t-lg"
              }`}
            >
              <button 
                  ref={setActivatorNodeRef}
                  className="bg-white w-full dark:bg-dark-card-light dark:text-dark-text"
                  // style={draggableStyle}
                  {...attributes}
                  {...listeners}
              ><FontAwesomeIcon icon={faGrip} /></button>
              
              <TiptapQuestionTitle
                id={formField.id}
                title={formField.title}
              />

              {!formField.image && (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}

              <div>
                {image && formField.image && (
                  <div className="relative p-4">
                    <img src={formField.image} alt="Preview" />
                    {showCaption && (
                      <div className="flex items-center text-sm">
                        <input
                          type="text"
                          placeholder="Image caption ..."
                          className="outline-none border-b border-b-gray-400 w-full p-1 mt-2"
                          onChange={(e) => updateImageFieldCaption(formField.id, e.target.value)}
                        />
                      </div>
                    )}
                    <OutsideAlerter setActive={setShowImageOptions}>
                      <div
                        onClick={() => setShowImageOptions(!showImageOptions)}
                        className="absolute top-1 left-1 w-[40px] h-[40px] rounded-full flex flex-col justify-center items-center bg-gray-200"
                      >
                        <button>
                          <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                      </div>
                      <div>
                        {showImageOptions && (
                          <div className="absolute top-11  bg-white flex flex-col gap-2 px-4 py-2">
                            <button
                              className="flex justify-between items-center hover:bg-gray-200 px-3 py-1"
                              onClick={cancelImage}
                            >
                              Delete
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button
                              className="hover:bg-gray-200 px-3 py-1"
                              onClick={() => setShowCaption((prev) => !prev)}
                            >
                              {showCaption ? "Remove caption" : "Add caption"}
                            </button>
                          </div>
                        )}
                      </div>
                    </OutsideAlerter>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white flex justify-between items-center px-4 py-2 border-t border-gray-300
            dark:border-t-dark-border dark:bg-dark-card-light dark:text-dark-text">
              <button
                onClick={() => removeFormField(formField.id)}
                className="w-[35px] h-[35px] flex items-center justify-center text-lg dark:hover:bg-dark-blue rounded-full"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <OutsideAlerter setActive={setShowOptions}>
                    <div
                      className="w-[35px] h-[35px] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-dark-blue rounded-full"
                      onClick={() => setShowOptions(!showOptions)}
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                    {showOptions && (
                      <div className="absolute bg-white rounded-md dark:bg-dark-bg text-nowrap py-2 flex px-2 flex-col gap-1 right-0 ">
                        <button className="hover:bg-gray-100 w-full px-6 py-1 text-start dark:hover:bg-dark-blue">
                          Add Description
                        </button>
                        <button className="hover:bg-gray-100 w-full px-6 py-1 text-start dark:hover:bg-dark-blue">
                          Do another
                        </button>
                      </div>
                    )}
                  </OutsideAlerter>
                </div>
              </div>
            </div>
          </div>
        </div>
        {active && <FormSideBar sequence={formField.sequence} />}
      </div>
    </OutsideAlerter>
  );
}

export default ImageField;