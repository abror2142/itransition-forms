import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { verifyEmail } from "../utils/api";

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
        <div className="px-4 py-2 bg-white shadow-2xl rounded-md border border-gray-300">
            {submitting && <div>Verifying...</div>}
            {
                message 
                && !submitting 
                && <p>{message}</p>
            }
        </div>
    );
}

export default VerifyEmailPage;
