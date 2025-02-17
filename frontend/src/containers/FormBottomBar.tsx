import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormBottomBar () {
    return (
        <div className="px-4 py-2 rounded-md bg-white w-full flex justify-between items-center">
            <div>
                <FontAwesomeIcon icon={faThumbsUp} />
                
            </div>
        </div>
    )
}

export default FormBottomBar;