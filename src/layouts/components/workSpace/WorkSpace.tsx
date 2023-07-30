"use client"
//import Split from '@/components/Split/src';
import Split from 'react-split'
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/text-editor/editor";
import PageHeader from "@/partials/PageHeaderr";
import Tab from "@/shortcodes/Tab";
import Tabs from "@/shortcodes/Tabs";
import Video from "@/shortcodes/Video";
import Likes from "@/shortcodes/Likes";
import Accordion from "@/shortcodes/Accordion";
import ImageDisplay from "@/components/ImageDisplay"
import "./split.css"
const Workspace: React.FC<any> = () => {
    const imageUrl = "https://i.ibb.co/Gdz4BTg/problem1.png";

    return (
        <>
        <Split className="split" minSize={0}>
            <div className="content">
                <Tabs>
                    <Tab name="פתרונות">כאן יופיעו פתרונות של אנשים</Tab>
                    <Tab name="פתרון רשמי"><Video title="solution" height={500} width={500} src="https://joy1.videvo.net/videvo_files/video/free/video0467/large_watermarked/_import_61516692993d77.04238324_preview.mp4" /></Tab>
                    <Tab name="תיאור"> <Likes /> <ImageDisplay imageUrl={imageUrl} /></Tab>
                </Tabs>
                <Accordion title="דיון">
                    תגובה1
                    תגובה2
                    תגובה3
                </Accordion>
                <Accordion title="שאלות דומות">
                    שאלה1
                    2שאלה
                    שאלה3
                </Accordion>
            </div>
            <Editor
                action="פתרון"
                content={undefined}
                session={undefined}
            />
        </Split>
        <div className="my-3 ml-12 flex justify-center gap-x-2"> 
      <Button
          className="btn btn-outline-primary btn-sm lg:inline-block"
        >
          פרסום
        </Button>
        <Button
          className="btn btn-outline-primary btn-sm  lg:inline-block"
        >
          שמירה
        </Button> 
      </div>
        </>
    );
};
export default Workspace;


{/* 
<div className="content">
                    <Tabs>
                        <Tab name="פתרונות">כאן יופיעו פתרונות של אנשים</Tab>
                        <Tab name="פתרון רשמי"><Video title="solution" height={500} width={500} src="https://joy1.videvo.net/videvo_files/video/free/video0467/large_watermarked/_import_61516692993d77.04238324_preview.mp4" /></Tab>
                        <Tab name="תיאור"> <Likes /> <ImageDisplay imageUrl={imageUrl} /></Tab>
                    </Tabs>
                    <Accordion title="דיון">
                        תגובה1
                        תגובה2
                        תגובה3
                    </Accordion>
                    <Accordion title="שאלות דומות">
                        שאלה1
                        2שאלה
                        שאלה3
                    </Accordion>
                </div>
                    <Editor
                        action="פתרון"
                        content={undefined}
                        session={undefined}
                    />
*/}