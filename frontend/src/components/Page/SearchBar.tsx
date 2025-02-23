
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { search } from "../../utils/api";

type Result = {
  id: number;
  title: string;
};

function SearchBar() {
  const [results, setResults] = useState<Result[]>([]);
  const [term, setTerm] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  const fetchOptions = async () => {
    if(term){
      setSearching(true);
      try {
        const response = await search(term);
        console.log(response.data);
        const data = JSON.parse(response.data);
        setResults(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setSearching(false);
      }
    }
  };

  useEffect(() => {
    fetchOptions();
  }, [term])

  return (
    <div className="grow-1 flex realtive flex-col">
      <div className="flex items-center w-full dark:bg-dark-card-accent px-2 py-1.5 rounded-full border border-gray-300 dark:border-dark-border">
        <div className="grow-1 ">
          <input 
            className="w-full outline-none px-2"
            onChange={(e) => setTerm(e.target.value)}
          /> 
        </div>
        <div className="dark:text-dark-accent px-2">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      {term && <div className="absolute dark:bg-dark-card-accent border dark:border-bg-dark-border">
        <ul>
          {results && results.map(result => {
            return (
              <li>
                <Link to={`/form/${result?.id}`}>
                  {result?.title}
                </Link>
              </li>
            )
          })}
          {
            searching &&
            <li>
              Searching for you ...
            </li>
          }
          {
            !results && !searching && 
            <li>No results are found!</li>
          }
        </ul>
      </div>}
    </div>
  );
}

export default SearchBar;
