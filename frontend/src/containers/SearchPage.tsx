import { useState, useEffect } from "react";
import { getSearchMeta } from "../utils/api";
import { Link } from "react-router-dom";

interface Tag {
    id: number;
    name: string;
}

interface Topic {
    id: number;
    name: string;
}

function SearchPage () {
    const [tags, setTags] = useState<Tag[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);

    

    useEffect(() => {
        const fetchSearchMeta = async () => {
            try {
                const resp = await getSearchMeta();
                const data = resp.data;
                setTags(JSON.parse(data?.tags))
                setTopics(JSON.parse(data?.topics))
            } catch(e) {
                console.log(e);
            }
        }
        fetchSearchMeta();
    }, [])

    return (
        <div className="w-screen flex min-h-screen">
            <div className="w-[350px] h-screen flex flex-col bg-white gap-4 dark:bg-dark-blue">
                <div className="flex gap-2 flex-col">
                    <p className="text-lg font-medium text-center">Tags</p>
                    <div className="flex flex-wrap gap-2"> 
                        {
                            tags
                            && tags.map(tag => {
                                return (
                                    <Link to={`/search?topic=${tag.name}`} className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 rounded-sm dark:bg-dark-blue-light dark:hover:bg-blue-900">
                                        {tag.name}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-lg font-medium text-center">Topics</p>
                    <div className="flex flex-wrap gap-2"> 
                        {
                            topics
                            && topics.map(topic => {
                                return (
                                    <Link to={`/search?topic=${topic.name}`} className="px-2 py-0.5 rounded-sm bg-indigo-50 hover:bg-indigo-100 dark:bg-dark-blue-light dark:hover:bg-blue-900">
                                        {topic.name}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="bg-white dark:bg-dark-blue w-full h-12">

                </div>
            </div>
        </div>
    )
}

export default SearchPage;