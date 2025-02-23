import { Field } from "formik";

function FormShortTextFieldCard ({ field }) {
    return (
        <div className="flex flex-col gap-4 px-8 py-4 bg-white rounded-md  dark:bg-dark-card-light dark:border dark:border-dark-border">
            <p dangerouslySetInnerHTML={{__html: field?.title}}></p>
            {field.image && <img src={field.image} />}
            <Field 
                id={`text-field-${field.id}`} 
                name={`${field.id}`} 
                className="outline-none border-b border-gray-400 px-2 max-w-sm"
                placeholder="Your answer"
            />
        </div>
    )
}

export default FormShortTextFieldCard;