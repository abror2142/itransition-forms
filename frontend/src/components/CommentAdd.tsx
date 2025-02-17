import { Formik, Field, Form } from "formik";
import axios from "../utils/axios";
import { useAuth } from "../hooks/useAuth";

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
                    const url = `/api/comment`;
                    const data = JSON.stringify(values);
                    try{
                        const resp = await axios.post(url, data, {
                            headers: {
                                Authorization: `Bearer ${authToken}`
                            }
                        })
                        console.log("Comment is added sucessfully!");
                        console.log(resp.data);
                    } catch (e) {
                        console.log("Comment not added sucessfully!");
                        console.log(e);
                    }
                }}
                >
                <Form className="flex flex-col gap-2">
                    <Field 
                        id="comment" 
                        name="content" 
                        placeholder="Your comment ..." 
                        component="textarea" 
                        className="w-full bg-white px-4 py-2 rounded-md"
                    />
                    <button 
                        type="submit"
                        className="bg-blue-500 rounded-md px-3 py-1.5 text-white hover:bg-blue-600 mx-w-min self-end"
                    >Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CommentAdd;