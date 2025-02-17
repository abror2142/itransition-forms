import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function VerifyEmailPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token"); // Extract token from URL query parameters

    console.log("Verification Token:", token);

    const [isSubmitting, setIsSubmitting] = useState(true);
    const [message, setMessage] = useState("Verifying...");

    useEffect(() => {
        const verify = async () => {
            if (!token) {
                setMessage("Invalid or missing token.");
                setIsSubmitting(false);
                return;
            }

            try {
                const url = `http://localhost:8000/verify/email?token=${token}`;
                const response = await fetch(url);

                if (response.ok) {
                    setMessage("Email verified successfully!");
                } else {
                    const data = await response.json();
                    setMessage(data.error || "Verification failed.");
                }
            } catch (error) {
                setMessage("Network error. Please try again.");
                console.error("Verification failed:", error);
            } finally {
                setIsSubmitting(false);
            }
        };

        verify();
    }, [token]); // Add token as a dependency

    return (
        <div>
            <p>{message}</p>
        </div>
    );
}

export default VerifyEmailPage;
