function TextAnalyticsCard({ formField, analytics }) {
  return (
    <div className="flex flex-col gap-4 px-8 py-4 bg-white rounded-md dark:bg-dark-blue dark:text-dark-text-highlighted">
      <p dangerouslySetInnerHTML={{ __html: formField?.title }}></p>
      {formField.image && <img src={formField.image} />}
      <input
        id={`text-field-${formField.id}`}
        name={`${formField.id}`}
        className="outline-none border-b border-gray-400 px-2 max-w-sm"
        placeholder="Your answer"
        disabled
      />
      <div className="px-2 py-0.5 bg-blue-100 flex items-center gap-2 max-w-min rounded-md text-nowrap dark:bg-dark-blue-light">
        Common Word:
        {analytics[formField.id] ? (
          <p className="font-semibold">{analytics[formField.id]}</p>
        ) : (
          <p>No Information</p>
        )}
      </div>
    </div>
  );
}

export default TextAnalyticsCard;
