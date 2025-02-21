import { toBlob } from "html-to-image";
import { v4 as uuid4 } from "uuid";

export async function takeScreenshot (ref) {
    if (ref.current === null)
        return;

    try {
    const blob = await toBlob(ref.current, {
        cacheBust: true,
        backgroundColor: "#eef2ff"
    });
    if (!blob) throw new Error("Can't take screenshot!");

    const file = new File([blob], `screenshot${uuid4()}.png`, {
        type: "image/png",
    });
    return file;
    } catch (e) {
    console.log(e);
    }
}