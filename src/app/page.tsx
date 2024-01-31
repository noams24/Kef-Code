"use client";

import ImageFallback from "@/helpers/ImageFallback";
import Footer from "@/partials/Footer";
import SeoMeta from "@/partials/SeoMeta";
import { FaCheck } from "react-icons/fa/index.js";
import Link from "next/link";
// import Image from "next/image";
import Features from "@/components/Features";
import Editor from "@/layouts/editor/components/Editor";
// import playgroundTemplate from "./jsonFiles/empty.json";
import playgroundTemplate from "@/components/workSpace/jsonFiles/empty.json";
import { EditorDocument } from "@/components/workSpace/types";
// import Tilt from "react-parallax-tilt";
import TiltedImage from "@/components/TiltedImage";
import BubbleText from "@/components/BubbleText";
import { useRef } from "react";
import { useIsVisible } from "@/helpers/Visible";

const Home = () => {
  const ul1 = "מגוון שאלות ממבחנים עם פתרונות הלקוחות ";
  const ul2 = "אינטרקציה עם ";
  const ul3 = " על מנת לכתוב נוסחאות מתמטיות";
  // const ul4 = "גרפים: אינטרקציה עם ";
  const ul5 = " על מנת לשרטט גרפים וצורות";
  // const ul6 = "איור: אינטרקציה עם ";
  const ul7 = " על מנת לאייר כמו כתב יד";

  const document = playgroundTemplate as unknown as EditorDocument;

  const ref2: any = useRef();
  const isVisible2 = useIsVisible(ref2);
  const ref3: any = useRef();
  const isVisible3 = useIsVisible(ref3);

  return (
    <>
      <SeoMeta />
      <section className="bg-gradient2 sm:h-[90dvh] md:h-[92dvh] flex items-center">
        <div className="container">
          <div className="flex sm:flex-wrap-reverse md:flex-nowrap justify-center gap-x-3 animate-slidein opacity-0 items-center md:pb-10">
            <TiltedImage />
            <div className="max-w-xs">
              <BubbleText />
              <p dir="rtl" className="mb-4 text-lg">
                הפלטפורמה הטובה ביותר לתרגול שאלות של מדעי המחשב ומתמטיקה
                באוניברסיטה הפתוחה
              </p>
              <div className="flex justify-center">
                <Link
                  className="btn btn-start transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                  href="/courses"
                >
                  התחלה
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm bg-gradient">
        <div
          ref={ref2}
          className={`container transition-opacity ease-in duration-1000 ${
            isVisible2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="row items-center justify-between">
            <div className="mb:md-0 mb-6 md:col-5 sm:hidden md:block">
              <ImageFallback
                src="/images/service-1.png"
                height={480}
                width={520}
                alt="מה כלול בכיף קוד"
              />
            </div>
            <div className="md:col-7 lg:col-6 ">
              <h2 className="mb-4 text-center">מה כלול </h2>
              <p className="mb-8 text-lg" />
              <ul dir="rtl">
                <div className="flex gap-4 items-center mb-3">
                  <div>
                    <FaCheck />
                  </div>
                  <li> מעל 20 קורסים שונים</li>
                </div>
                <div className="flex gap-4 items-center mb-3">
                  <div>
                    <FaCheck />
                  </div>
                  <li>
                    {ul1}
                    <Link
                      className="text-blue-500 hover:underline"
                      href="https://mega.nz/folder/0Sg0iD4B#0OPF1JJgFjtYoJuStlsCtA"
                      target="_blank"
                    >
                      מהמגה של האוניברסיטה הפתוחה
                    </Link>
                  </li>
                </div>
                <div className="flex gap-4 items-center mb-3">
                  <div>
                    <FaCheck />
                  </div>
                  <li> סידור השאלות לפי פרקים</li>
                </div>
                <div className="flex gap-4 items-center">
                  <div>
                    <FaCheck />
                  </div>
                  <li> עורך טקסט המותאם להקלדה מהירה</li>
                </div>
              </ul>
              <div className="flex justify-center">
                <Link
                  className="btn inline-block btn-primary mt-5"
                  href="/courses/algebra-1/bases/תלות-לינארית"
                >
                  דוגמא
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm bg-gradient">
        <div
          ref={ref3}
          className={`opacity-0 ${
            isVisible3 ? "animate-slideFromDown" : "opacity-0"
          }`}
        >
          <div className="flex justify-center mb-10">
            <div
              className="
            border
            border-gray-200
            dark:border-gray-700
          rounded-full
          px-3 py-1
          text-sm
        "
            >
              {"✨ פיצ'רים של עורך הטקסט"}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap items-center gap-y-10 justify-center gap-x-5 ">
            <Features
              imgUrl={"/images/illustration-webgl.png"}
              topText={"איור"}
            >
              {ul2}
              <Link
                className="text-blue-500 hover:underline font-arial font-extrabold"
                href="https://excalidraw.com"
                target="_blank"
              >
                Excalidraw
              </Link>
              {ul7}
            </Features>
            <Features
              imgUrl={"/images/illustration-mathematics.png"}
              topText={"מתמטיקה"}
            >
              {ul2}
              <Link
                className="text-blue-500 hover:underline font-arial font-extrabold"
                href="https://cortexjs.io/mathlive"
                target="_blank"
              >
                MathLive
              </Link>
              {ul3}
            </Features>
            <Features
              imgUrl={"/images/illustration-3d-software.png"}
              topText={"גרפים"}
            >
              {ul2}
              <Link
                className="text-blue-500 hover:underline font-arial font-extrabold"
                href="https://www.geogebra.org"
                target="_blank"
              >
                Geogebra
              </Link>
              {ul5}
            </Features>
          </div>
          <div className="flex justify-center my-10">
            <div
              className="
            border
            border-gray-200
            dark:border-gray-700
          rounded-full
          px-3 py-1
          text-sm
        "
            >
              {"נסו בעצמכם"}
            </div>
          </div>
          <div className="flex justify-center mb-10">
            <div className="font-arial min-h-[300px] w-2/3 max-w-2xl rounded-md border border-gray-400 dark:border-gray-400">
              <Editor document={document} />
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <Link
              className="btn-outline-primary inline-block pt-2"
              href="/playground"
            >
              סביבת ניסוי
            </Link>
            <Link className="btn inline-block btn-primary" href="/tutorial">
              מדריך
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
