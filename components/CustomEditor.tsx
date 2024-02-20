// components/CustomEditor.tsx

import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

interface EditorProps {
    initialData: string;
}

// const editorConfiguration = {
//     toolbar: [
//         'heading',
//         '|',
//         'bold',
//         'italic',
//         'link',
//         'bulletedList',
//         'numberedList',
//         '|',
//         'outdent',
//         'indent',
//         '|',
//         'imageUpload',
//         'blockQuote',
//         'insertTable',
//         'mediaEmbed',
//         'undo',
//         'redo'
//     ]
// };

const CustomEditor: React.FC<EditorProps> = (props) => {
    const { initialData } = props;
    return (
        <CKEditor
            editor={ Editor }
            // config={ editorConfiguration }
            data={ initialData }
            onChange={ (event: any, editor: any) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
            }}
        />
    );
};

export default CustomEditor;
