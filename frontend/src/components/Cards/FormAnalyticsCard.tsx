import FormImageFieldCard from "./Image/FormImageFieldCard";
import FormTextFieldCard from "./Text/FormTextFieldCard";
import MultipleChoiceAnalyticsCard from "./Analytics/MultipleChoiceAnalyticsCard";
import TextAnalyticsCard from "./Analytics/TextAnalyticsCard";
import CheckboxAnalyticsCard from "./Analytics/CheckboxAnalyticsCard";
import IntegerAnalyticsCard from "./Analytics/IntegerAnalyticsCard";
import ParagraphAnalyticsCard from "./Analytics/ParagraphAnalyticsCard";
import { AnalyticsChart } from "./Analytics/AnalyticsChart";
import { v4 as uuid4 } from "uuid";
import { UserFillingsChart } from "./Analytics/UserFillingsChart";
import { Link } from "react-router-dom";

function FormAnalyticsCard({ form }) {
  const analytics = form?.analytics;
  
  return (
    <div className="flex justify-start gap-4 bg-gray-100 dark:bg-dark-bg">
      <div className="flex flex-col items-start gap-5 justify-start  rounded-md px-6 py-4 max-w-min mb-5 ">
        <AnalyticsChart formId={form?.formInfo?.id} />
        <UserFillingsChart formId={form?.formInfo?.id} />
      </div>

      <div className="flex flex-col gap-4 w-xl my-5 ">
        <div className="flex flex-col gap-2 pb-4 rounded-md bg-white dark:bg-dark-blue dark:text-dark-text border-t-10 border-t-blue-600 rounded-t-lg">
          <div className="border-b border-gray-400 py-2 space-y-2 px-6">
            <p className="text-3xl" dangerouslySetInnerHTML={{ __html: form?.formInfo?.title }}></p>
            <p dangerouslySetInnerHTML={{ __html: form?.formInfo?.description }}></p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {form?.formFields.map((formField) => {
            if (formField?.type == "text")
              return <FormTextFieldCard key={uuid4()} field={formField}/>;
            else if (formField?.type == "image")
              return <FormImageFieldCard key={uuid4()} field={formField} />
            else if (formField?.type == "question") {
              if (formField?.questionType?.name == "Multiple Choice")
                return <MultipleChoiceAnalyticsCard key={uuid4()} formField={formField} analytics={analytics} />;
              else if (formField?.questionType?.name == "Checkbox")
                return <CheckboxAnalyticsCard key={uuid4()} formField={formField} analytics={analytics} />
              else if (formField?.questionType.name == "Paragraph")
                return <ParagraphAnalyticsCard key={uuid4()} formField={formField} analytics={analytics} />
              else if (formField?.questionType?.name == "Text")
                return <TextAnalyticsCard key={uuid4()} formField={formField} analytics={analytics} />;
              else if (formField?.questionType?.name == "Integer")
                return <IntegerAnalyticsCard key={uuid4()} formField={formField} analytics={analytics} />;
            }
          })}
        </div>
        <div className="self-end">
          <Link to={`/form/edit/${form?.formInfo?.id}`} className="px-4 py-1.5 bg-green-500 rounded-md text-white">Edit Form</Link>
        </div>
      </div>
    </div>
  );
}

export default FormAnalyticsCard;
