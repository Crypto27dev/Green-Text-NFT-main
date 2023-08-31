import { useState } from 'react';
import { createEditor } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
import { renderElement } from './elements';
import withGreenText from './plugins/greentext';

const SlateEditor = () => {
    const [editor] = useState(() => withGreenText(withReact(createEditor())));
    const initialValue = [
        {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
        },
    ] 

    return (
        <Slate editor={editor} value={initialValue}>
            <Editable
                spellCheck="false"
                renderElement={renderElement}
            />
        </Slate>
    );
}

export default SlateEditor;

