import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faLikeBold } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faLikeLight } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../hooks/useAuth";
import { getFormLikeCheck, getFormLikeCount, createFormLike } from "../utils/api";

function FormLike ({formId}: {formId: number}) {
    const [liked, setLiked] = useState<boolean | undefined>(undefined);
    const [likeCount, setLikeCount] = useState<number>(0);
    const { authToken } = useAuth();

    const fetchLikeCount = async () => {
        const resp = await getFormLikeCount(formId);
        setLikeCount(resp.data?.formLikes);
    }

    const fetchLikeCheck = async () => {
        if(authToken){
            const resp = await getFormLikeCheck(formId, authToken);
            setLiked(resp?.data?.liked);
        }
    }

    const handleLikeClick = async () => {
        setLiked(!liked)
        setLikeCount(prev => prev + (liked ? -1 : 1))
        if(authToken){
            try{
                await createFormLike(formId, authToken)
            } catch(e) {
                console.log(e);
            }
        }
    }

    useEffect(() => { 
        fetchLikeCount();
        if(authToken)
            fetchLikeCheck();
    }, [])

    return (    
        <div className="flex gap-2 items-center bg-white px-6 py-1 rounded-md  dark:bg-dark-card-light dark:border dark:border-dark-border">
            <div 
                onClick={handleLikeClick}
                className="group relative w-10 h-10 rounded-full hover:bg-gray-300 flex items-center justify-center dark:hover:bg-dark-blue"
            >
                <FontAwesomeIcon 
                    icon={liked ? faLikeBold : faLikeLight} 
                    className="text-lg"
                />
                { authToken && 
                    <p className="hidden group-hover:block absolute text-nowrap -bottom-4 left-6 text-sm bg-gray-800 text-white px-2 py-0.2 rounded-sm">
                        {liked ? "Remove like" : "Give a like"}
                    </p>
                }
            </div>
            <p className="w-8 h-10 flex items-center justify-center">
                {likeCount && likeCount}
            </p>
        </div>
    )
}

export default FormLike;