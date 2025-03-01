import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { uploadImage, deleteImage } from "../utils/uploader";
import { getDashboardUserProfile, updateUserImage, updateUserInfo } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

interface UserData {
    id: number;
    email: string;
    fullName: string;
    image: string | null;
    status: string;
    roles: string[];
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

function UserProfileSettings () {
    const { authToken } = useAuth();
    const [userData, setUserData] = useState<UserData>();
    const [image, setImage] = useState<File|null>(null);
    const [fullName, setFullName] = useState(userData?.fullName);

    const fetchUser = async () => {
        if(authToken) {
            try {
                const resp = await getDashboardUserProfile(authToken)
                setUserData(JSON.parse(resp.data));
            } catch(e) {
                console.log(e);
            }
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])

    useEffect(() => {
        setFullName(userData?.fullName);
    }, [userData])

    const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0];
        if(file){
            setImage(file);
        }
    }

    const updateImage = async (imageUrl: string) => {
        if(authToken){
            try {
                const data = {
                    image: imageUrl
                }
                const json = JSON.stringify(data);
                await updateUserImage(authToken, json);
                fetchUser();
            } catch(e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        const handleImageUpload = async () => {
            if(image){
                if(userData?.image){
                    await deleteImage(userData.image);
                }
                try {
                    const imageUrl = await uploadImage(image)
                    if(imageUrl){
                        await updateImage(imageUrl);
                    }
                }catch(e){
                    console.log(e);
                }
            }
        }
        handleImageUpload();
    }, [image]);

    const updateInfo = async () => {
        if(authToken && fullName){
            try {
                const data = {fullName: fullName};
                const json = JSON.stringify(data);
                const resp = await updateUserInfo(authToken, json);
                console.log(resp.data);
                fetchUser();
            } catch(e) {
                console.log(e);
            }
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-2">
                    {
                        userData?.image 
                        && <img src={userData.image}  className="rounded-full w-32 h-32 object-cover object-center"/>
                    }
                    <label htmlFor="profile-image-uploader" className="flex flex-col gap-1 items-center bg-white dark:bg-dark-blue dark:hover:bg-blue-900 rounded-md max-w-min text-nowrap px-3 py-1 dark:border dark:border-dark-border">
                        <input type="file" onChange={handleImageFile} className="hidden" id="profile-image-uploader"/>
                        <FontAwesomeIcon icon={faUpload} />
                        Upload Image
                    </label>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-xl">{userData?.fullName}</p>
                    <p className="text-blue-500">{userData?.email} <span className="text-white dark:text-dark-text">| Joined at: {dayjs(userData?.createdAt).format('YYYY.MM.DD')}</span></p>
                    <div>
                        <p className="text-amber-300 font-medium">Last Update: {dayjs(userData?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-6 gap-5 max-w-2xl">
                <div className="w-full col-span-3">
                    <p>Email</p>
                    <input 
                        placeholder={userData?.email}
                        disabled
                        className="px-6 py-3 dark:bg-dark-blue rounded-md dark:border dark:border-dark-accent dark:text-dark-text w-full"
                    />
                </div>
                <div className="col-span-3">
                    <p>Status</p>
                    <input 
                        placeholder={userData?.status}
                        disabled
                        className="px-6 py-3 dark:bg-dark-blue rounded-md dark:border dark:border-dark-accent dark:text-dark-text w-full"
                    />
                </div>
                <div className="w-full col-span-6">
                    <p>Full Name</p>
                    <div className="flex gap-2">
                    <input 
                        value={fullName}
                        onChange={(e) => setFullName(e.target?.value)}
                        className="px-6 py-3 dark:bg-dark-blue rounded-md dark:border dark:border-dark-accent dark:text-dark-text-highlighted w-full"
                    />
                    {
                        fullName !== userData?.fullName
                        && <div className="flex">
                            <button 
                                className="bg-green-500 px-3 py-0.5 rounded-md"
                                onClick={() => updateInfo()}
                            >Update</button>
                        </div>
                    }
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <p>Role(s)</p>
                    <div className="flex items-center gap-4">
                        {userData?.roles.map(role => {
                            return (
                                <div className="px-3 py-1.5 rounded-md bg-amber-500 dark:text-dark-bg">
                                    {role.replace('ROLE_', '').toUpperCase()}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileSettings;