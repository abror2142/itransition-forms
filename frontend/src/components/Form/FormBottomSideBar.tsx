import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useForm from "../../hooks/useForm";
import QuestionClass from "../../classes/Question";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import ImageClass from "../../classes/Image";
import TextClass from "../../classes/Text";

function FormBottomSideBar({ order }: { order: number }) {
  const { addFormField } = useForm();

  return (
    <div className="flex gap-4 items-center justify-center rounded-md px-3 text-xl max-h-min">
      <div className="flex gap-2 items-center relative group">
        <button
          className="bg-white w-[50px] h-[40px] flex items-center justify-center rounded-md hover:border hover:border-gray-400"
          onClick={() => addFormField(new QuestionClass(), order + 1)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <div className="hidden group-hover:block absolute rounded-sm text-[12px] text-nowrap left-8 top-11 bg-gray-600 text-gray-100 px-2">
          New Question
        </div>
      </div>
      <div className="flex gap-2 items-center relative group">
        <button
          className="bg-white w-[50px] h-[40px] flex items-center justify-center rounded-md hover:border hover:border-gray-400"
          onClick={() => addFormField(new ImageClass(), order + 1)}
        >
          <FontAwesomeIcon icon={faImage} />
        </button>
        <div className="hidden group-hover:block absolute rounded-sm text-[12px] text-nowrap left-8 top-11 bg-gray-600 text-gray-100 px-2">
          Add image
        </div>
      </div>
      <div className="flex gap-2 items-center relative group">
        <button
          className="bg-white w-[50px] h-[40px] flex items-center justify-center rounded-md hover:border hover:border-gray-400"
          onClick={() => addFormField(new TextClass(), order + 1)}
        >
          T
        </button>
        <div className="hidden group-hover:block absolute rounded-sm text-[12px] text-nowrap left-8 top-11 bg-gray-600 text-gray-100 px-2">
          Title & Description
        </div>
      </div>
    </div>
  );
}

export default FormBottomSideBar;
