import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const uploadPicture = async(file: File, userId: string) => {
    try {
        const storageRef = ref(storage, userId);
        if(file){
            await uploadBytesResumable(storageRef, file);
            const url = await getDownloadURL(storageRef)
            return url
        }
        return ""
    } catch (error) {
        return ""
    }
}