import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import { isOwnerOrAdmin } from "../utils/auth";

type FormActionBarProps = {
    mode: string;
    deleteForm: () => void;
    saveAsDraft: () => void;
    saveForm: () => void;
    updateForm: () => void;
}

function FormActionBar ({mode, deleteForm, saveAsDraft, saveForm, updateForm, owner}: FormActionBarProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
    return (
        <div className="flex justify-between items-center">
          { user
            && mode === 'edit'
            && isOwnerOrAdmin(owner, user)
            && <div>
              
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                onClick={deleteForm}
              >
                {t('delete')} <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          }
          <div className="flex gap-4 items-center justify-end">
            {mode === "create" && (
              <button
                onClick={saveAsDraft}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                {t('saveAsDraft')}
              </button>
            )}
            {mode === "create" && (
              <button
                onClick={saveForm}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
              >
                {t('save')}
              </button>
            )}
            {
              mode === "edit" 
              && user
              && isOwnerOrAdmin(owner, user)
              && <button
                onClick={updateForm}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
              >
                {t('update')}
              </button>
            }
          </div>
        </div>
    )
}

export default FormActionBar;