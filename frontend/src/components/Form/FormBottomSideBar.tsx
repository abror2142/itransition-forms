import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useForm from "../../hooks/useForm";
import QuestionClass from "../../classes/Question";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import ImageClass from "../../classes/Image";
import TextClass from "../../classes/Text";
import { useTranslation } from "react-i18next";

function FormBottomSideBar({ sequence }: { sequence: number }) {
  const { addFormField } = useForm();
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 items-center justify-center rounded-md px-3 text-xl max-h-min dark:text-dark-text-highlighted">
      <div className="flex gap-2 items-center relative group">
        <button
          className="bg-white w-[50px] h-[40px] flex items-center justify-center rounded-md hover:border hover:border-gray-400
                dark:bg-dark-card-light dark:border dark:border-dark-border"
          onClick={() => addFormField(new QuestionClass(), sequence + 1)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <div className="hidden group-hover:block absolute rounded-sm text-[12px] text-nowrap left-8 top-11 bg-gray-600 text-gray-100 px-2">
          {t('newQuestion')}
        </div>
      </div>
      <div className="flex gap-2 items-center relative group">
        <button
          className="bg-white w-[50px] h-[40px] flex items-center justify-center rounded-md hover:border hover:border-gray-400
                  dark:bg-dark-card-light dark:border dark:border-dark-border"
          onClick={() => addFormField(new ImageClass(), sequence + 1)}
        >
          <FontAwesomeIcon icon={faImage} />
        </button>
        <div className="hidden group-hover:block absolute rounded-sm text-[12px] text-nowrap left-8 top-11 bg-gray-600 text-gray-100 px-2">
          {t('addImage')}
        </div>
      </div>
      <div className="flex gap-2 items-center relative group">
        <button
          className="bg-white w-[50px] h-[40px] flex items-center justify-center rounded-md hover:border hover:border-gray-400
                  dark:bg-dark-card-light dark:border dark:border-dark-border"
          onClick={() => addFormField(new TextClass(), sequence + 1)}
        >
          T
        </button>
        <div className="hidden group-hover:block absolute rounded-sm text-[12px] text-nowrap left-8 top-11 bg-gray-600 text-gray-100 px-2">
          {t('addText')}
        </div>
      </div>
    </div>
  );
}

export default FormBottomSideBar;
