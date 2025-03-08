import { Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

export default function MessageEditor({ content, onChange }) {
  const extensions = [StarterKit, CustomEmoji, VietnameseInput];

  return (
    <Editor content={content} extensions={extensions} onUpdate={onChange} />
  );
}
