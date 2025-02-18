import { useEffect, useState } from "react";
import axios from "../utils/axios";
import CommentAdd from "./CommentAdd";
import { useAuth } from "../hooks/useAuth";
import { v4 as uuid4 } from "uuid";

function FormComments ({formId}: {formId: number}) {
    const [comments, setComments] = useState([]);
    const { authToken } = useAuth(); 

    useEffect(() => {
        let interval = setInterval( async () => {
            const url = `/api/form/${formId}/comment`;
            const resp = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setComments(JSON.parse(resp.data));
        },
        200000)
        return (() => {clearInterval(interval)});
    }, [])

    return (
        <div className="w-full flex flex-col gap-4">
            <CommentAdd formId={formId} />
            <div className="flex flex-col gap-4">
                {comments.map((comment) => {
                    return (
                        <div className="flex gap-2 flex-col px-6 py-3 bg-white rounded-md" key={uuid4()}>
                            <div className="flex gap-2 items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                                <div>{comment?.owner?.email}</div>
                            </div>
                            {comment?.content}
                            <div className="self-end text-sm">{comment?.createdAt}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FormComments;