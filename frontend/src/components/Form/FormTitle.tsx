import TiptapTitle from "../tiptap/TiptapTitle";
import TiptapDescription from "../tiptap/TiptapDescription";
import { useState } from "react";
import FormSideBar from "./FormSideBar";
import OutsideAlerter from "../../hooks/useOutsideAlterter";
import FormInfo from "../../classes/FormInfo";

function FormTitle({ formInfo }: { formInfo: FormInfo }) {
  const [active, setActive] = useState(false);

  return (
    <OutsideAlerter setActive={setActive}>
      <div className="flex relative">
        <div
          className={`grow-1 border-l-6 ${
            active ? " border-l-blue-500 rounded-s-md" : "border-l-transparent "
          }  `}
          onClick={() => setActive(true)}
          onFocus={() => setActive(true)}
        >
          <div
            className={`border-t-10 border-t-blue-600  ${
              active ? "rounded-r-lg" : "rounded-t-lg"
            }`}
          >
            <div className="bg-white flex flex-col w-full items-center px-3 py-3 dark:bg-dark-card-light dark:border dark:border-dark-border">
              <TiptapTitle parentActive={active} title={formInfo.title} />
              <TiptapDescription parentActive={active} />
            </div>
          </div>
        </div>
        {active && <FormSideBar sequence={0} />}
      </div>
    </OutsideAlerter>
  );
}

export default FormTitle;
