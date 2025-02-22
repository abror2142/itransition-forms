import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type FormActionBarProps = {
    mode: string;
    deleteForm: () => void;
    saveAsDraft: () => void;
    saveForm: () => void;
    updateForm: () => void;
}

function FormActionBar ({mode, deleteForm, saveAsDraft, saveForm, updateForm}: FormActionBarProps) {
    return (
        <div className="flex justify-between items-center">
          <div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              onClick={deleteForm}
            >
              Delete <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div className="flex gap-4 items-center justify-end">
            {mode === "create" && (
              <button
                onClick={saveAsDraft}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Save as Draft
              </button>
            )}
            {mode === "create" && (
              <button
                onClick={saveForm}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
              >
                Save
              </button>
            )}
            {mode === "edit" && (
              <button
                onClick={updateForm}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
              >
                Update
              </button>
            )}
          </div>
        </div>
    )
}

export default FormActionBar;