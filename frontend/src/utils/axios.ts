import axios from "axios";

export default axios.create({
    withCredentials: true,
})

export const formatToObject = (data: JSON | string) => {
    return typeof data === "string" ? JSON.parse(data) : data;
}