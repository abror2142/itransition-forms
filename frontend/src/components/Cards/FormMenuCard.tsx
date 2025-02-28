import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faFileLines, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { HomePageForm } from "../../containers/HomePage";

function FormMenuCard ({ form }: {form: HomePageForm}) {
    dayjs.extend(relativeTime);
    console.log(form.owner);
    return (
        <Link to={`/form/${form?.id}/`} 
            className="flex flex-col items-center justify-center gap-2 w-[220px] bg-white border 
                hover:border-dark-blue-light rounded-sm border-gray-200 shadow-sm
                dark:bg-gray-800 dark:border-gray-700 dark:text-dark-text"
        >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-sm dark:bg-dark-blue">
                {form?.image && (
                    <img 
                        src={form.image} 
                        className="w-full h-full object-cover object-top rounded-t-sm" 
                        alt="Form visual" 
                    />
                )}
            </div>
            <div className="w-full text-sm px-2 space-y-1 pt-2 ">
                <div className="flex items-center gap-2 dark:text-dark-blue-light">
                    <FontAwesomeIcon icon={faFileLines} className="text-lg" />
                    <p className="font-semibold " dangerouslySetInnerHTML={{__html: form.title}}></p>
                </div>
                <div className="flex gap-2 text-sm w-full items-center justify-end text-gray-500">
                    <FontAwesomeIcon icon={faClock} />
                    <p>{dayjs(form.createdAt).format('YYYY.MM.DD')}</p>
                </div>
            </div>
            <div className="text-end flex items-center justify-end gap-2 text-sm w-full px-2 py-1 rounded-b-sm dark:text-dark-text-highligted">
                <p>by {form?.owner?.fullName}</p>
                {   form?.owner?.image
                    ? <img className="rounded-full w-9 h-9 object-cover object-center" src={form?.owner?.image}/>
                    : <FontAwesomeIcon icon={faUserCircle} className="text-lg" />
                }
            </div>
        </Link>
    )
}

export default FormMenuCard;