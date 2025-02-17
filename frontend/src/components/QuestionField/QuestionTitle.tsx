import TiptapQuestionTitle from "../tiptap/TiptapQuestionTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEllipsisVertical,
  faImage,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { ALLOWED_QUESTION_TYPES } from "../../../config";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import OutsideAlerter from "../../hooks/useOutsideAlterter";
import Question from "../../classes/Question";
import { SelectOption } from "../../types/SelectOption";
import { uploadImage, deleteImage } from "../../utils/uploader";

function QuestionTitle({ formField }: {formField: Question}) {
  const { updateQuestionType, updateFormFieldImage } = useForm();
  const [image, setImage] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  
  let options = ALLOWED_QUESTION_TYPES;
  
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
    <div>
      <div
        className={`flex flex-col gap-2 items-center w-full sm:flex-row sm:gap-4`}
      >
        <TiptapQuestionTitle
          title={formField.title}
          id={formField.id}
        />
        <div className="flex gap-4 justify-between w-full items-center sm:w-auto">
          <div>
            <label
              htmlFor={formField.id}
              className="text-xl hover:bg-gray-100 px-3 py-3 rounded-full flex justify-center items-center text-gray-500"
            >
              <FontAwesomeIcon icon={faImage} />
            </label>
            <input
              id={formField.id}
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div>
            <Select<SelectOption>
              value={formField.questionType}
              options={options}
              onChange={(selectedOption) =>
                updateQuestionType(formField.id, selectedOption ? selectedOption : null)
              }
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              classNames={{
                control: () => "w-[180px]",
              }}
            />
          </div>
        </div>
      </div>
      <div>
            <div className="absolute right-0 bottom-0">
                  {image && uploadingImage && 
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    }
                  {image && !uploadingImage && <div className="w-[35px] h-[35px] rounded-full bg-green-500 flex items-center justify-center text-xl text-white"><FontAwesomeIcon icon={faCheck} /></div>}
            </div>
        {formField.image && image && (
          <div className="relative p-4 flex justify-center">
            <img src={formField.image} alt="Preview" />
            {showCaption && (
              <div className="flex items-center text-sm">
                <input
                  type="text"
                  placeholder="Image caption ..."
                  className="outline-none border-b border-b-gray-400 w-full p-1 mt-2"
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
  );
}

export default QuestionTitle;
