'use client';

import ImageFallback from '@/helpers/ImageFallback';
import Footer from '@/partials/Footer';
import SeoMeta from '@/partials/SeoMeta';
import { FaCheck } from 'react-icons/fa/index.js';
import Link from 'next/link';
// import Image from "next/image";
import Features from '@/components/Features';
import Editor from '@/layouts/editor/components/Editor';
// import playgroundTemplate from "./jsonFiles/empty.json";
import playgroundTemplate from '@/components/workSpace/jsonFiles/empty.json';
import { EditorDocument } from '@/components/workSpace/types';
// import Tilt from "react-parallax-tilt";
import TiltedImage from '@/components/TiltedImage';
import BubbleText from '@/components/BubbleText';
import { useRef } from 'react';
import { useIsVisible } from '@/helpers/Visible';

const Home = () => {
  const ul1 = 'מגוון שאלות ממבחנים עם פתרונות הלקוחות ';
  const ul2 = 'אינטרקציה עם ';
  const ul3 = ' על מנת לכתוב נוסחאות מתמטיות';
  // const ul4 = "גרפים: אינטרקציה עם ";
  const ul5 = ' על מנת לשרטט גרפים וצורות';
  // const ul6 = "איור: אינטרקציה עם ";
  const ul7 = ' על מנת לאייר כמו כתב יד';

  const document = playgroundTemplate as unknown as EditorDocument;

  const ref2: any = useRef();
  const isVisible2 = useIsVisible(ref2);
  const ref3: any = useRef();
  const isVisible3 = useIsVisible(ref3);

  return (
    <>
      <SeoMeta />
      <section className="bg-gradient2 flex items-center sm:h-[90dvh] md:h-[92dvh]">
        <div className="container">
          <div className="flex animate-slidein items-center justify-center gap-x-3 opacity-0 sm:flex-wrap-reverse md:flex-nowrap md:pb-10">
            <TiltedImage />
            <div className="max-w-xs md:mb-5">
              <BubbleText />
              <p dir="rtl" className="mb-4 text-lg">
                הפלטפורמה הטובה ביותר לתרגול שאלות של מדעי המחשב ומתמטיקה
                באוניברסיטה הפתוחה
              </p>
              <div className="flex justify-center">
                <Link
                  className="btn btn-start ml-8 shadow-[3px_3px_0px_black] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
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
          className={`container transition-opacity duration-1000 ease-in ${
            isVisible2 ? 'opacity-100' : 'opacity-0'
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
            <div className="md:col-7 lg:col-6">
              <h2 className="mb-4 text-center">מה כלול </h2>
              <p className="mb-8 text-lg" />
              <ul dir="rtl">
                <div className="mb-3 flex items-center gap-4">
                  <div>
                    <FaCheck />
                  </div>
                  <li> מעל 20 קורסים שונים</li>
                </div>
                <div className="mb-3 flex items-center gap-4">
                  <div>
                    <FaCheck />
                  </div>
                  <li>
                    {ul1}
                    <Link
                      className="text-blue-500 hover:underline"
                      href="https://mega.nz/folder/Ibl2CSIY#em77k1KkiqhFsQKXZkHdGw"
                      target="_blank"
                    >
                      מהמגה של האוניברסיטה הפתוחה
                    </Link>
                  </li>
                </div>
                <div className="mb-3 flex items-center gap-4">
                  <div>
                    <FaCheck />
                  </div>
                  <li> סידור השאלות לפי פרקים</li>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <FaCheck />
                  </div>
                  <li> עורך טקסט המותאם להקלדה מהירה</li>
                </div>
              </ul>
              <div className="flex justify-center">
                <Link
                  className="btn btn-primary mt-5 inline-block"
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
            isVisible3 ? 'animate-slideFromDown' : 'opacity-0'
          }`}
        >
          <div className="mb-10 flex justify-center">
            <div className="rounded-full border border-gray-200 px-3 py-1 text-sm dark:border-gray-700">
              {"✨ פיצ'רים של עורך הטקסט"}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-x-5 gap-y-10 md:flex-row md:flex-wrap">
            <Features
              imgUrl={'/images/illustration-webgl.png'}
              topText={'איור'}
            >
              {ul2}
              <Link
                className="font-arial font-extrabold text-blue-500 hover:underline"
                href="https://excalidraw.com"
                target="_blank"
              >
                Excalidraw
              </Link>
              {ul7}
            </Features>
            <Features
              imgUrl={'/images/illustration-mathematics.png'}
              topText={'מתמטיקה'}
            >
              {ul2}
              <Link
                className="font-arial font-extrabold text-blue-500 hover:underline"
                href="https://cortexjs.io/mathlive"
                target="_blank"
              >
                MathLive
              </Link>
              {ul3}
            </Features>
            <Features
              imgUrl={'/images/illustration-3d-software.png'}
              topText={'גרפים'}
            >
              {ul2}
              <Link
                className="font-arial font-extrabold text-blue-500 hover:underline"
                href="https://www.geogebra.org"
                target="_blank"
              >
                Geogebra
              </Link>
              {ul5}
            </Features>
          </div>
          <div className="my-10 flex justify-center">
            <div className="rounded-full border border-gray-200 px-3 py-1 text-sm dark:border-gray-700">
              {'נסו בעצמכם'}
            </div>
          </div>
          <div className="mb-10 flex justify-center">
            <div className="relative flex min-h-[500px] w-2/3 max-w-2xl flex-col rounded-md border border-gray-400 font-arial dark:border-gray-400">
              <Editor document={document} />
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-6">
            <Link
              className="btn-outline-primary inline-block pt-2"
              href="/playground"
            >
              סביבת ניסוי
            </Link>
            <Link className="btn btn-primary inline-block" href="/tutorial">
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
