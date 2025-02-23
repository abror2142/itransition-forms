import { useState, PropsWithChildren } from "react";
import { FormContext } from "../contexts/FormContext";
import { v4 as uuid } from "uuid";
import Question from "../classes/Question";
import FormInfo from "../classes/FormInfo";
import { FormField, FormType } from "../types/FormField";
import Option from "../classes/Option";
import {
  SelectOption,
  SelectOptionCreatable,
  SelectOptionUser,
} from "../types/SelectOption";
import Image from "../classes/Image";
import Text from "../classes/Text";
import { arrayMove } from "@dnd-kit/sortable";

type FormProviderProps = PropsWithChildren;

export default function FormProvider({ children }: FormProviderProps) {
  const [id, setId] = useState(uuid());
  const [formFields, setFormFields] = useState<FormField[]>([new Question()]);
  const [formInfo, setFormInfo] = useState<FormInfo>(new FormInfo());
  const [initialized, setInitialized] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const initialize = (data: FormType) => {
    const formFields = data?.formFields;
    const formInfo = data?.formInfo;

    const fields: FormField[] = formFields.map((field: FormField) => {
      if(field.type == 'question')
        return new Question(...Object.values(field));
      else if (field.type == 'image')
        return new Image(...Object.values(field));
      else(field.type == 'text')
        return new Text(...Object.values(field));
    })

    setFormFields(fields);
    setFormInfo(formInfo);
    setInitialized(true);
  }

  const findField = (index: number | string) => {
    const formField = formFields.find(formField => {
      return formField.id == index;
    })
    return formField || null;
  }
  
  const resetForm = () => {
    setFormFields([new Question()]);
    setFormInfo(new FormInfo());
    setId(uuid());
  };

  const updateSubmitting = (newValue: boolean) => {
    setSubmitting(newValue);
  };

  const updateSequence = () => {
    setFormFields((formFields) =>
      formFields.map((formField, index: number) => {
        return { ...formField, sequence: index + 1 };
      })
    );
  };

  const updateFormInfoTitle = (newTitle: string) => {
    setFormInfo((prev) => {
      return { ...prev, title: newTitle };
    });
  };

  const updateFormInfoDescription = (newDescription: string) => {
    setFormInfo((prev) => {
      return { ...prev, description: newDescription };
    });
  };

  const updateFormInfoImage = (newImage: string) => {
    setFormInfo((prev) => {
      return { ...prev, image: newImage };
    });
  };

  const updateFormInfoType = (newType: SelectOption | null) => {
    setFormInfo((prev) => {
      return { ...prev, type: newType };
    });
  };

  const updateFormInfoTags = (newTags: SelectOptionCreatable[]) => {
    setFormInfo((prev) => {
      return { ...prev, tags: newTags };
    });
  };

  const addFormInfoTag = (newTag: SelectOptionCreatable) => {
    setFormInfo((prev) => {
      return { ...prev, tags: [...prev.tags, newTag] };
    });
  };

  const updateFormInfoUsers = (newUsers: SelectOptionUser[]) => {
    setFormInfo((prev) => {
      return { ...prev, users: newUsers };
    });
  };

  const updateFormInfoTopic = (newTopic: SelectOption | null) => {
    setFormInfo((prev) => {
      return { ...prev, topic: newTopic };
    });
  };

const addFormField = (newFormField: FormField, sequence: number) => {
    setFormFields((prevFormFields) => {
      const newFields = [...prevFormFields];
      newFields.splice(sequence, 0, newFormField);
      return newFields;
    });
    updateSequence();
  }

  const removeFormField = (id: string) => {
    setFormFields((prevFormFields) =>
      prevFormFields.filter((formField) => formField.id !== id)
    );
    updateSequence();
  };

  const changeSequence = (id: string, newSequence: number) => {
    setFormFields((prevFormFields) =>
      prevFormFields.map((formField) => {
        if (formField.id === id) return { ...formField, sequence: newSequence };
        return formField;
      })
    );
  };

  const updateFormFieldTitle = (id: string, newTitle: string) => {
    setFormFields((prevFormFields) =>
      prevFormFields.map((formField) => {
        if (formField.id === id) return { ...formField, title: newTitle };
        return formField;
      })
    );
  };

  const updateQuestionType = (
    id: string,
    newQuestionType: SelectOption | null
  ) => {
    setFormFields((prevFormFields) =>
      prevFormFields.map((formField) => {
        if (formField.id === id && formField.type === "question")
          return { ...formField, questionType: newQuestionType };
        return formField;
      })
    );
  };

  const updateFormFieldImage = (id: string, newImage: string) => {
    setFormFields((prevFormFields) =>
      prevFormFields.map((formField) => {
        if (formField.id === id) return { ...formField, image: newImage };
        return formField;
      })
    );
  };

  const updateFormFieldDescription = (id: string, newDescription: string) => {
    setFormFields((prevFormFields) =>
      prevFormFields.map((formField) => {
        if (formField.id === id)
          return { ...formField, description: newDescription };
        return formField;
      })
    );
  };

  const updateImageFieldCaption = (id: string, newContent: string) => {
    setFormFields(prevFields => prevFields.map(formField => {
      if(formField.id === id)
        return {...formField, caption: newContent};
      return formField
    }))
  }

  const addFormFieldOption = (id: string, newOption: Option) => {
    setFormFields((prevformFields) =>
      prevformFields.map((formField) => {
        if (formField.id === id && formField.type === "question") {
          const questionField = formField as Question; // to ensure formField is always Question
          return {
            ...questionField,
            options: [...questionField.options, newOption],
          };
        }
        return formField;
      })
    );
  };

  const removeFormFieldOption = (id: string, optionId: string) => {
    setFormFields((prevFormFields) =>
      prevFormFields.map((formField) => {
        if (formField.id === id && formField.type === "question") {
          const questionField = formField as Question;
          const updatedOptions = questionField.options.filter(
            (option) => option.id !== optionId
          );
          return { ...questionField, options: updatedOptions };
        }
        return formField;
      })
    );
  };

  const changeFormFieldOption = (
    id: string,
    optionId: string,
    newValue: string
  ) => {
    setFormFields((prevFormFields) =>
      prevFormFields.map((formField) => {
        if (formField.id === id && formField.type == "question") {
          const questionField = formField as Question;
          const updatedOptions = questionField.options.map((option) => {
            if (option.id === optionId) {
              return { ...option, content: newValue };
            }
            return option;
          });
          return { ...questionField, options: updatedOptions };
        }
        return formField;
      })
    );
  };


  const updateDraggable = (activeIndex: number, overIndex: number) => {
    setFormFields(prev => {
      const updated = arrayMove(prev, activeIndex, overIndex).map((field, i) => ({...field, sequence: i+1}));
      return updated;
    })
  }

  return (
    <FormContext.Provider
      value={{
        id,
        formInfo,
        formFields,
        resetForm,
        updateFormInfoTitle,
        updateFormInfoDescription,
        updateFormInfoType,
        updateFormInfoImage,
        updateFormInfoUsers,
        updateFormInfoTopic,
        updateFormInfoTags,
        addFormInfoTag,
        addFormField,
        removeFormField,
        changeSequence,
        updateFormFieldTitle,
        updateFormFieldDescription,
        updateQuestionType,
        updateFormFieldImage,
        addFormFieldOption,
        removeFormFieldOption,
        changeFormFieldOption,
        submitting,
        updateSubmitting,
        initialize,
        initialized,
        findField,
        updateImageFieldCaption,
        updateDraggable,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}