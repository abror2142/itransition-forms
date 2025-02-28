import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import DashboardAnswerCard from "./DashboardAnswerCard";
import { getDashboardAnswers } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export interface DashboardAnswerData {
    id: number;
    created_at: string;
    form_id: number;
    form_title: string;
    email: string;
    full_name: string;
}

const DashboardAnswers = () => {
    const [answers, setAnswers] = useState<DashboardAnswerData[]>([]);
    const [loading, setLoading]  = useState(false);
    const [quantity, setQuantity]  = useState(10);
    const [load, setLoad]  = useState(true);
    const { authToken } = useAuth();
    
    useEffect(() => {
        const fetchAnswers = async () => {
            if(authToken && load){
                setLoading(true);
                try{
                    const resp = await getDashboardAnswers(authToken, String(quantity));
                    setAnswers(resp.data);
                } catch(e) {
                    console.log(e);
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchAnswers();
    }, [quantity])

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col gap-2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Id</th>
                        <th scope="col" className="px-6 py-3">Full Name</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Form Info</th>
                    </tr>
                </thead>
                <tbody>
                    {answers.map((answer) => {
                        return(<DashboardAnswerCard answer={answer}/>)
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
                        onClick={() => {
                            setQuantity(prev => prev + 5); 
                            setLoad(true)}
                        } 
                        className="dark:text-dark-accent dark:bg-dark-blue rounded-full px-3 py-1"
                        >
                        Load more <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                }
                {
                    answers.length > 10
                    && <button 
                            onClick={() => {
                                setQuantity(10);
                                setAnswers(prev => [...prev.slice(0, 10)]);
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

export default DashboardAnswers;