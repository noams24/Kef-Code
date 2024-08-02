'use client';

import ImageDisplay from '@/components/ImageDisplay';
import { EditorContentType } from '@/components/UploadSolution';
import Editor from '@/layouts/editor/components/Editor';
import { EditorDocument } from '@/types';
import { EditorState } from 'lexical';
import { useState } from 'react';
import Split from 'react-split';
import emptyJson from '../../../layouts/components/workSpace/jsonFiles/empty.json';

const PdfRenderer = dynamic(() => import('@/components/PdfRenderer'), {
  ssr: false,
});

import '../../../layouts/components/workSpace/split.css';
import dynamic from 'next/dynamic';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button2';
import { saveHint, uploadStartSolution } from './upload';

const AdminStuff = ({ problemData }: any) => {
  const [hintData, setHintData] = useState('');
  let document = emptyJson as unknown as EditorDocument;
  //   if (problemData?.solutionStart) document = problemData.solutionStart;
  const [jsonState, setJsonState] = useState<EditorContentType>(document.data);
  if (problemData?.solutionStart) {
    document = problemData.solutionStart;
    // setJsonState(problemData.solutionStart);
  }

  function onChange(
    state: EditorState,
    setJsonState: React.Dispatch<React.SetStateAction<EditorContentType>>
  ) {
    state.read(() => {
      if (state.isEmpty()) {
        setJsonState(undefined);
        return;
      }
      setJsonState(state.toJSON());
    });
  }

  const saveStartSolution = () => {
    uploadStartSolution(jsonState, problemData.id);
  };

  const handleHintChange = (e: any) => {};

  //   console.log(problemData?.solutionStart);

  return (
    <div>
      <Split className="split h-[70dvh] border" minSize={0}>
        <div className="overflow-auto">
          {problemData?.img.endsWith('pdf') ? (
            <PdfRenderer url={problemData?.img} />
          ) : (
            <ImageDisplay imageUrl={problemData?.img} />
          )}
        </div>
        <div className="relative flex w-full flex-col overflow-y-auto font-arial">
          {problemData?.solutionStart ? (
            <Editor
              document={{ data: problemData.solutionStart }}
              onChange={editor => onChange(editor, setJsonState)}
            />
          ) : (
            <Editor
              document={document}
              onChange={editor => onChange(editor, setJsonState)}
            />
          )}
        </div>
      </Split>
      <Button dir="rtl" onClick={saveStartSolution} className="mt-3">
        שמירה StartSolution
      </Button>
      <div dir="rtl" className="my-10">
        <p>הנחייה</p>
        <TextArea
          className="min-h-20 w-1/4"
          defaultValue={problemData.hint ? problemData.hint : ''}
          placeholder="הנחייה"
          onChange={e => setHintData(e.target.value)}
        />
        <Button
          onClick={() => saveHint(hintData, problemData.id)}
          className="mt-3"
        >
          שמירת הנחייה
        </Button>
      </div>
    </div>
  );
};

export default AdminStuff;
