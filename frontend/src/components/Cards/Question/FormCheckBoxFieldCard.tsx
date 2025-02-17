import { Field } from "formik";

function FormCheckBoxFieldCard ({ field }) {   
    return (
        <div className="flex flex-col gap-4 px-8 py-4 bg-white rounded-md">
            <p dangerouslySetInnerHTML={{__html: field?.title}}></p>
            {field.image && <img src={field.image} />}
            <div role="group" className="flex flex-col gap-2">
            {field?.options.map((option, index) => {
                return (                      
                    <label className="flex gap-2 items-center">
                        <Field 
                            type="checkbox" 
                            name={`${field.id}`} 
                            value={`${option.id}`}
                            className="rounded-full h-4 w-4 cursor-pointer bg-red-100 border-red-300 text-red-600 focus:ring-red-200"  
                        />
                        {option.content}
                    </label>                          
                )
            })}
            </div>
            
        </div>
    )
}

export default FormCheckBoxFieldCard;