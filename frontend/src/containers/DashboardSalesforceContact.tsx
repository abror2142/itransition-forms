import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../hooks/useAuth";
import { getSalesforceContactMeta, createSalesforceContact, updateSalesforceContact } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface ContactInfo {
    attributes: {
        type: string,
        url: string
    },
    Id: string | null;
    FirstName: string | null;
    LastName: string | null;
    Email: string | null;
    MobilePhone: string | null;
    Phone: string | null;
    HomePhone: string | null;
    Birthdate: string | null;
    Description: string | null;
    Department: string | null;
}

function DashboardSalesforceContact () {
    const { authToken } = useAuth();
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
    const [fetching, setFetching] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const fetchMeta = async () => {
            if(authToken){
                setFetching(true)
                try {
                    const resp = await getSalesforceContactMeta(authToken);
                    const data = resp.data;
                    setContactInfo(data);
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
                contactId: contactInfo && contactInfo.Id ? contactInfo.Id : null,
                contactEmail: contactInfo && contactInfo.Email ? contactInfo.Email : null,
                contactPhone: contactInfo && contactInfo.Phone ? contactInfo.Phone : null,
                contactHomePhone:  contactInfo && contactInfo.HomePhone ? contactInfo.HomePhone : null,
                contactMobile:  contactInfo && contactInfo.MobilePhone ? contactInfo.MobilePhone : null,
                birthDate:  contactInfo && contactInfo.Birthdate ? contactInfo.Birthdate : null,
                department:  contactInfo && contactInfo.Department ? contactInfo.Department : null,
                contactFirstName:  contactInfo && contactInfo.FirstName ? contactInfo.FirstName : null,
                contactLastName:  contactInfo && contactInfo.LastName ? contactInfo.LastName : null,
                contactDescription:  contactInfo && contactInfo.Description ? contactInfo.Description: null,
            }}
            onSubmit={values => console.log(values)}
        >
        {({values, validateForm}) => {
            const handleSave = async () => {
                const errors = await validateForm();
                if (Object.keys(errors).length === 0) {
                    const json = JSON.stringify(values);
                    if(authToken){
                        setSubmitting(true)
                        try {
                            await createSalesforceContact(json, authToken)
                        } catch(e) {
                            console.log(e);
                        } finally {
                            setSubmitting(false)
                        }
                    }
                } else {
                    console.log("Validation errors:", errors);
                }
             };
        
                // Custom handler for the "Update" button.
            const handleUpdate = async () => {
                const errors = await validateForm();
                if (Object.keys(errors).length === 0) {
                    const json = JSON.stringify(values);
                    if(authToken){
                        setSubmitting(true);
                        try {
                            await updateSalesforceContact(json, authToken)
                        } catch(e) {
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
                    <p>{fetching ? "Fetching..." : "Finished"}</p>
                    <div className="relative max-w-xl bg-white rounded-md px-6 py-3 dark:border dark:border-dark-border dark:bg-dark-card-light dark:text-dark-text">
                        <div className="flex flex-col gap-2">          
                            {   
                                contactInfo 
                                && contactInfo.Id 
                                && <div className="self-end mr-0 flex gap-2 items-center dark:bg-dark-bg dark:border dark:border-dark-border px-2 py-1 max-w-min text-nowrap rounded-md">
                                    <p>Cont. Id:</p>
                                    <p>{contactInfo.Id}</p>
                                </div>
                            }
                            <div className="flex gap-3 flex-col">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="firstName">First Name</label>
                                    <Field id="firstName" name="contactFirstName" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="lastName" >Last Name *</label>
                                    <Field id="lastName" name="contactLastName" required className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="birthDate" >Birth Date</label>
                                        <Field id="birthDate" name="birthDate" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="department" >Department</label>
                                        <Field id="department" name="department" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="contactEmail">Email</label>
                                    <Field id="contactEmail" name="contactEmail" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="contactPhone" >Phone</label>
                                    <Field id="contactPhone" name="contactPhone" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="contactHomePhone" >Home Phone</label>
                                        <Field id="contactHomePhone" name="contactHomePhone" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="contactMobile" >Mobile Phone</label>
                                        <Field id="contactMobile" name="contactMobile" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="accountDescription" >Description</label>
                                    <Field id="accountDescription" name="accountDescription" className="px-3 py-1.5 outline-none rounded-md w-full dark:bg-dark-blue border dark:border-dark-border"/>
                                </div>
                            </div>
                                
                            <div className="dark:text-dark-text-highlighted flex justify-between mt-5">
                                {
                                    contactInfo
                                    && contactInfo.Id
                                    && <button 
                                        type="button" 
                                        className="px-4 py-1.5 border dark:border-dark-blue-light rounded-md"
                                        onClick={handleUpdate}
                                    >Update</button>
                                }
                                {
                                    !contactInfo
                                    && <button 
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

export default DashboardSalesforceContact;