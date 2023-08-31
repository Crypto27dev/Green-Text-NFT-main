import { Editor, Range, Transforms } from "slate";
import { isSelectionAtBlockStart } from "../utils";

const withGreenText = (editor) => {
    const { insertText, deleteBackward } = editor;

    editor.insertText = (text) => {
        const { selection } = editor;

        

        if (text !== ">" || !selection || !Range.isCollapsed(selection)) {

            console.log(insertText);
            
            insertText(text);
            return;
        }

        Transforms.setNodes(
            editor,
            { type: "green-text" },
            { match: (n) => Editor.isBlock(editor, n) }
        );
    }

    editor.deleteBackward = (unit) => {
        if (isSelectionAtBlockStart(editor, "green-text")) {
            Transforms.setNodes(editor, { type: "paragraph" });
            return;
        }
        deleteBackward(unit);
    };

    return editor;
}

export default withGreenText;