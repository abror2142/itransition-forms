import { ALLOWED_QUESTION_TYPES } from "../../config";
import QuestionMultipleChoice from "./QuestionField/QuestionMultipleChoice";
import QuestionTitle from "./QuestionField/QuestionTitle";
import QuestionParagraph from "./QuestionField/QuestionParagraph";
import QuestionText from "./QuestionField/QuestionText";
import QuestionCheckbox from "./QuestionField/QuestionCheckbox";
import { useState } from "react";
import OutsideAlerter from "../hooks/useOutsideAlterter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import useForm from "../hooks/useForm";
import FormSideBar from "./Form/FormSideBar";
import Question from "../classes/Question";
import QuestionInteger from "./QuestionField/QuestionInteger";

function QuestionField({ formField }: { formField: Question}) {
  const [active, setActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { removeFormField } = useForm();

  return (
    <OutsideAlerter setActive={setActive}>
      <div className="flex gap-2 relative">
        <div
          className={` border-l-6 border-blue-500 ${
            active ? "rounded-s-md" : "border-transparent"
          } grow-1`}
          onClick={() => setActive(true)}
        >
          <div
            className={`bg-white px-3 py-3 flex flex-col gap-4 ${
              active ? "rounded-rt-lg" : "rounded-t-lg"
            }`}
          >
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

          <div className="bg-white flex justify-between items-center px-4 py-2 border-t border-gray-300">
            <button
              onClick={() => removeFormField(formField.id)}
              className="text-gray-500"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <div className="flex gap-4 items-center">
              <div>
                {/* <Toggle 
                                labelLeft="Required"
                                width={40}
                                height={20}
                                sliderHeight={16} 
                                sliderWidth={16}   
                                translate={16}
                                /> */}
              </div>
              <div className="relative">
                <OutsideAlerter setActive={setShowOptions}>
                  <div
                    className="w-[30px] h-[30px] flex items-center justify-center hover:bg-gray-200 rounded-full"
                    onClick={() => setShowOptions(!showOptions)}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </div>
                  {showOptions && (
                    <div className="absolute bg-white rounded-md  text-nowrap py-4 flex px-1 flex-col gap-1 right-0 ">
                      <button className="hover:bg-gray-100 w-full px-6 py-1 text-start">
                        Add Description
                      </button>
                      <button className="hover:bg-gray-100 w-full px-6 py-1 text-start">
                        Do another
                      </button>
                    </div>
                  )}
                </OutsideAlerter>
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
