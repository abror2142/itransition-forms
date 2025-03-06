import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getOdooToken, getOdooTokenRefresh } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faCopy, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function DashboardOdoo () {
    const [token, setToken] = useState();
    const { authToken } = useAuth();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchToken = async () => {
            if(authToken){
                try {
                    const resp = await getOdooToken(authToken);
                    setToken(resp.data);
                } catch(e) {
                    console.log(e);
                } finally {

                }
            }
        }
        fetchToken();
    }, [])

    const handleCopy = () => {
        navigator.clipboard.writeText(token?.token);
        setCopied(true);
    }

    const handleRefresh = async () => {
        console.log('REFRESH')
        if(authToken){
            try {
                const resp = await getOdooTokenRefresh(authToken);
                console.log(resp);
                setToken(resp.data);
            } catch(e) {
                console.log(e);
            } 
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setCopied(false);
        }, 1000)
        return () => clearTimeout(timer);
    }, [copied])

    return (
        <div className="px-6 py-3 rounded-md dark:bg-dark-card-light dark:border-dark-border flex items-center">
            <div className="flex flex-col gap-4 mx-auto">
            <p className="text-xl">Your Odoo Token</p>
            <div className="relative px-6 py-3 dark:bg-dark-blue dark:border dark:border-dark-blue-light rounded-md flex items-center max-w-2xl overflow-hidden">
                <p className="grow-1">
                    {token?.token}
                    {!token && <p>No token</p>}
                </p>
                <button onClick={handleCopy}>
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-xl ml-6"/>
                </button>
                    {   
                        copied 
                        && <p className="absolute right-12 z-10 px-2 py-0.5 bg-dark-bg-contrast rounded-md border dark:border-dark-blue-light" >Copied</p>
                    }
            </div>
            <div className="flex justify-between items-center max-w-2xl">
                <button 
                    className="flex gap-2 items-center dark:bg-dark-blue-light dark:text-dark-text-highlighted rounded-md text-nowrap max-w-min px-4 py-1.5"
                    onClick={handleRefresh}
                >
                    <FontAwesomeIcon icon={faShuffle} />
                    <p>
                        Refresh Token
                    </p>
                </button>
                <Link to={"http://localhost:8069/odoo/action-355"} className="text-blue-500 border-b border-b-blue-500">Go to Odoo <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            </div>
        </div>
    )
}

export default DashboardOdoo;