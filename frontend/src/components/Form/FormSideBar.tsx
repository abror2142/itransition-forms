import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useForm from "../../hooks/useForm";
import Question from "../../classes/Question";
import { faImage, faPlus} from "@fortawesome/free-solid-svg-icons";
import Image from "../../classes/Image";
import Text from "../../classes/Text";
import { useTranslation } from "react-i18next";

function FormSideBar({ sequence }: {sequence: number}) {
    const { addFormField } = useForm();
    const { t } = useTranslation();
    return (
        <div 
            className="absolute -right-12 flex flex-col gap-2 items-center justify-center bg-white 
            rounded-md px-3 py-2 text-lg max-h-min dark:bg-dark-card-light dark:text-dark-text-highlighted 
            dark:border dark:border-dark-border"
        >
            <div className="flex gap-2 items-center relative group">
                <button 
                    onClick={() => addFormField(new Question(null, "Question"), sequence+1)}
                ><FontAwesomeIcon icon={faPlus}/></button>
                <div className="hidden group-hover:block absolute rounded-sm text-[12px] text-nowrap left-8 bg-gray-600 text-gray-100 px-2">
                    {t('newQuestion')}
                </div>
            </div>
            <div className="flex gap-2 items-center relative group">
                <button 
                    onClick={() => {
                        addFormField(new Image(), sequence+1)
                    }}
                >
                    <FontAwesomeIcon icon={faImage}/>
                </button>
                <div className="hidden group-hover:block absolute rounded-sm text-[12px] text-nowrap left-8 bg-gray-600 text-gray-100 px-2">
                    {t('addImage')}
                </div>
            </div>
            <div className="flex gap-2 items-center relative group">
                <button
                     onClick={() => addFormField(new Text(), sequence+1)}
                >
                    T
                </button>
                <div className="hidden group-hover:block absolute rounded-sm text-[12px] text-nowrap left-8 bg-gray-600 text-gray-100 px-2">
                    {t('addText')}
                </div>
            </div>
        </div>
    )
}

export default FormSideBar;