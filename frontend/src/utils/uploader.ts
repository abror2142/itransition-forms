import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 as uuid4 } from "uuid";

export const uploadImage = async (image: File) => {
    const imageRef = ref(storage, `images/${image.name + uuid4()}`);
    try{
        const snapshot = await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);
        return imageUrl;
    }catch(e) {
        console.log("Error while uploading image!");
        console.log(e);
        return null;
    }
}

export const deleteImage = async (imageUrl: string) => {
    const imageRef = ref(storage, imageUrl);
    try{
        await deleteObject(imageRef);
        return null;
    }catch(e) {
        console.log('Error while deleting image!');
        console.log(e);
        return imageUrl;
    }
}