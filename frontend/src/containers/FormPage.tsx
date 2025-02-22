import FormProvider from "../providers/FormProvider";
import Form from "../components/Form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FormMetaData, FormMetaDataSchema } from "../schemas/FormMetaDataZod";
import { useEffect } from "react";
import { getFormMetaInfo } from "../utils/api";
import { formatToObject } from "../utils/axios";

export async function loader(): Promise<FormMetaData | null> {
  try {
    const resp = await getFormMetaInfo();
    const data = formatToObject(resp.data);
    return FormMetaDataSchema.parse(data);
  } catch (error) {
    console.log(error);
    return null;
  }
}

function FormPage() {
  const data = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    () => {
      if (data === null) {
        return navigate("/");
      }
    };
  }, []);
  
  return (
    <FormProvider>
      <Form mode="create" data={data} />
    </FormProvider>
  );
}

export default FormPage;
