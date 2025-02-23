import { useEffect, useState } from "react";
import { getUsers } from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import { v4 as uuid4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleDown, faCircleUp, faLock, faTrash, faUnlock, faX } from "@fortawesome/free-solid-svg-icons";
import { actOnUsers } from "../utils/api";
import { UserFull } from "../types/User";

interface UserTableData {
    member: UserFull[];
    view: {
        first: string;
        last: string;
        next?: string;
        previous?: string;
    }
}


function UsersTable () {
    const [data, setData] = useState<UserTableData| null>(null);
    const { authToken } = useAuth()
    const [page, setPage] = useState("/api/users?page=1");
    const [selected, setSelected] = useState<number[]>([]);
    const [submitting, setSubmitting] = useState(false);

    const toggleSelection = (id: number) => {
        if(selected.includes(id))
            setSelected(prev => prev.filter(itemId => itemId != id))
        else
            setSelected(prev => ([...prev, id]));
    }

    const selectAll = () => {
        if(data?.member.length == selected.length)
            setSelected([])
        else
            setSelected(data?.member ? data?.member?.map(user => user?.id): []);
    }

    const fetchUsers = async () => {
        if(authToken){
            try {
                const resp = await getUsers(page, authToken);
                setData(resp.data);
            } catch(e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [page])

    if(!data)
        return (<div>Loading Users ....</div>)

    function nextPage() {
        const newPage = page.replace(/(\d+)(?!.*\d)/, (match) => {
            const incremented = parseInt(match, 10) + 1;
            return incremented.toString();
        })
        if(newPage)
            setPage(newPage);
    }

    const handleClick = async (action: string) => {
        if(!selected || !authToken) return;
        setSubmitting(true);
        const data = {
            action: action,
            users: selected
        }
        const json = JSON.stringify(data);
        try {
            const resp = await actOnUsers(json, authToken)
            setSelected([]);
            fetchUsers();
            console.log(resp);
        } catch (e) {
            console.log(e);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 ml-5">
            <div className="flex justify-between items-center">
                <div className="flex items-center px-4 py-2 gap-4">
                    <button
                        disabled={submitting} 
                        onClick={() => handleClick('block')} 
                        className="flex items-center px-3 justify-center rounded-md gap-2 bg-gray-200 hover:bg-gray-300 border-gray-200 h-[40px]"
                    >
                        Block
                        <FontAwesomeIcon icon={faLock} />
                    </button>
                    <button
                        disabled={submitting} 
                        onClick={() =>  handleClick('unblock')} 
                        className="flex items-center justify-center px-3 rounded-md gap-2 h-[40px] hover:bg-gray-100 border border-gray-300"
                    >
                        <FontAwesomeIcon icon={faUnlock} />
                    </button>
                    <button
                        disabled={submitting} 
                        onClick={() =>  handleClick('delete')} 
                        className="flex items-center justify-center px-3 rounded-md gap-2 h-[40px] bg-red-500 text-white hover:bg-red-600"
                    >
                        Delete
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        disabled={submitting} 
                        onClick={() =>  handleClick('admin-up')} 
                        className="flex items-center justify-center px-3 rounded-md gap-2 h-[40px] bg-gray-200"
                    >
                        Add Admin Role
                        <FontAwesomeIcon icon={faCircleUp} />
                    </button>
                    <button
                        disabled={submitting} 
                        onClick={() =>  handleClick('admin-down')} 
                        className="flex items-center justify-center px-3 rounded-md gap-2 h-[40px] bg-red-500 text-white hover:bg-red-600"
                    >
                        Remove Admin Role
                        <FontAwesomeIcon icon={faCircleDown} />
                    </button>
                
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input 
                                    onClick={() => selectAll()}
                                    defaultChecked={data?.member?.length == selected.length}
                                    id="checkbox-all" 
                                    type="checkbox" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Full Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Verified
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Roles
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        data?.member && 
                        data?.member?.map(user => {
                        return (
                            <tr key={uuid4()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input 
                                        id="checkbox-table-1" 
                                        onChange={() => toggleSelection(user?.id)}
                                        type="checkbox"
                                        defaultChecked={selected.includes(user?.id)} 
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user?.email}
                            </th>
                            <td className="px-6 py-4">
                                {user?.fullName}
                            </td>
                            <td className="px-6 py-4">
                                <FontAwesomeIcon icon={user?.isVerified ? faCheck : faX} />
                            </td>
                            <td className="px-6 py-4">
                                {user?.status.toLowerCase()}
                            </td>
                            <td className="px-6 py-4 flex items-center gap-2">                        
                                    {user?.roles?.includes('ROLE_ADMIN') 
                                    && <p className="px-2 py-0.5 bg-amber-200 rounded-sm">Admin</p>}
                                    {user?.roles?.includes('ROLE_USER') 
                                    &&  <p className="px-2 py-0.5 bg-gray-100 rounded-sm"> User</p>}
                            </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="flex w-full px-6 py-2">
                {   
                    page != data?.view?.first 
                    && <button 
                            onClick={() => setPage(data?.view?.previous ? data?.view?.previous : page)} 
                            className="mr-auto px-4 py-1.5 bg-gray-200 rounded-md"
                        >
                            Previous
                        </button>
                }
                {
                    page != data?.view?.last 
                    && <button 
                            onClick={() => nextPage()} 
                            className="ml-auto px-4 py-1.5 bg-gray-200 rounded-md"
                        >
                            Next
                        </button>
                }
            </div>
        </div>
    )
}

export default UsersTable;