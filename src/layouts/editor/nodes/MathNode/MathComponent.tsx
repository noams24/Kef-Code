"use client";
import { DOMAttributes } from "react";
import {
  $createRangeSelection,
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  $setSelection,
  BaseSelection,
  NodeKey,
  RangeSelection,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey } from "lexical";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import type { MathfieldElement, MathfieldElementAttributes } from "mathlive";
import "./index.css";

type CustomElement<T> = Partial<T & DOMAttributes<T>>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["math-field"]: CustomElement<MathfieldElementAttributes>;
    }
  }
}

export type MathComponentProps = {
  initialValue: string;
  nodeKey: NodeKey;
  mathfieldRef: React.RefObject<MathfieldElement>;
};

export default function MathComponent({
  initialValue,
  nodeKey,
  mathfieldRef: ref,
}: MathComponentProps): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState<BaseSelection | null>(null);
  const [lastRangeSelection, setLastRangeSelection] =
    useState<RangeSelection | null>(null);
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);

  useEffect(() => {
    const mathfield = ref.current;
    if (!mathfield) return;
    if (initialValue !== mathfield.getValue()) {
      mathfield.setValue(initialValue, { silenceNotifications: true });
    }
  }, [initialValue]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        const newSelection = editorState.read(() => $getSelection());
        setSelection(newSelection);
        if ($isRangeSelection(newSelection)) {
          setLastRangeSelection(newSelection);
        }
      }),
    );
  }, []);

  useLayoutEffect(() => {
    const mathfield = ref.current;
    if (!mathfield) return;
    // highlight when range selected
    const active = isSelected && $isRangeSelection(selection);
    mathfield.classList.toggle("selection-active", active);
  }, [ref, isSelected, selection]);

  useEffect(() => {
    const mathfield = ref.current;
    if (!mathfield) return;
    // reselect when selection is lost and mathfield is focused
    if (!selection && document.activeElement === mathfield) setSelected(true);
    // focus when node selected
    if (isSelected && !mathfield.hasFocus()) {
      if (!$isNodeSelection(selection)) return;
      editor.getEditorState().read(() => {
        const mathNode = $getNodeByKey(nodeKey);
        if (!mathNode) return;
        const anchor = lastRangeSelection?.anchor;
        if (!anchor) return;
        const anchorNode = anchor.getNode();
        const anchorOffset = anchor.offset;
        const isParentAnchor = anchorNode === mathNode.getParent();
        const indexWithinParent = mathNode.getIndexWithinParent();
        const isBefore = isParentAnchor
          ? anchorOffset - indexWithinParent === 0
          : anchorNode.isBefore(mathNode);
        focus(mathfield);
        mathfield.executeCommand(
          isBefore ? "moveToMathfieldStart" : "moveToMathfieldEnd",
        );
      });
    }
  }, [isSelected]);

  useEffect(() => {
    const mathfield = ref.current;
    if (!mathfield) return;

    mathfield.mathModeSpace = "\\,";

    // focus newly created mathfield
    if (isSelected && !mathfield.hasFocus()) {
      focus(mathfield);
    }

    mathfield.addEventListener(
      "input",
      (e) => {
        const event = e as InputEvent;
        const value = mathfield.getValue();
        editor.update(() => {
          if (value === initialValue) return;
          const node = $getNodeByKey(nodeKey);
          if (!node) return;
          node.setValue(value);
        });
        if (event.inputType === "insertLineBreak") {
          event.stopPropagation();
          if (value.trim().length === 0) return;
          editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if (!node) return;
            mathfield.blur();
            node.selectNext(0, 0);
          });
        }
      },
      false,
    );

    mathfield.addEventListener(
      "change",
      (e) => {
        editor.update(() => {
          const value = mathfield.getValue();
          if (value.trim().length) return;
          const node = $getNodeByKey(nodeKey);
          if (!node) return;
          node.remove(true);
          const parentRootElement = editor.getRootElement();
          if (parentRootElement !== null) {
            parentRootElement.focus();
          }
        });
      },
      false,
    );

    mathfield.addEventListener("click", (event) => {
      clearSelection();
      setSelected(true);
      focus(mathfield);
      if (mathfield.selectionIsCollapsed)
        mathfield.setCaretPoint(event.clientX, event.clientY);
    });

    mathfield.addEventListener("keydown", (event) => {
      event.stopPropagation();
    });

    mathfield.addEventListener("move-out", (event) => {
      const direction = event.detail.direction;
      var range = document.createRange();
      var selection = window.getSelection();
      const span = mathfield.parentElement!;

      switch (direction) {
        case "backward":
        case "upward":
          range.setStartBefore(span);
          break;
        case "forward":
        case "downward":
          range.setStartAfter(span);
          break;
      }

      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);

      editor.update(() => {
        const rangeSelection = $createRangeSelection();
        rangeSelection.applyDOMRange(range);
        $setSelection(rangeSelection);
        if (mathfield.value.trim().length === 0) {
          const node = $getNodeByKey(nodeKey);
          node && node.remove();
        }
      });
    });

    mathfield.inlineShortcuts = {
      ...mathfield.inlineShortcuts,
      בינום:
        "\\begin{pmatrix} \\placeholder{}  \\\\  \\placeholder{} \\end{pmatrix}",
      מטריצה:
        "\\begin{pmatrix} \\placeholder{} & \\placeholder{} \\\\  \\placeholder{} & \\placeholder{} \\end{pmatrix}",
      אפשרויות:
        "f(x)=\\begin{cases} \\placeholder{} &  \\placeholder{} \\text{ אם} & \\placeholder{} & \\placeholder{} \\text{ אם} \\end{cases}",
      לכל: "\\forall",
      קיים: "\\exists",
      לאקיים: "\\nexists",
      גם: "\\lor",
      או: "\\land",
      שלילה: "\\neg",
      אםם: "\\leftrightarrow",
      חיתוך: "\\cap",
      איחוד: "\\cup",
      שייך: "\\in",
      לאשייך: "\\notin",
      מוכל: "\\subseteq",
      ממשמוכל: "\\subset",
      לאמוכל: "\\nsubseteq",
      ממשלאמוכל: "\\subset",
      ריק: "\\empty",
      סכום: "\\displaystyle \\sum_{i=0}^n",
      שורש: "\\sqrt[\\placeholder{}]{\\placeholder{}}",
      אינטגרל:
        "\\int_\\placeholder{}^{\\placeholder{}}\\!\\placeholder{}\\,\\mathrm{d}x",
      גבול: "\\lim_{x \\to \\placeholder{}}",
      חץארוך: "\\xrightarrow[\\placeholder{}]{\\placeholder{}}",
    };
  }, []);

  const focus = useCallback((mathfield: MathfieldElement) => {
    mathfield.focus();
    const mathVirtualKeyboard = window.mathVirtualKeyboard;
    mathVirtualKeyboard.show({ animate: true });
    mathVirtualKeyboard.layouts = [
      {
        label: "לוגיקה ותורת הקבוצות",
        rows: [
          [
            // { latex: "a", variants: ["A", "\\alpha", "\\Alpha"],shift: "b" },
            { tooltip: "לכל", latex: "\\forall" },
            { tooltip: "קיים", latex: "\\exists" },
            { tooltip: "לא קיים", latex: "\\nexists" },
            { tooltip: "שייך", latex: "\\in" },
            { tooltip: "לא שייך", latex: "\\notin" },
            { label: "[separator]", width: 0.5 },
            "\\hat{#?}",
            "\\bar{#?}",
            "\\overline{#?}",
            "#?^{c}",
          ],
          [
            { tooltip: "וגם", latex: "\\land" },
            { tooltip: "או", latex: "\\lor" },
            { tooltip: "שלילה", latex: "\\neg" },
            { tooltip: "קבוצה ריקה", latex: "\\varnothing" },
            { label: "[separator]", width: 0.5 },
            {
              tooltip: "אימפליקציה",
              latex: "\\to",
              variants: ["\\longrightarrow", "\\Longrightarrow"],
            },
            {
              tooltip: "אימפליקציה",
              latex: "\\gets",
              variants: ["\\longleftarrow", "\\impliedby"],
            },
            {
              tooltip: "אם ורק אם",
              latex: "\\leftrightarrow",
              variants: ["\\biconditional", "\\Leftrightarrow"],
            },
          ],
          [
            { tooltip: "יכיח", latex: "\\vdash" },
            { tooltip: "", latex: "\\dashv" },
            { tooltip: "תקף", latex: "\\models" },
            { tooltip: "סתירה", latex: "\\bot" },
            { tooltip: "שקול", latex: "\\equiv" },
            { label: "[separator]", width: 0.5 },
            { tooltip: "מוכל ממש", latex: "\\subset" },
            { tooltip: "מוכל", latex: "\\subseteq" },
            { tooltip: "לא מוכל ממש", latex: "\\nsubset" },
            { tooltip: "לא מוכל", latex: "\\nsubseteq" },
          ],
          ["\\varphi", "\\mu", "\\psi", "\\phi", "\\eta", "\\zeta", "\\theta"],
        ],
      },
      {
        label: "אינפי",
        rows: [
          [
            {
              tooltip: "חסם",
              latex: "\\lim_{#? \\to #?}",
              variants: [
                { class: "small", latex: "\\overline{\\lim_{#? \\to #?}}" },
                { class: "small", latex: "\\underline{\\lim_{#? \\to #?}}" },
              ],
            },
            { class: "small", latex: "\\int_#?^#? #? dx" },
            "\\infin",
            "\\xrightarrow[#?]{#?}",
            "\\xleftarrow[#?]{#?}",
            "\\xleftrightarrow[#?]{#?}",
            { class: "small", latex: "\\prod_#?^#?" },
            { class: "small", latex: "\\sum^#?_#?" },
            "\\sqrt{#?}",
          ],
          [
            "\\to",
            "\\sqrt[#?]{#?}",
            "\\frac{#?}{#?}",
            "\\varnothing",
            "\\pdiff{#?}{#?}",
          ],
          [
            { class: "small", latex: "\\binom{#?}{#?}" },
            {
              class: "small",
              width: 2,
              latex:
                "f(x)=\\begin{cases} \\placeholder{} &  \\placeholder{} \\text{ אם} & \\placeholder{} & \\placeholder{} \\text{ אם} \\end{cases}",
            },
          ],
        ],
      },
      {
        label: "אלגברה לינארית",
        rows: [
          [],
          ["\\xrightarrow[#?]{#?}", "\\xleftarrow[#?]{#?}"],
          [
            { latex: "\\circ", tooltip: "הרכבת פונקציות" },
            { latex: "\\times", tooltip: "מכפלה קרטזית" },
          ],
          ["\\cdotp", "\\vdots", "\\ddots", "\\cdots"],
          [
            {
              class: "small",
              tooltip: "מטריצה",
              width: 2,
              latex:
                "\\begin{pmatrix} \\placeholder{} & \\placeholder{} \\\\  \\placeholder{} & \\placeholder{} \\end{pmatrix}",
            },
            {
              class: "small",
              tooltip: "וקטור",
              width: 2,
              latex:
                "\\begin{bmatrix} \\placeholder{}  \\\\  \\placeholder{} \\\\  \\placeholder{} \\end{bmatrix}",
            },
            {
              class: "small",
              tooltip: "דטרמיננטה",
              width: 2,
              latex:
                "\\begin{vmatrix} \\placeholder{} & \\placeholder{} \\\\  \\placeholder{} & \\placeholder{} \\end{vmatrix}",
            },
          ],
        ],
      },
      "greek",
      "numeric",
      "symbols",
    ];

    const container = mathVirtualKeyboard.container;
    if (!container) return;
    container.addEventListener(
      "transitionend",
      () => mathfield.executeCommand("scrollIntoView"),
      { once: true },
    );
  }, []);

  return <math-field dir="ltr" ref={ref} />;
}
