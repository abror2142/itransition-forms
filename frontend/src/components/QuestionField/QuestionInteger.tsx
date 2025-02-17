function QuestionInteger () {
    return (
        <div className="flex items-start justify-start gap-4 text-nowrap text-gray-500">
            <p>Number input like:</p>
            <input
                type="number"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500 " 
                placeholder="7" 
                disabled
            />
        </div>
    )
}

export default QuestionInteger;