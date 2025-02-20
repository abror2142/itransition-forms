import FormImageFieldCard from "./Image/FormImageFieldCard";
import FormTextFieldCard from "./Text/FormTextFieldCard";
import FormMultipleChoiceFieldCard from "./Question/FormMultipleChoiceFieldCard";
import FormCheckBoxFieldCard from "./Question/FormCheckBoxFieldCard";
import FormShortTextFieldCard from "./Question/FormShortTextFieldCard";
import FormParagraphFieldCard from "./Question/FormParagraphFieldCard";
import FormIntegerFieldCard from "./Question/FormIntegerFieldCard";
import { Formik, Form } from "formik";
import axios from "../../utils/axios";
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faFilePdf,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

function FormCard({ form }) {
  const { authToken, user } = useAuth();

    const submitAnswer = async (values) => {
        const url = `/api/form/answer/${form.formInfo.id}`;
        const data = {
          formId: form.formInfo.id,
          answers: values,
        };
        const json = JSON.stringify(data);
        try {
          const resp = await axios.post(url, json, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          });
          console.log(resp.data);
        } catch (e) {
          if (e.response) console.log("Backend Error:", e.response.data);
          else console.log(e);
        }
    }

  const handleClick = async (values) => {
    // send Delete to backend;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="px-8 py-6 rounded-md bg-white flex flex-col gap-5 border border-gray-300">
            <p className="text-xl font-semibold text-center">Ready to Submit?</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="mr-4 w-4 h-4"/>
                <FontAwesomeIcon icon={faFilePdf} />
                Download as PDF
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="mr-4 w-4 h-4"/>
                <FontAwesomeIcon icon={faEnvelope} />
                <p>Email my Answer</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                    onClose();
                }}
                className="bg-blue-500 px-3 py-1.5 rounded-md hover:bg-blue-600 text-white"
              >Return</button>
              <button
                onClick={() => {
                    submitAnswer(values);
                  onClose();
                }}
                className="bg-green-500 px-3 py-1.5 rounded-md hover:bg-green-600 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2 pb-4 rounded-md bg-white border-t-10 border-t-blue-600 rounded-t-lg">
        <div className="border-b border-gray-400 py-2 space-y-2 px-6">
          <p
            className="text-3xl"
            dangerouslySetInnerHTML={{ __html: form?.formInfo?.title }}
          ></p>
          <p
            className=""
            dangerouslySetInnerHTML={{ __html: form?.formInfo?.description }}
          ></p>
        </div>
        <div className="flex gap-2 px-6">
          <p className="font-semibold text-[15px] border-r px-2 border-gray-400">
            {user?.email}
          </p>

          <Link
            to={"#"}
            className="text-blue-500 text-sm flex gap-2 items-center"
            title="sign in with another account"
          >
            change account
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Link>
        </div>
      </div>
      <Formik
        initialValues={{}}
        onSubmit={async (values) => {
          await handleClick(values);
        }}
      >
        {() => (
          <Form className="flex flex-col gap-4 ">
            {form?.formFields.map((formField, index: number) => {
              if (formField?.type == "text")
                return (
                  <FormTextFieldCard
                    field={formField}
                    key={"form-key-" + index}
                  />
                );
              if (formField?.type == "image")
                return (
                  <FormImageFieldCard
                    field={formField}
                    key={"form-key-" + index}
                  />
                );
              if (formField?.type == "question") {
                if (formField?.questionType?.name == "Multiple Choice")
                  return (
                    <FormMultipleChoiceFieldCard
                      field={formField}
                      key={"form-key-" + index}
                    />
                  );
                if (formField?.questionType?.name == "Checkbox")
                  return (
                    <FormCheckBoxFieldCard
                      field={formField}
                      key={"form-key-" + index}
                    />
                  );
                if (formField?.questionType.name == "Paragraph")
                  return (
                    <FormParagraphFieldCard
                      field={formField}
                      key={"form-key-" + index}
                    />
                  );
                if (formField?.questionType?.name == "Text")
                  return (
                    <FormShortTextFieldCard
                      field={formField}
                      key={"form-key-" + index}
                    />
                  );
                if (formField?.questionType?.name == "Integer")
                  return (
                    <FormIntegerFieldCard
                      field={formField}
                      key={"form-key-" + index}
                    />
                  );
              }
            })}
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="border border-gray-400 rounded-md px-3 py-1.5"
              >
                Clear
              </button>
              <button 
                className="bg-green-500 text-white rounded-md px-3 py-1.5"
                type="submit"
                >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormCard;
