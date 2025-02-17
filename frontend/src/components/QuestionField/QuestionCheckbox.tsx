import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import useForm from "../../hooks/useForm";
import Option from "../../classes/Option";
import Question from "../../classes/Question";

function QuestionCheckbox({ formField }: { formField: Question }) {
  const { addFormFieldOption, removeFormFieldOption, changeFormFieldOption } =
    useForm();

  return (
    <div className="flex flex-col gap-1 ">
      {formField.options.map((option, index) => (
        <div
          key={index}
          className="flex gap-4 items-center justify-center w-full px-2 py-1 hover:bg-gray-100 rounded-md"
        >
          <input type="checkbox" name="radio" disabled />
          <input
            type="text"
            value={option.content}
            className="border-none grow-1 outline-none"
            onChange={(e) =>
              changeFormFieldOption(formField.id, option.id, e.target.value)
            }
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => removeFormFieldOption(formField.id, option.id)}
            className="text-red mr-2 text-red-500 hover:bg-gray-300 p-2 rounded-full"
          />
        </div>
      ))}
      <div className="px-6">
        <button
          onClick={() => addFormFieldOption(formField.id, new Option())}
          className="w-full py-1 text-start text-sm border-b border-b-gray-300 dark:bg-gray-700 flex items-center gap-4 text-gray-400"
        >
          <FontAwesomeIcon icon={faCheckSquare} />
          Add a checkbox
        </button>
      </div>
    </div>
  );
}

export default QuestionCheckbox;