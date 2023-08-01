import Editor from "@/layouts/editor/components/Editor"
import playgroundTemplate from './Playground.json';
import type { EditorDocument } from './types';

const Edit = async () => {
    const document = playgroundTemplate as unknown as EditorDocument;
    return (
        <>
            <Editor document={document} />
        </>
    );
};

export default Edit;
