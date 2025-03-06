import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getAllTickets } from "../utils/api";

function DashboardTickets() {
    const { authToken } = useAuth();
    const [tickets, setTickets] = useState();

    useEffect(() => {
        const fetchTickets = async () => {
            if(authToken){
                try {
                    const resp = await getAllTickets(authToken);
                    setTickets(resp.data?.issues);
                } catch(e) {
                    console.log(e);
                } finally {

                }    
            }
        }   
        fetchTickets();
    }, []) 
    
    console.log(tickets);

    return (
        <div>
            {tickets &&
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        Your Tickets
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Key
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Smmary
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Priority
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            
                            <th scope="col" className="px-6 py-3 text-center">
                                <span>Action</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => {
                            const id = ticket?.id;
                            const key = ticket?.key;
                            const priority = ticket?.fields?.priority?.name;
                            const summary = ticket?.fields?.summary;
                            const status = ticket?.fields?.status?.name;
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {key}
                                    </td>
                                    <td className="px-6 py-4">
                                        {summary}
                                    </td>
                                    <td className="px-3 py-3">
                                        <p 
                                            className={
                                                `px-3 py-1 rounded-sm 
                                                w-[80px] text-white
                                                text-center
                                                ${priority === 'Medium' 
                                                ? 'bg-dark-blue-light' 
                                                : priority === 'High' 
                                                ? 'bg-amber-500' 
                                                : 'bg-gray-300'}`
                                            }
                                        >
                                            {priority}
                                        </p>
                                    </td>
                                    <td className="px-3 py-3">
                                        <p
                                            className={
                                                `px-3 py-1 rounded-sm
                                                w-[80px] text-white
                                                text-center
                                                text-nowrap 
                                                ${status === 'To Do' 
                                                ? 'bg-gray-400' 
                                                : status === 'In Progress' 
                                                ? 'bg-blue-600' 
                                                : 'bg-green-500'}`
                                            }
                                        >
                                            {status}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <a href={"#"} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show in detail</a>
                                    </td>
                                </tr>
                           )
                        })}
                    </tbody>
                </table>
            </div>
            }
        </div>
    )
}

export default DashboardTickets;