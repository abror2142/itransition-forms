import { Field } from "formik";

function FormMultipleChoiceFieldCard ({ field }) {
    return (
        <div className="flex flex-col gap-4 px-8 py-4 bg-white rounded-md">
            <p dangerouslySetInnerHTML={{__html: field?.title}}></p>
            {field.image && <img src={field.image} />}
            <div role="group" aria-labelledby="my-radio-group" className="flex flex-col gap-2">
                {field?.options.map((option, index) => {
                    return (
                        <label className="flex gap-2 items-center">
                            <Field 
                                type="radio" 
                                name={`${field.id}`} 
                                value={`${option.id}`} 
                                className="w-4 h-4"
                            />
                            {option?.content}
                        </label> 
                    )
                })}
            </div>
        </div>
    )
}

export default FormMultipleChoiceFieldCard;