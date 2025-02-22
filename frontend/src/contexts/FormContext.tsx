import { createContext } from "react";
import FormInfoClass from "../classes/FormInfo";
import { FormField } from "../types/FormField";
import Option from "../classes/Option";
import { SelectOption, SelectOptionCreatable, SelectOptionUser } from "../types/SelectOption";

export type FormContext = {
    id: string;
    formInfo: FormInfoClass;
    formFields: FormField[];
    resetForm: () => void;
    updateFormInfoTitle: (newValue: string) => void;
    updateFormInfoDescription: (newDescription: string) => void;
    updateFormInfoType: (newType: SelectOption | null) => void;
    updateFormInfoImage: (newImage: string) => void;
    updateFormInfoUsers: (newUsers: SelectOptionUser[]) => void;
    updateFormInfoTopic: (newTopic: SelectOption | null) => void;
    updateFormInfoTags: (newTags: SelectOptionCreatable[]) => void;  // Need to Review after seeing data
    addFormInfoTag: (newTag: SelectOptionCreatable) => void;
    addFormField: (newFormField: FormField, sequence: number) => void;
    removeFormField: (id: string) => void;
    changeSequence: (id: string, newSequence: number) => void;
    updateFormFieldTitle: (id: string, newTitle: string) => void;
    updateFormFieldDescription: (id: string, newDescription: string) => void;
    updateQuestionType: (id: string, newType: SelectOption | null) => void;
    updateFormFieldImage: (id: string, newImage: string) => void;
    addFormFieldOption: (id: string, newOption: Option) => void;
    removeFormFieldOption: (id: string, optionId: string) => void;
    changeFormFieldOption: (id: string, optionId: string, newValue: string) => void;
    submitting: boolean;
    updateSubmitting: (newValue: boolean) => void;
    initialize: (form) => void;
    initialized: boolean;
    findField: (index: number | string) => FormField | null;
    updateImageFieldCaption: (id: string, newContent: string) => void;
    updateDraggable: (avtiveIndex: number, overIndex: number) => void;
}

export const FormContext = createContext<FormContext | undefined>(undefined);