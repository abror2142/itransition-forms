import Text from "../../../classes/Text";

function FormTextFieldCard ({ field }: {field: Text}) {
    return (
        <div className="flex flex-col gap-3 px-8 py-4 rounded-md bg-white dark:bg-dark-card-light dark:border dark:border-dark-border">
            <p dangerouslySetInnerHTML={{__html: field?.title}}></p>
            {
                field?.description &&
                <p dangerouslySetInnerHTML={{__html: field?.description }}></p>
            }
        </div>
    )
}

export default FormTextFieldCard;