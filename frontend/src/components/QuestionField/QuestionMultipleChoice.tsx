import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useForm from "../../hooks/useForm";
import Option from "../../classes/Option";
import Question from "../../classes/Question";
import { useTranslation } from "react-i18next";


function QuestionMultipleChoice({ formField }: {formField: Question}) {;
    const { addFormFieldOption, removeFormFieldOption, changeFormFieldOption } = useForm();
    const { t } = useTranslation()
    return (
        <div className="flex flex-col gap-1 dark:text-dark-text ">
            {formField.options.map((option, index) => (
                <div key={index} className="flex gap-4 items-center justify-center w-full px-2 hover:bg-gray-100 dark:hover:bg-dark-bg border border-transparent dark:hover:border dark:hover:border-dark-border rounded-md">
                    <input
                        type="radio"
                        name="radio"
                        disabled
                    />
                    <input
                        type="text"
                        value={option.content}
                        className="border-none grow-1 outline-none"
                        onChange={(e) => changeFormFieldOption(formField.id, option.id, e.target.value)}
                    />
                    <FontAwesomeIcon 
                        icon={faTrash} 
                        onClick={() => removeFormFieldOption(formField.id, option.id)} 
                        className="text-red mr-2 text-red-500 hover:bg-gray-300 dark:hover:bg-dark-blue p-2 rounded-full"
                    />
                </div>
            ))}
            <div className="px-6">
                <button 
                    onClick={() => addFormFieldOption(formField.id, new Option())}
                    className="w-full py-1 text-start text-sm border-b border-b-gray-300 flex items-center gap-4 text-gray-400"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    {t('addOption')}
                </button>
            </div>
        </div>
    );
}

export default QuestionMultipleChoice;
