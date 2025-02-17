import { useContext } from "react";
import { FormContext } from "../contexts/FormContext";

export default function useForm () {
     const context = useContext(FormContext);
    
    if(context === undefined) {
        throw new Error("useForm must be used inside FormProvider");
    }

    return context;
}