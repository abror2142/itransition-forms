import { Field } from "formik";

function FormIntegerFieldCard ({ field }) {
    return (
        <div className="flex flex-col gap-4 px-8 py-4 bg-white rounded-md">
            <p dangerouslySetInnerHTML={{__html: field?.title}}></p>
            {field.image && <img src={field.image} />}
            <Field 
                id={`text-field-${field.id}`} 
                name={`${field.id}`} 
                type="number"
                className="outline-none border-b border-gray-400 px-2 max-w-min"
                placeholder="Your answer"
            />
        </div>
    )
}

export default FormIntegerFieldCard;