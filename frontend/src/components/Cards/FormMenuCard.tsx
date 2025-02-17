import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function FormMenuCard ({ form }) {
    
    return (
        <Link to={`/form/${form?.id}/`} 
            className="flex flex-col items-center justify-center gap-2 w-[200px] bg-white border 
                hover:border-blue-500 rounded-sm border-gray-200 shadow-sm
                dark:bg-gray-800 dark:border-gray-700"
        >
            <div className="bg-gray-200  h-[150px] w-full rounded-t-sm">

            </div>
            <div className="bg-white border-t border-gray-200 w-full text-sm px-2 space-y-1 pt-2">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faFileLines} className="text-blue-600 text-lg" />
                    <p className="font-semibold text-gray-600">{form.title}</p>
                </div>
                <div className="flex gap-2 text-sm w-full items-center justify-end text-gray-500">
                    <FontAwesomeIcon icon={faClock} />
                    <p>{form?.createdAt}</p>
                </div>
            </div>
            <div className="text-end flex items-center justify-end gap-2 text-sm w-full px-2 py-1 bg-gray-100 rounded-b-sm">
                <p>by {form?.owner?.email}</p>
                <img className="w-[25px] h-[25px] rounded-full bg-gray-300"/>
            </div>
        </Link>
    )
}

export default FormMenuCard;