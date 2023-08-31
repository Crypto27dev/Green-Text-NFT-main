import { Editor } from 'slate';

export const isSelectionAtBlockStart = (editor, type) => {
    let blockAbove;
    try {
        blockAbove = Editor.above(editor, {
            match: (n) => Editor.isBlock(editor, n),
        });
    } catch (err) {
        return false;
    }

    if (
        !blockAbove ||
        !editor.selection?.focus ||
        (blockAbove[0]).type !== type
    ) {
        return false;
    }

    return Editor.isStart(editor, editor.selection.focus, blockAbove[1]);
};