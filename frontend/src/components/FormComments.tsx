import { useEffect, useState } from "react";
import CommentAdd from "./CommentAdd";
import { v4 as uuid4 } from "uuid";
import { getFormCommentsList } from "../utils/api";
import dayjs from "dayjs";

function FormComments ({formId}: {formId: number}) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let interval = setInterval( async () => {;
            try{
                const resp = await getFormCommentsList(formId);
                setComments(JSON.parse(resp.data));
            } catch(e) {
                console.log(e);
            }
        },
        2000)
        return (() => {clearInterval(interval)});
    }, [])

    return (
        <div className="w-full flex flex-col gap-4 ">
            <CommentAdd formId={formId} />
            {comments ?
            <div className="flex flex-col gap-4">
                {comments.map((comment) => {
                    return (
                        <div className="flex gap-2 flex-col px-6 py-3 bg-white rounded-md dark:bg-dark-card-light dark:border dark:border-dark-border" key={uuid4()}>
                            <div className="flex gap-2 items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-300 "></div>
                                <div>{comment?.owner?.fullName}</div>
                            </div>
                            {comment?.content}
                            <div className="self-end text-sm">{dayjs(comment?.createdAt).format('YYYY.MM.DD')}</div>
                        </div>
                    )
                })}
            </div>
            : <div>
                No Comments yet!
            </div>
            }
        </div>
    )
}

export default FormComments;