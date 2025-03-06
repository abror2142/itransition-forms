import { useState } from "react";
import DashboardSalesforceAccount from "./DashboardSalesforceAccount";
import DashboardSalesforceContact from "./DashboardSalesforceContact";
// import DashboardSalesforceContact from "./DashboardSalesforceContact";

function DashboardSalesforce () {
    const [contactActive, setContactActive] = useState(false);

    return (
        <div>
            <div className="px-6 py-3">
                <button
                    type="button"
                    onClick={() => setContactActive(prev => !prev)}
                    className={`px-4 py-1.5 bg-gray-200 dark:bg-dark-blue rounded-md ${!contactActive && "bg-gray-300 dark:bg-dark-blue-light dark:text-dark-text-highlighted"}`}
                >Account</button>
                <button 
                    type="button"
                    onClick={() => setContactActive(prev => !prev)}
                    className={`px-4 py-1.5 bg-gray-200 dark:bg-dark-blue rounded-md ${contactActive && "bg-gray-300 dark:bg-dark-blue-light dark:text-dark-text-highlighted"}`}
                >Contact</button>
            </div>
            {
                contactActive 
                ? <DashboardSalesforceContact />
                : <DashboardSalesforceAccount />
            }
        </div>
    )
}

export default DashboardSalesforce;