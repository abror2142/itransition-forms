import { v4 as uuid4 } from "uuid";

function MultipleChoiceAnalyticsCard({ formField, analytics }) {
  return (
    <div className="flex flex-col gap-4 px-8 py-4 bg-white rounded-md">
      <p dangerouslySetInnerHTML={{ __html: formField?.title }}></p>
      {formField.image && <img src={formField.image} />}
      <div
        role="group"
        aria-labelledby="my-radio-group"
        className="flex flex-col gap-2"
      >
        {formField?.options.map((option, index) => {
          return (
            <label key={uuid4()} className="z-10 relative border border-blue-600 rounded-md flex justify-between items-center">
              <div className="flex gap-1 items-center px-2">
                <input
                  type="radio"
                  name={`${formField.id}`}
                  value={`${option.id}`}
                  className="rounded-full h-4 w-4 cursor-pointer bg-red-100 border-red-300 text-red-600 focus:ring-red-200"
                  disabled
                />
                {option.content}
              </div>
              <div
                style={{
                  width: `${parseInt(analytics[formField.id][option.id])}%`,
                }}
                className={`absolute -z-1 bg-blue-100 py-0.5 h-full rounded-md`}
              ></div>
              <p className="pr-2">{analytics[formField.id][option.id] || 0}%</p>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default MultipleChoiceAnalyticsCard;
