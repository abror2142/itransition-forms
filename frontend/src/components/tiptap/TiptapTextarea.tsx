import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faListOl,
  faListUl,
  faQuoteLeft,
  faRedo,
  faStrikethrough,
  faTextSlash,
  faUnderline,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import useForm from "../../hooks/useForm";
import { useState } from "react";
import OutsideAlerter from "../../hooks/useOutsideAlterter";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2 text-lg bg-white px-2 py-1 dark:bg-dark-card-light dark:text-dark-text">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`tiptap-button ${
          editor.isActive("bold") ? "is-active" : ""
        }`}
      >
        <FontAwesomeIcon icon={faBold} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`tiptap-button ${
          editor.isActive("italic") ? "is-active" : ""
        }`}
      >
        <FontAwesomeIcon icon={faItalic} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`tiptap-button ${
          editor.isActive("strike") ? "is-active" : ""
        }`}
      >
        <FontAwesomeIcon icon={faStrikethrough} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`tiptap-button ${
          editor.isActive("underline") ? "is-active" : ""
        }`}
      >
        <FontAwesomeIcon icon={faUnderline} />
      </button>

      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={`tiptap-button`}
      >
        <FontAwesomeIcon icon={faTextSlash} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`tiptap-button ${
          editor.isActive("bulletList") ? "is-active" : ""
        }`}
      >
        <FontAwesomeIcon icon={faListUl} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`tiptap-button ${
          editor.isActive("orderedList") ? "is-active" : ""
        }`}
      >
        <FontAwesomeIcon icon={faListOl} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`tiptap-button ${
          editor.isActive("blockquote") ? "is-active" : ""
        }`}
      >
        <FontAwesomeIcon icon={faQuoteLeft} />
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`tiptap-button ${editor.can().undo() ? "can-do" : ""}`}
      >
        <FontAwesomeIcon icon={faUndo} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`tiptap-button ${editor.can().redo() ? "can-do" : ""}`}
      >
        <FontAwesomeIcon icon={faRedo} />
      </button>
    </div>
  );
};

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Underline,
];

const TiptapTextarea = ({
  id,
  placeholder,
}: {
  id: string;
  placeholder: string;
}) => {
  const [active, setActive] = useState(false);
  const { updateFormFieldDescription } = useForm();

  return (
    <div
      className="w-full"
      onClick={() => setActive(true)}
      onFocus={() => setActive(false)}
    >
      <OutsideAlerter setActive={setActive}>
        <EditorProvider
          slotAfter={active && <MenuBar />}
          extensions={extensions}
          content={placeholder}
          editorProps={{
            attributes: {
              class:
                "px-4 py-2 outline-none bg-white prose m-0 border-b border-gray-400 text-lg dark:bg-dark-bg dark:border dark:border-dark-border dark:text-dark-text-highlighted",
            },
          }}
          onUpdate={({ editor }) => {
            updateFormFieldDescription(id, editor.getHTML());
          }}
        ></EditorProvider>
      </OutsideAlerter>
    </div>
  );
};

export default TiptapTextarea;