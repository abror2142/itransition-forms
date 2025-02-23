import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormMenuCard from "../components/Cards/FormMenuCard";
import { useState } from "react";
import TagCloud from "../components/Page/TagCloud";
import { useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getHomepageData } from "../utils/api";
import { UserFull } from "../types/User";

export interface HomePageForm {
    id: number;
    owner: UserFull;
    title: string;
    createdAt: string;
    image: string;
}

export const loader = async () => {
    const resp = await getHomepageData();
    return resp.data;
}

function HomePage() {
    const [showMore, setShowMore] = useState(false);
    const {tags, latestForms} = useLoaderData<{tags: string, latestForms: string}>();
    const forms: HomePageForm[] = JSON.parse(latestForms);
    const { t } = useTranslation();
 
    return (
        <div className="flex flex-col gap-5">
           <div className="mt-5 flex gap-4 items-center py-4 px-6 rounded-md
                dark:bg-dark-card-light border dark:border-dark-border">
                <a 
                    href="/form" 
                    className="text-4xl w-[180px] h-[130px] flex items-center 
                    justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm 
                    dark:bg-dark-blue-light dark:border-dark-border">
                    <FontAwesomeIcon icon={faPlus} />
                </a>
           </div>
           <div className="max-w-7xl flex flex-col mx-auto gap-2">
                <p className="text-xl font-medium">{t('latestTemplates')}</p>
                <div className="self-center grid grid-cols-5 gap-4">
                    {forms.slice(0, showMore ? 9 : 5).map((form, index: number) => (<FormMenuCard form={form}  key={"form-card-"+index}/>))}
                    {   
                        showMore 
                        && <div 
                            className="flex flex-col items-center justify-center gap-4 bg-white border 
                                hover:border-blue-500 rounded-sm border-gray-200 shadow-sm
                                dark:bg-gray-800 dark:border-gray-700 h-full px-4 w-full"
                            >
                                <button className="border border-gray-300 w-full rounded-full py-1.5 hover:bg-gray-100 
                                        dark:hover:bg-dark-blue-light dark:border-dark-blue-light"
                                    onClick={() => setShowMore(!showMore)}   
                                >Show less</button>
                                <button className=" bg-blue-800 text-white w-full rounded-full py-1.5 border border-blue-900 hover:bg-blue-900 ">Explore all latest</button>                            
                            </div>
                    }
                </div> 
           </div>
           {
                !showMore 
                && <div 
                    className="self-center bg-white rounded-full max-w-min text-nowrap px-6 py-1.5 flex items-center gap-4 
                                dark:bg-dark-blue-light"
                    onClick={() => setShowMore(!showMore)}
                 >
                 Show more<FontAwesomeIcon icon={faChevronDown} />
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