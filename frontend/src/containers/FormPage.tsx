import FormProvider from "../providers/FormProvider";
import Form from "../components/Form";
import axios from "../utils/axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FormMetaData, FormMetaDataSchema } from "../schemas/FormMetaDataZod";
import { useEffect } from "react";

export async function loader(): Promise<FormMetaData | null> {
  try {
    const resp = await axios.get<FormMetaData>("/form-meta");
    const data =
      typeof resp.data === "string" ? JSON.parse(resp.data) : resp.data;
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
