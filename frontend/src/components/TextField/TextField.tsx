import { useState } from "react";
import TiptapQuestionTitle from "../tiptap/TiptapQuestionTitle";
import OutsideAlerter from "../../hooks/useOutsideAlterter";
import FormSideBar from "../Form/FormSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faGrip, faTrash } from "@fortawesome/free-solid-svg-icons";
import useForm from "../../hooks/useForm";
import TiptapTextarea from "../tiptap/TiptapTextarea";
import Text from "../../classes/Text";
import { useSortable } from "@dnd-kit/sortable";

function TextField({ formField }: { formField: Text }) {
  const [active, setActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { removeFormField } = useForm();
  const {attributes, listeners, setActivatorNodeRef } = useSortable({id: formField.sequence});

  return (
    <OutsideAlerter setActive={setActive}>
      <div className="flex gap-2 relative">
        <div
          className={` border-l-6 border-blue-500 ${
            active ? "rounded-s-md" : "border-transparent"
          } grow-1`}
          onClick={() => setActive(true)}
        >
          <div
            className={`bg-white px-3 py-3 flex flex-col gap-4 ${
              active ? "rounded-rt-lg" : "rounded-t-lg"
            }`}
          >
            <button 
                ref={setActivatorNodeRef}
                className="bg-white w-full"
                // style={draggableStyle}
                {...attributes}
                {...listeners}
            >
              <FontAwesomeIcon icon={faGrip} />
            </button>

            <TiptapQuestionTitle
              id={formField.id}
              title={formField.title}
            />
            <TiptapTextarea
              id={formField.id}
              placeholder={formField.description}
            />
          </div>

          <div className="bg-white flex justify-between items-center px-4 py-2 border-t border-gray-300">
            <button
              onClick={() => removeFormField(formField.id)}
              className="text-gray-500"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <div className="flex gap-4 items-center">
              <div className="relative">
                <OutsideAlerter setActive={setShowOptions}>
                  <div
                    className="w-[30px] h-[30px] flex items-center justify-center hover:bg-gray-200 rounded-full"
                    onClick={() => setShowOptions(!showOptions)}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </div>
                  {showOptions && (
                    <div className="absolute bg-white rounded-md  text-nowrap py-4 flex px-1 flex-col gap-1 right-0 ">
                      <button className="hover:bg-gray-100 w-full px-6 py-1 text-start">
                        Add Description
                      </button>
                      <button className="hover:bg-gray-100 w-full px-6 py-1 text-start">
                        Do another
                      </button>
                    </div>
                  )}
                </OutsideAlerter>
              </div>
            </div>
          </div>
        </div>
        {active && <FormSideBar sequence={formField.sequence} />}
      </div>
    </OutsideAlerter>
  );
}

export default TextField;