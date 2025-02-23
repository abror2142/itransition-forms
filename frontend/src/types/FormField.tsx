import Question from "../classes/Question";
import Text from "../classes/Text";
import Image from "../classes/Image";
import FormInfo from "../classes/FormInfo";

export type FormField = Question | Text | Image;

export type FormType = {
    formInfo: FormInfo,
    formFields: FormField[]
}