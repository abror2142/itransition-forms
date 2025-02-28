import { faChevronRight, faPlus, faRectangleList, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormMenuCard from "../components/Cards/FormMenuCard";
import { useState, useEffect } from "react";
import TagCloud from "../components/Page/TagCloud";
import { Link, useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getHomepageData, getMyForms } from "../utils/api";
import { UserFull } from "../types/User";
import { useAuth } from "../hooks/useAuth";

export interface HomePageForm {
    id: number;
    owner: UserFull;
    title: string;
    createdAt: string;
    image: string;
}

interface MyForm {
    id: number,
    title: string,
    image: string,
    createdAt: string
}

export const loader = async () => {
    const resp = await getHomepageData();
    console.log(resp.data);
    return resp.data;
}

function HomePage() {
    const [showMore, setShowMore] = useState(false);
    const { authToken } = useAuth();
    const {tags, latestForms, popularForms} = useLoaderData<{tags: string, latestForms: string, popularForms: string}>();
    const forms: HomePageForm[] = JSON.parse(latestForms);
    console.log(popularForms);
    const popularForm: HomePageForm[] = JSON.parse(popularForms);
    const { t } = useTranslation();
    const [myForms, setMyForms] = useState<MyForm[]>();
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchMyForms = async () => {
            if(authToken){
                try{
                    const resp = await getMyForms(authToken);
                    setMyForms(resp.data);
                }catch(e) {
                    console.log(e);
                }
            }
        }
        fetchMyForms();
    }, []);

    return (
        <div className="flex flex-col gap-5 my-5">
           <div className="flex gap-4 flex-col py-4 px-6 rounded-md bg-white
                dark:bg-dark-card-light dark:border dark:border-dark-border ">
                <div className="flex justify-between items-center">
                    <p>Start a new form</p>
                    <div 
                        className="flex gap-2 bg-indigo-50 items-center px-2 py-1 dark:bg-dark-blue dark:border dark:border-dark-border rounded-md dark:hover:bg-blue-900"
                        onClick={() => setShowAll(prev => !prev)}    
                    >
                        {   
                            showAll 
                            ? <div className="flex items-center gap-2">
                                <p>Close Gallery view</p>
                                <FontAwesomeIcon icon={faSquareXmark} />
                            </div>
                            : <div className="flex items-center gap-2">
                                <p>My templates Gallery</p>
                                <FontAwesomeIcon icon={faRectangleList} />
                            </div>
                        }
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-5">
                    <div className="flex flex-col gap-2">
                        <a 
                            href="/form" 
                            className="text-4xl w-[180px] h-[130px] flex items-center 
                            justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm 
                            dark:bg-dark-blue-light dark:border-dark-border">
                            <FontAwesomeIcon icon={faPlus} />
                        </a>
                        <p>Blank form</p>
                    </div>
                    { myForms &&  myForms.slice(0, showAll ? myForms.length : 4).map(form => {
                        return (
                            <div className="flex flex-col gap-2">
                                <a 
                                    href={`/form/${form.id}`} 
                                    className="text-4xl w-[180px] h-[130px] flex items-center 
                                    justify-center  bg-white border border-gray-200 rounded-lg shadow-sm 
                                    dark: dark:border-dark-border relative aspect-[4/3] overflow-hidden rounded-t-sm
                                    dark:bg-dark-blue">
                                    <img src={form.image} className="w-full h-full object-cover object-top rounded-t-sm" />
                                </a>
                                <p dangerouslySetInnerHTML={{__html: form.title}}></p>
                            </div>
                        )
                    })}
                </div>
                <Link to={"#"} className="ml-auto text-sm text-blue-600">
                    Explore all
                </Link>
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
                                > {t('showLess')}</button>
                                <button className=" bg-blue-800 text-white w-full rounded-full py-1.5 border border-blue-900 hover:bg-blue-900 ">Explore all latest</button>                            
                            </div>
                    }
                </div> 
           </div>
           {
                !showMore 
                && <div 
                    className="self-end rounded-full max-w-min text-nowrap px-3 text-sm py-1.5 flex items-center gap-4 
                                dark:text-dark-accent dark:bg-dark-blue"
                    onClick={() => setShowMore(!showMore)}
                 >
                 {t('showMore')}<FontAwesomeIcon icon={faChevronRight} />
           </div>}
           <TagCloud tags={JSON.parse(tags)} />

           <div className="max-w-7xl flex flex-col mx-auto gap-2">
                <p className="text-xl font-medium"> {t('topTemplates')}</p>
                <div className="self-center grid grid-cols-5 gap-4">
                    {popularForm.map((form, index) => (<FormMenuCard form={form} key={"form-card-"+index}/>))}
                </div> 
           </div>
        </div>
    )
}

export default HomePage; 