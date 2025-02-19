import AsyncSelect from "react-select/async";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { components, SingleValue } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { stripHtml } from "string-strip-html";

type OptionType = SingleValue<{
    label: string,
    value: number
}>

function SearchBar() {
    const navigate = useNavigate();
  const fetchOptions = async (inputValue: string): Promise<OptionType[]> => {
    try {
      const response = await axios.get(`/search?q=${inputValue}`);
      const data = JSON.parse(response.data);

      const options = data.map((item: {id: number, title: string}) => {
        return {
          label: stripHtml(item?.title).result,
          value: item?.id,
        };
      });
      return options;
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  };

  const handleChange = ( e: OptionType ) => {
    const formId = e?.value;
    if(formId)
      return navigate(`/form/${formId}`);
  }

  return (
    <AsyncSelect
      isClearable 
      loadOptions={fetchOptions}
      placeholder="Search..."
      noOptionsMessage={({ inputValue }) =>
        inputValue ? "No results found" : "Start typing to search"
      }
      loadingMessage={() => "Searching..."}
      onChange={(e) => handleChange(e)}
      className="w-full outline-none"
      components={{
        DropdownIndicator: ({ ...props }) => (
          <components.ClearIndicator
            {...props}
          >
            {props.children}
           <FontAwesomeIcon icon={faSearch} />
          </components.ClearIndicator>
        ),
      }}
    />
  );
}

export default SearchBar;
