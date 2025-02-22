import axios from "axios";
import { settings } from "./api";

export default axios.create({
    withCredentials: settings.withCredentials,
})

export const formatToObject = (data: JSON | string) => {
    return typeof data === "string" ? JSON.parse(data) : data;
}