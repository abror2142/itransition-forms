import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormMenuCard from "../components/Cards/FormMenuCard";
import { useState } from "react";
import TagCloud from "../components/Page/TagCloud";
import { useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getHomepageData } from "../utils/api";

export const loader = async () => {
    const resp = await getHomepageData();
    return resp.data;
}

function HomePage() {
    const [showMore, setShowMore] = useState(false);
    const {tags, latestForms} = useLoaderData();
    const forms = JSON.parse(latestForms);
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-4">
           <div className="bg-gray-200 mt-5 flex gap-4 items-center justify-center py-4 px-6">
                <a href="/form/create" className="text-4xl text-gray-400 w-[180px] h-[130px] flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <FontAwesomeIcon icon={faPlus} />
                </a>
           </div>
           <div className="max-w-7xl flex flex-col mx-auto gap-2">
                <p className="text-xl font-medium">{t('latestTemplates')}</p>
                <div className="self-center grid grid-cols-5 gap-4">
                    {forms.slice(0, showMore ? 9 : 5).map((form, index) => (<FormMenuCard form={form}  key={"form-card-"+index}/>))}
                    {   
                        showMore 
                        && <div  className="flex flex-col items-center justify-center gap-4 w-[200px] bg-white border 
                        hover:border-blue-500 rounded-sm border-gray-200 shadow-sm
                        dark:bg-gray-800 dark:border-gray-700 h-full px-4">
                            <button className="border border-gray-300 w-full rounded-full py-1.5 hover:bg-gray-100 "
                                onClick={() => setShowMore(!showMore)}   
                            >Show less...</button>
                            <button className=" bg-blue-800 text-white w-full rounded-full py-1.5 border border-blue-900 hover:bg-blue-900 ">Explore all latest</button>                            
                        </div>
                    }
                </div> 
           </div>
           {!showMore && <div className="self-center bg-white rounded-full max-w-min text-nowrap px-6 py-1.5 flex items-center gap-4 "
                onClick={() => setShowMore(!showMore)}
            >
                 Show more...<FontAwesomeIcon icon={faChevronDown} />
           </div>}

           <div className="max-w-7xl flex flex-col mx-auto gap-2">
                <p className="text-xl font-medium">Top 5 Templates</p>
                <div className="self-center grid grid-cols-5 gap-4">
                    {forms.slice(0, 5).map((form, index) => (<FormMenuCard form={form} key={"form-card-"+index}/>))}
                </div> 
           </div>
           <TagCloud tags={JSON.parse(tags)} />
        </div>
    )
}

export default HomePage; 