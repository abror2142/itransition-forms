import { Formik, Field, Form } from "formik";
import { useAuth } from "../hooks/useAuth";
import { createFormComment } from "../utils/api";

function CommentAdd ({ formId }: {formId: number}) {
    const { authToken } = useAuth();
    return (
        <div>
            <Formik
                initialValues={{
                    formId: formId,
                    content: '',
                    parentId: null
                }}
                onSubmit={async (values) => {
                    if(authToken){
                        const data = JSON.stringify(values);
                        try{
                            const resp = await createFormComment(formId, authToken, data)
                            console.log("Comment is added sucessfully!");
                            console.log(resp.data);
                        } catch (e) {
                            console.log("Comment not added sucessfully!");
                            console.log(e);
                        }
                    }
                }}
                >
                <Form className="flex flex-col gap-2 ">
                    <Field 
                        id="comment" 
                        name="content" 
                        placeholder="Your comment ..." 
                        component="textarea" 
                        className="w-full bg-white px-4 py-2 rounded-md  dark:bg-dark-card-light dark:border dark:border-dark-border"
                    />
                    <button 
                        type="submit"
                        className="bg-blue-500 rounded-md px-3 py-1.5 text-white hover:bg-blue-600 mx-w-min self-end"
                    >Add comment</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CommentAdd;