import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import OutsideAlerter from "../../hooks/useOutsideAlterter";
import makeAnimated from "react-select/animated";
import useForm from "../../hooks/useForm";
import { FormMetaData } from "../../schemas/FormMetaDataZod";
import {
  SelectOption,
  SelectOptionUser,
  SelectOptionCreatable,
} from "../../types/SelectOption";
import { useTranslation } from "react-i18next";
import { v4 } from "uuid";

function FormSettings({ data }: { data: FormMetaData }) {
  const {
    formInfo,
    updateFormInfoType,
    updateFormInfoUsers,
    updateFormInfoTags,
    updateFormInfoTopic,
    addFormInfoTag
  } = useForm();
  const [open, setOpen] = useState(false);
  const animatedComponents = makeAnimated();
  const { t } = useTranslation();
  const types: SelectOption[] = data?.types || [];
  const topics: SelectOption[] = data?.topics || [];
  const tags: SelectOptionCreatable[] = data?.tags || [];
  const users: SelectOptionUser[] = data?.users || [];

  const defaultTopic = topics.find((topic) => topic.name === 'Other') || topics[0];
  const defaultType = types.find((type) => type.name === "Public") || types[0];
  const PROTECTED = types.find((type) => type.name === "Protected");

  useEffect(() => {
    updateFormInfoType(defaultType);
    updateFormInfoTopic(defaultTopic)
  }, []);

  const handleTopicChange = (selectedOption: SingleValue<SelectOption>) => {
    updateFormInfoTopic(selectedOption ? selectedOption : null);
  };

  return (
    <OutsideAlerter setActive={setOpen}>
      <div
        className={`flex flex-col  gap-2 rounded-md ${
          open && "bg-white px-4 py-3 dark:bg-dark-card-light dark:border dark:border-dark-border"
        }`}
      >
        <div
          className="text-2xl text-gray-600 flex items-center gap-2 bg-white hover:bg-gray-200 px-3 py-1 max-w-min 
                    dark:bg-dark-card-light dark:border dark:border-dark-border rounded-full dark:text-dark-text 
                    dark:hover:bg-dark-blue"
          onClick={() => setOpen((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faGear} />
          <span className="text-xl">{t('settings')}</span>
        </div>
        {open && (
          <div className="flex gap-2 flex-col">
            <div className="w-full flex gap-4">
              <Select<SelectOption>
                placeholder={t('selectTopic')}
                options={topics}
                value={formInfo.topic}
                onChange={handleTopicChange}
                classNames={{
                  control: () => "text-black",
                }}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => `${option.id}`}
              />
              <Select
                options={types}
                value={formInfo.type}
                onChange={(e) => {
                  updateFormInfoType(e);
                  updateFormInfoUsers([]);
                }}
                classNames={{
                  control: () => "min-w-max",
                }}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => `${option.id}`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <CreatableSelect<SelectOptionCreatable, true>
                isMulti
                value={formInfo.tags}
                options={tags}
                placeholder={t('selectTag')}
                onChange={(e) => {
                  updateFormInfoTags(Array.isArray(e) ? e : []);
                }}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => `${option.id}`}
                onCreateOption={(inputValue) => {
                  const element: SelectOptionCreatable = {
                    id: v4(),
                    name: inputValue,
                    __isNew__: true
                  };
                  addFormInfoTag(element);
                }}
                formatCreateLabel={(inputValue) => `${t('createTag')}: ${inputValue}`}
                isValidNewOption={(inputValue) =>
                  inputValue.trim().length > 0 &&
                  !tags.some((option) => option.name === inputValue)
                }
              />

              {PROTECTED && formInfo.type?.name === PROTECTED.name && (
                <Select<SelectOptionUser, true>
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder={t('selectMode')}
                  isMulti
                  options={users}
                  value={formInfo.users}
                  onChange={(e) =>
                    updateFormInfoUsers(Array.isArray(e) ? e : [])
                  }
                  getOptionLabel={(option) => option.email}
                  getOptionValue={(option) => `${option.id}`}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </OutsideAlerter>
  );
}

export default FormSettings;