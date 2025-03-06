import { useState } from "react";
import TicketLight from "../assets/supportTicketLight.png";
import TicketForm from "./TikcetForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function Ticket() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="group fixed bottom-5 right-5 dark:bg-dark-blue flex gap-2 items-center px-6 py-1 rounded-full border dark:border-dark-blue-light dark:hover:bg-blue-950">
                <div className="flex gap-2 items-center" onClick={() => setOpen(prev => !prev)}>
                <img src={TicketLight} className="w-12"/>
                Support
                </div>
                <div className="group-hover:block hidden absolute -top-9 right-0 px-2 py-0.5 rounded-md text-nowrap dark:bg-blue-500">
                <p>Create Support Ticket</p>
                </div>
            </div>
            {
                open 
                && <div className="fixed inset-0 flex items-center justify-center z-50 ">
                    <div
                        className="absolute inset-0 bg-black opacity-50"
                        onClick={() => setOpen(false)}
                    ></div>
                    <div className="relative flex flex-col bg-white p-6 rounded shadow-lg z-10 dark:bg-dark-card-light dark:border dark:border-dark-border">
                        <button
                            onClick={() => setOpen(false)}
                            className="px-2 py-1 text-red-500 rounded max-w-min self-end hover:bg-red-700"
                        >
                            <FontAwesomeIcon icon={faX} />
                        </button>
                        <TicketForm />
                    </div>
                </div>
            }
        </div>
    ) 
}

export default Ticket;