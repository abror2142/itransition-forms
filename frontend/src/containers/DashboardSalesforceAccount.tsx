import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Formik, Form, Field } from "formik";
import { createSalesforceAccount, getSalesforceAccountMeta, updateSalesforceAccount } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface AccountInfo {
    attributes: {
        type: string,
        url: string
    },
    Id: string | null;
    Name: string | null;
    AccountNumber: string | null;
    AnnualRevenue: string | null;
    Phone: string | null;
    Fax: string | null;
    Website: string | null;
    Description: string | null;
}

function DashboardSalesforceAccount () {
    const { user, authToken } = useAuth();
    const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
    const [fetching, setFetching] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const fetchMeta = async () => {
            if(authToken){
                setFetching(true)
                try {
                    const resp = await getSalesforceAccountMeta(authToken);
                    const data = resp.data;
                    setAccountInfo(data);
                } catch(e) {
                    console.log(e);
                } finally {
                    setFetching(false);
                }
            }
        }
        fetchMeta();
    }, [])

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                accountId: accountInfo && accountInfo.Id ? accountInfo.Id : null,
                accountName: accountInfo && accountInfo.Name ? accountInfo.Name : user?.fullName,
                accountNumber: accountInfo && accountInfo.AccountNumber ? accountInfo.AccountNumber : null,
                annualRevenue: accountInfo && accountInfo.AnnualRevenue ? accountInfo.AnnualRevenue : null,
                accountPhone: accountInfo && accountInfo.Phone ? accountInfo.Phone : null,
                accountFax: accountInfo && accountInfo.Fax ? accountInfo.Fax : null,
                accountWebsite: accountInfo && accountInfo.Website ? accountInfo.Website : null,
                accountDescription: accountInfo && accountInfo.Description ? accountInfo.Description : null,
            }}
            onSubmit={(values) => console.log(values)}
        >
        {({values, validateForm}) => {
            const handleSave = async () => {
                const errors = await validateForm();
                if (Object.keys(errors).length === 0) {
                    if(authToken){
                        setSubmitting(true);
                        const json = JSON.stringify(values);
                        try {
                            await createSalesforceAccount(json, authToken)
                        } catch (e) {
                            console.log(e);
                        } finally {
                            setSubmitting(false);
                        }
                    }
                } else {
                    console.log("Validation errors:", errors);
                }
             };

            const handleUpdate = async () => {
                const errors = await validateForm();
                if (Object.keys(errors).length === 0) {
                    if(authToken){
                        setSubmitting(true);
                        const json = JSON.stringify(values);
                        try {
                            await updateSalesforceAccount(json, authToken)
                        } catch (e) {
                            console.log(e);
                        } finally {
                            setSubmitting(false);
                        }
                    }
                } else {
                    console.log("Validation errors:", errors);
                }
            };

            return (
                <Form>
                    <div className="relative max-w-xl bg-white rounded-md px-6 py-3 dark:border dark:border-dark-border dark:bg-dark-card-light dark:text-dark-text">                     
                        <div className="flex flex-col gap-2">
                            {   accountInfo 
                                && accountInfo.Id 
                                && <div className="self-end mr-0 flex gap-2 items-center dark:bg-dark-bg dark:border dark:border-dark-border px-2 py-1 max-w-min text-nowrap rounded-md">
                                    <p>Acc. Id:</p>
                                    <p>{accountInfo.Id}</p>
                                </div>
                            }

                            <div className="flex gap-3 flex-col">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="accountName" >Account Name *</label>
                                    <Field id="accountName" name="accountName" required className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="accountNumber" >Account Number</label>
                                    <Field id="accountNumber" name="accountNumber" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="accountPhone" >Account Phone</label>
                                        <Field id="accountPhone" name="accountPhone" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="accountFax" >Account Fax</label>
                                        <Field id="accountFax" name="accountFax" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="annualRevenue" >Annual Revenue</label>
                                    <Field id="annualRevenue" name="annualRevenue" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="accountWebsite" >Account Website</label>
                                    <Field id="accountWebsite" name="accountWebsite" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="accountDescription" >Description</label>
                                    <Field id="accountDescription" name="accountDescription" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                </div>
                            </div>
                            
                            <div className="dark:text-dark-text-highlighted flex justify-between mt-5">
                                {
                                    accountInfo 
                                    && accountInfo.Id
                                    && <button 
                                        type="button" 
                                        className="px-4 py-1.5 border dark:border-dark-blue-light rounded-md"
                                        onClick={handleUpdate}
                                    >Update</button>
                                }
                                {
                                    <button 
                                        type="button" 
                                        className="px-4 py-1.5 rounded-md bg-gray-200 dark:bg-dark-blue-light dark:hover:bg-dark-text"
                                        onClick={handleSave}
                                    >Save</button>
                                }
                            </div>
                        </div>

                        {
                            fetching 
                            && <div 
                                className="absolute inset-0 flex flex-col gap-1 dark:text-dark-text-highlighted items-center justify-center z-10 
                                    bg-opacity-30 dark:bg-opacity-30 backdrop-blur-[1px]"
                            >
                                <FontAwesomeIcon icon={faSearch} className="text-xl"/>
                                <p>Synchronizing data...</p>
                            </div>
                        }
                        {
                            submitting 
                            && <div 
                                className="absolute inset-0 flex flex-col gap-1 dark:text-dark-text-highlighted items-center justify-center z-10 
                                    bg-opacity-30 dark:bg-opacity-30 backdrop-blur-[1px]"
                            >
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                    </div>
                </Form>
            )
        }}
    </Formik>
    )
}

export default DashboardSalesforceAccount;