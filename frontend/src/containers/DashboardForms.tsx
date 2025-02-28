import { useEffect, useState } from "react";
import { getDashboardForms } from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import DashboardFormCard from "../components/Cards/DashboardFormCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export interface DashboardFormData {
    id: number;
    title: string;
    topic_id: number;
    description: string;
    topic_name: string;
    type_id: number;
    type_name: string;
    response_count: number;
    user_count: number;
    created_at: string;
}

function DashboardForms () {
    const { authToken } = useAuth();
    const [forms, setForms] = useState<DashboardFormData[]>([]);
    const [quantity, setQuantity] = useState(10);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        const fetchForms = async () => {
            if(authToken && load){
                setLoading(true)
                try{
                    const resp = await getDashboardForms(authToken, String(quantity));
                    setForms(resp.data || []);
                } catch(e) {
                    console.log(e);
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchForms();
    }, [quantity])

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col gap-2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Id</th>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3">Topic</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3">Edit</th>
                        <th scope="col" className="px-6 py-3">Analytics</th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map((form) => {
                        return(<DashboardFormCard form={form}/>)
                    })}
                </tbody>
            </table>

            <div className="flex items-center justify-center text-sm gap-4">
                {
                    loading 
                    ? <div className="dark:text-dark-accent dark:bg-dark-blue rounded-full px-3 py-1 flex items-center gap-2">
                        Loading...
                    </div>
                    : <button 
                        onClick={() => {setQuantity(prev => prev + 5); setLoad(true)}} 
                        className="dark:text-dark-accent dark:bg-dark-blue rounded-full px-3 py-1"
                        >
                        Load more <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                }
                {
                    forms.length > 10
                    && <button 
                            onClick={() => {
                                setQuantity(10);
                                setForms(prev => [...prev.slice(0, 10)]);
                                setLoad(false);
                            }} 
                            className="dark:text-dark-accent dark:bg-dark-blue rounded-full px-3 py-1 flex items-center gap-2"
                        >
                        Show less <FontAwesomeIcon icon={faChevronUp} />
                    </button>
                }
            </div>
        </div>
    )
}

export default DashboardForms;