export const groupTheory: any = [
  {
    name: "שייך",
    latex: "\\in",
    shortcut: "\\in",
    shortcut2: "שייך",
  },
  {
    name: "תת-קבוצה",
    latex: "\\subseteq",
    shortcut: "\\subseteq",
    shortcut2: "תתקבוצה",
  },
  {
    name: "תת-קבוצה ממש",
    latex: "\\subset",
    shortcut: "\\subset",
    shortcut2: "ממשתתקבוצה",
  },
  {
    name: "איחוד",
    latex: "\\cap",
    shortcut: "\\cap",
    shortcut2: "איחוד",
  },
  {
    name: "חיתוך",
    latex: "\\cup",
    shortcut: "\\cup",
    shortcut2: "חיתוך",
  },
  {
    name: "הפרש",
    latex: "\\setminus",
    shortcut: "\\setminus",
    shortcut2: "הפרש",
  },
  {
    name: "משלים",
    latex: "\\^c",
    shortcut: "\\^c",
    shortcut2: "משלים",
  },
  {
    name: "מכפלה קרטזית",
    latex: "\\times",
    shortcut: "\\times",
    shortcut2: "מכפלהקרטזית",
  },
  {
    name: "סוגר שמאל מסולסל",
    latex: '\\{',
    shortcut: '\\{',
    shortcut2: "סוגרשמאלמסולסל",
  },
  {
    name: "סוגר ימין מסולסל",
    latex: '\\}',
    shortcut: '\\}',
    shortcut2: "סוגרימיןמסולסל",
  },
  {
    name: "כך ש",
    latex: "\\mid",
    shortcut: "\\mid",
    shortcut2: "כךש",
  }
];

export const quantifiers: any = [
  {
    name: "כל",
    latex: "\\forall",
    shortcut: "\\forall",
    shortcut2: "כל",
  },
  {
    name: "קיים",
    latex: "\\exists",
    shortcut: "\\exists",
    shortcut2: "קיים",
  },
  {
    name: "אין",
    latex: "\\nexists",
    shortcut: "\\nexists",
    shortcut2: "אין",
  },
  {
    name: "קיים יחיד",
    latex: "\\exists!",
    shortcut: "\\exists!",
    shortcut2: "קייםיחיד",
  },
];

export const numberTheory: any = [
  {
    name: "המספרים הטבעיים",
    latex: "\\mathbb{N}",
    shortcut: "\\mathbb{N}",
    shortcut2: "המספריםהטבעיים",
  },
  {
    name: "המספרים השלמים",
    latex: "\\mathbb{Z}",
    shortcut: "\\mathbb{Z}",
    shortcut2: "המספריםהשלמים",
  },
  {
    name: "המספרים הרציונליים",
    latex: "\\mathbb{Q}",
    shortcut: "\\mathbb{Q}",
    shortcut2: "המספריםהרציונליים",
  },
  {
    name: "המספרים הממשיים",
    latex: "\\mathbb{R}",
    shortcut: "\\mathbb{R}",
    shortcut2: "המספריםהממשיים",
  }
];

export const relationalOperators: any = [
  {
    name: "או",
    latex: "\\vee",
    shortcut: "\\vee",
    shortcut2: "או",
  },
  {
    name: "וגם",
    latex: "\\wedge",
    shortcut: "\\wedge",
    shortcut2: "וגם",
  },
];

export const inlineShortcuts:any = {
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

  export const keyboard:any = [
    {
      label: "לוגיקה ותורת הקבוצות",
      rows: [
        [
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
