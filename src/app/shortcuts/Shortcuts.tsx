"use client";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/layouts/components/ui/Table";
import { useEffect, useRef, useState } from "react";
import { groupTheory, numberTheory, RelationalOperators, inlineShortcuts, keyboard } from "./constants";

//@ts-ignore
import(/* webpackIgnore: true */ "//unpkg.com/mathlive");

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
      (evt) => (
        //@ts-ignore
        (mf.current.inlineShortcuts = {
          //@ts-ignore
          ...mf.current.inlineShortcuts,
          ...inlineShortcuts,
        }),
        //@ts-ignore
        (window.mathVirtualKeyboard.layouts = keyboard),
        window.mathVirtualKeyboard.show()
      ),
    );
    //@ts-ignore
    mf.current.addEventListener("focusout", (evt) =>
      window.mathVirtualKeyboard.hide(),
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-8 gap-8">
      <h1>קיצורי מקלדת מתמטיים</h1>
      {/*@ts-ignore */}
      <math-field
        class=" w-2/5 box-border p-2 text-xl rounded-md border border-solid border-gray-900 bg-blue-100"
        ref={mf}
        //@ts-ignore
        onInput={(evt) => setValue(evt.target.value)}
      >
        {value}
      </math-field>
      <div dir="rtl" className="mt=10">
        <h2>מילון לסימני LaTex</h2>
        <div className="overflow-x-auto font-arial font-bold">
          <h4 className="pt-6 pb-3">תורת הקבוצות</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>שם הסימן</TableHead>
                <TableHead className="border-x border-gray-800 dark:border-gray-200">
                  הסימן
                </TableHead>
                <TableHead className="border-x border-gray-800 dark:border-gray-200">
                  הקיצור ב-LaTex
                </TableHead>
                <TableHead>הקיצור שלנו</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupTheory.map((obj: any, index: number) => (
                <TableRow
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-200 dark:bg-zinc-700" : ""
                    }`}
                >
                  <TableCell className="border-l border-gray-800 dark:border-gray-200">
                    {obj.name}
                  </TableCell>
                  <TableCell className="border-l border-gray-800 dark:border-gray-200 px-10">
                    <math-field
                      read-only={true}
                      class="w-auto bg-transparent flex justify-center text-lg display:inline-block dark:text-white"
                    >
                      {obj.latex}
                    </math-field>
                  </TableCell>
                  <TableCell
                    className="border-l border-gray-800 dark:border-gray-200"
                    dir="ltr"
                  >
                    {obj.shortcut}
                  </TableCell>
                  <TableCell>{obj.shortcut2}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>


          <h4 className="pt-8 pb-3">קבוצות המספרים</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>שם הסימן</TableHead>
                <TableHead className="border-x border-gray-800 dark:border-gray-200">
                  הסימן
                </TableHead>
                <TableHead className="border-x border-gray-800 dark:border-gray-200">
                  הקיצור ב-LaTex
                </TableHead>
                <TableHead>הקיצור שלנו</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {numberTheory.map((obj: any, index: number) => (
                <TableRow
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-200 dark:bg-zinc-700" : ""
                    }`}
                >
                  <TableCell className="border-l border-gray-800 dark:border-gray-200">
                    {obj.name}
                  </TableCell>
                  <TableCell className="border-l border-gray-800 dark:border-gray-200 px-10">
                    <math-field
                      read-only={true}
                      class="w-auto bg-transparent flex justify-center text-lg display:inline-block dark:text-white"
                    >
                      {obj.latex}
                    </math-field>
                  </TableCell>
                  <TableCell
                    className="border-l border-gray-800 dark:border-gray-200"
                    dir="ltr"
                  >
                    {obj.shortcut}
                  </TableCell>
                  <TableCell>{obj.shortcut2}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <h4 className="pt-8 pb-3">לוגיקה - תחשיב הפסוקים</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>שם הסימן</TableHead>
                <TableHead className="border-x border-gray-800 dark:border-gray-200">
                  הסימן
                </TableHead>
                <TableHead className="border-x border-gray-800 dark:border-gray-200">
                  הקיצור ב-LaTex
                </TableHead>
                <TableHead>הקיצור שלנו</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RelationalOperators.map((obj: any, index: number) => (
                <TableRow
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-200 dark:bg-zinc-700" : ""
                    }`}
                >
                  <TableCell className="border-l border-gray-800 dark:border-gray-200">
                    {obj.name}
                  </TableCell>
                  <TableCell className="border-l border-gray-800 dark:border-gray-200 px-10">
                    <math-field
                      read-only={true}
                      class="w-auto bg-transparent flex justify-center text-lg display:inline-block dark:text-white"
                    >
                      {obj.latex}
                    </math-field>
                  </TableCell>
                  <TableCell
                    className="border-l border-gray-800 dark:border-gray-200"
                    dir="ltr"
                  >
                    {obj.shortcut}
                  </TableCell>
                  <TableCell>{obj.shortcut2}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>



        </div>
      </div>
    </div>
  );
}

export default App;

//@ts-ignore
//import(/* webpackIgnore: true */ "//unpkg.com/mathlive");
