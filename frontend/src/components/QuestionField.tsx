import { ALLOWED_QUESTION_TYPES } from "../../config";
import QuestionMultipleChoice from "./QuestionField/QuestionMultipleChoice";
import QuestionTitle from "./QuestionField/QuestionTitle";
import QuestionParagraph from "./QuestionField/QuestionParagraph";
import QuestionText from "./QuestionField/QuestionText";
import QuestionCheckbox from "./QuestionField/QuestionCheckbox";
import { useState } from "react";
import OutsideAlerter from "../hooks/useOutsideAlterter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faGrip, faTrash } from "@fortawesome/free-solid-svg-icons";
import useForm from "../hooks/useForm";
import FormSideBar from "./Form/FormSideBar";
import Question from "../classes/Question";
import QuestionInteger from "./QuestionField/QuestionInteger";
import { useSortable } from "@dnd-kit/sortable";
import { useTranslation } from "react-i18next";

function QuestionField({ formField }: { formField: Question}) {
  const [active, setActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { removeFormField, updateFormFieldRequired } = useForm();
  const {attributes, listeners, setActivatorNodeRef } = useSortable({id: formField.sequence});
  const { t } = useTranslation();
  return (
    <OutsideAlerter setActive={setActive}>
      <div className="flex gap-2 relative  ">
        <div
          className={` border-l-6 border-blue-500 ${
            active ? "rounded-s-md" : "border-transparent"
          } grow-1`}
          onClick={() => setActive(true)}
        >
          <div className="dark:border dark:border-dark-border">
          <div
            className={` bg-white dark:bg-dark-card-light px-3 py-3 flex flex-col gap-4${
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
            <QuestionTitle formField={formField} />

            {formField.questionType?.id == ALLOWED_QUESTION_TYPES[0]?.id && (
              <QuestionMultipleChoice formField={formField} />
            )}

            {formField.questionType?.id == ALLOWED_QUESTION_TYPES[1]?.id && (
              <QuestionCheckbox formField={formField} />
            )}

            {formField.questionType?.id == ALLOWED_QUESTION_TYPES[2]?.id && (
              <QuestionParagraph />
            )}

            {formField.questionType?.id == ALLOWED_QUESTION_TYPES[3]?.id && (
              <QuestionText />
            )}

            {formField.questionType?.id == ALLOWED_QUESTION_TYPES[4]?.id && (
              <QuestionInteger />
            )}
          </div>

          <div className="bg-white flex justify-between items-center px-4 py-2 border-t border-t-gray-300
                 dark:border-t-dark-border dark:bg-dark-card-light dark:text-dark-text"
          >
            <button
              onClick={() => removeFormField(formField.id)}
              className="w-[35px] h-[35px] flex items-center justify-center text-lg dark:hover:bg-dark-blue rounded-full "
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <div className="flex gap-4 items-center">
              <div>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  value="" 
                  className="sr-only peer" 
                  defaultChecked={formField.required} 
                  onChange={() => updateFormFieldRequired(formField.id)}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{t('required')}</span>
              </label>
              </div>
              <div className="relative">
                <OutsideAlerter setActive={setShowOptions}>
                  <div
                    className="w-[35px] h-[35px] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-dark-blue rounded-full"
                    onClick={() => setShowOptions(!showOptions)}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} className="text-lg"/>
                  </div>
                  {showOptions && (
                    <div className="absolute bg-white rounded-md dark:bg-dark-bg text-nowrap py-2 flex px-2 flex-col gap-1 right-0 ">
                      <button className="hover:bg-gray-100 w-full px-6 py-1 text-start dark:hover:bg-dark-blue">
                        {t('addDescription')}
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

export default QuestionField;
