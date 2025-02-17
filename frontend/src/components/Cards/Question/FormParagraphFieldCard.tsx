import { Field } from "formik";

function FormParagraphFieldCard ({ field }) {
    return (
        <div className="flex flex-col gap-2 px-8 py-4 bg-white rounded-md">
            <p dangerouslySetInnerHTML={{__html: field?.title}}></p>
            {field.image && <img src={field.image} />}
            <Field 
                name={`${field.id}`} 
                type="textarea" 
                component="textarea"
                className="outline-none border-b border-gray-300 px-2"
                placeholder="Your Answer"
            />
        </div>
    )
}

export default FormParagraphFieldCard;