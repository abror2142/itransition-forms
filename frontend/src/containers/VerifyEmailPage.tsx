import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { verifyEmail } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function VerifyEmailPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const [submitting, setSubmitting] = useState(true);
    const [message, setMessage] = useState("Verifying...");

    useEffect(() => {
        const verify = async () => {
            if (!token) {
                setMessage("Invalid or missing token.");
                setSubmitting(false);
                return;
            }
            try {
                const data = JSON.stringify({"token": token});
                await verifyEmail(data);
                setMessage("Email verified successfully!");
            } catch (e) {
                console.log(e);
                setMessage("Network error. Please try again.");
            } finally {
                setSubmitting(false);
            }
        };
        verify();
    }, [token]);

    return (
        <div 
            className="px-8 py-6 bg-white shadow-2xl rounded-md border border-gray-300 dark:bg-dark-card-light
             dark:text-dark-text min-w-xl my-5"
        >
            {submitting && <div>Verifying...</div>}
            {
                message 
                && !submitting 
                && <div className="flex flex-col gap-4 items-center">
                    <p className="">
                        {message}
                    </p>
                    <Link to={"/login"} className="max-w-min px-4 py-1.5 rounded-sm bg-amber-500 text-white flex gap-2 items-center"><FontAwesomeIcon icon={faArrowLeft} /> Login</Link>
                </div>
            }
        </div>
    );
}

export default VerifyEmailPage;
