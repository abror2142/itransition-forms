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

  const controlStyles = {
    base: "border rounded-lg bg-white hover:cursor-pointer",
    focus: "border-primary-600 ring-1 ring-primary-500",
    nonFocus: "border-gray-300 hover:border-gray-400",
  };
  const placeholderStyles = "text-gray-500 pl-1 py-0.5";
  const selectInputStyles = "pl-1 py-0.5";
  const valueContainerStyles = "p-1 gap-1";
  const singleValueStyles = "leading-7 ml-1";
  const multiValueStyles =
    "bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
  const multiValueLabelStyles = "leading-6 py-0.5";
  const multiValueRemoveStyles =
    "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md";
  const indicatorsContainerStyles = "p-1 gap-1";
  const clearIndicatorStyles =
    "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
  const indicatorSeparatorStyles = "bg-gray-300";
  const dropdownIndicatorStyles =
    "p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black";
  const menuStyles = "p-1 mt-2 border border-gray-200 bg-white rounded-lg";
  const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
  const optionStyles = {
    base: "hover:cursor-pointer px-3 py-2 rounded",
    focus: "bg-gray-100 active:bg-gray-200",
    selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
  };
  const noOptionsMessageStyles =
    "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";
  

  return (
    <div>
      <div
        className={`flex flex-col gap-2 items-center w-full sm:flex-row sm:gap-4 `}
      >
        <TiptapQuestionTitle
          title={formField.title}
          id={formField.id}
        />
        <div className="flex gap-4 justify-between w-full items-center sm:w-auto">
          <div>
            <label
              htmlFor={formField.id}
              className="text-xl hover:bg-gray-100 px-3 py-3 rounded-full flex justify-center items-center text-dark-blue-light dark:hover:bg-dark-blue"
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

            <Select<SelectOption>
              className="my-react-select-container"
              classNamePrefix="my-react-select"
              value={formField.questionType}
              options={options}
              onChange={(selectedOption) =>
                updateQuestionType(formField.id, selectedOption ? selectedOption : null)
              }
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              styles={{
                input: (base) => ({
                  ...base,
                  "input:focus": {
                    boxShadow: "none",
                  },
                }),
                // On mobile, the label will truncate automatically, so we want to
                // override that behaviour.
                multiValueLabel: (base) => ({
                  ...base,
                  whiteSpace: "normal",
                  overflow: "visible",
                }),
                control: (base) => ({
                  ...base,
                  transition: "none",
                }),
              }}
              // components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
              classNames={{
                control: ({ isFocused }) =>isFocused ? controlStyles.focus : controlStyles.nonFocus,
                placeholder: () => placeholderStyles,
                input: () => selectInputStyles,
                valueContainer: () => valueContainerStyles,
                singleValue: () => singleValueStyles,
                multiValue: () => multiValueStyles,
                multiValueLabel: () => multiValueLabelStyles,
                multiValueRemove: () => multiValueRemoveStyles,
                indicatorsContainer: () => indicatorsContainerStyles,
                clearIndicator: () => clearIndicatorStyles,
                indicatorSeparator: () => indicatorSeparatorStyles,
                dropdownIndicator: () => dropdownIndicatorStyles,
                menu: () => menuStyles,
                groupHeading: () => groupHeadingStyles,
                option: ({ isFocused }) => isFocused ? optionStyles.focus : "",
                noOptionsMessage: () => noOptionsMessageStyles,
              }}
              
            />
          
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
