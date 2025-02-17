import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
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
  faStrikethrough,
  faTextSlash,
  faUnderline,
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
    <div className="flex gap-1 bg-white px-2 py-1">
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
    </div>
  );
};

const extensions = [
  TextStyle.configure({ types: [ListItem.name] }),
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

const TiptapQuestionTitle = ({ id, title }: { id: string; title: string }) => {
  const [active, setActive] = useState(false);
  const { updateFormFieldTitle } = useForm();

  return (
    <div
      className="w-full"
      onClick={() => setActive(true)}
      onFocus={() => setActive(true)}
    >
      <OutsideAlerter setActive={setActive}>
        <EditorProvider
          slotAfter={active && <MenuBar />}
          extensions={extensions}
          content={title}
          editorProps={{
            attributes: {
              class: `px-4 py-3 outline-none bg-gray-100 rounded-t-md prose m-0 text-lg font-medium border-b border-gray-400`,
            },
          }}
          onUpdate={({ editor }) => {
            updateFormFieldTitle(id, editor.getHTML());
          }}
        ></EditorProvider>
      </OutsideAlerter>
    </div>
  );
};

export default TiptapQuestionTitle;