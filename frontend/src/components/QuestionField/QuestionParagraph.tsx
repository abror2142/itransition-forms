function QuestionParagraph() {;
    return (
        <>
            <textarea 
                defaultValue={"Long paragraph input will be here."}
                className="border border-gray-300 text-gray-500 px-3 py-2 rounded-md"
                disabled
            ></textarea>
        </>
    );
}

export default QuestionParagraph;
