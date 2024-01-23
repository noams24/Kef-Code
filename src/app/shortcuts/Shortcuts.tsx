"use client";

import { useEffect, useRef, useState } from "react";
import {
  groupTheory,
  numberTheory,
  relationalOperators,
  infi,
  inlineShortcuts,
  keyboard,
} from "./constants";
import Link from "next/link";
import ShortcutsTable from "./Table";

//@ts-ignore
import(/* webpackIgnore: true */ "//unpkg.com/mathlive/dist/mathlive.min.js");

function App() {
  const [value, setValue] = useState<string>("\\sqrt{x}");
  const mf = useRef();
  // mf.inlineShortcuts = {}

  useEffect(() => {
    //@ts-ignore
    mf.current.value = value;
  }, [value]);

  // Customize the mathfield when it is created
  useEffect(() => {
    //@ts-ignore
    mf.current.addEventListener(
      "focusin",
      //@ts-ignore
      (evt) =>
        (
          //@ts-ignore
          (mf.current.inlineShortcuts = {
            //@ts-ignore
            ...mf.current.inlineShortcuts,
            ...inlineShortcuts,
          }),
          //@ts-ignore
          (window.mathVirtualKeyboard.layouts = keyboard),
          window.mathVirtualKeyboard.hide()
        ),
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-8 gap-8">
      <h1>קיצורי מקלדת מתמטיים</h1>
      <div>
        <p dir="rtl">כדי לכתוב נוסחאות מתמטיות משתמשים בשפת ה- Latex </p>
        <p>
          לשפה זו יש הרבה מאוד קיצורים שאותם תוכלו לראות{" "}
          <Link
            className="text-blue-500 hover:underline"
            href="https://cortexjs.io/mathlive/reference/commands/"
            target="_blank"
          >
            פה
          </Link>
        </p>
      </div>
      :נסו בעצמכם
      {/*@ts-ignore */}
      <math-field
        class=" w-2/5 box-border p-2 text-xl rounded-md border border-solid border-gray-900 bg-blue-100"
        ref={mf}
        //@ts-ignore
        onInput={(evt) => setValue(evt.target.value)}
      >
        {value}
      </math-field>
      <p>כדי לחסוך לכם זמן וכוח, הוספנו קיצורים נוספים בהם תוכלו להשתמש</p>
      <div dir="rtl" className="mt=10">
        <h2>מילון לסימני LaTex</h2>
        <div className="overflow-x-auto font-arial font-bold">
          <h4 className="pt-6 pb-3">תורת הקבוצות</h4>
          <ShortcutsTable shortcuts={groupTheory} />

          <h4 className="pt-8 pb-3 flext justify">קבוצות המספרים</h4>
          <ShortcutsTable shortcuts={numberTheory} />

          <h4 className="pt-8 pb-3">לוגיקה - תחשיב הפסוקים</h4>
          <ShortcutsTable shortcuts={relationalOperators} />

          <h4 className="pt-8 pb-3">אינפי</h4>
          <ShortcutsTable shortcuts={infi} />
        </div>
      </div>
    </div>
  );
}

export default App;

//@ts-ignore
//import(/* webpackIgnore: true */ "//unpkg.com/mathlive");
