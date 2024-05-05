import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import { TextNode, type EditorState } from "lexical";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import SubscriptIcon from '@mui/icons-material/Subscript';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SvgIcon from '@mui/material/SvgIcon';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ImageIcon from '@mui/icons-material/Image';
import TableIcon from '@mui/icons-material/TableChart';
import FunctionsIcon from '@mui/icons-material/Functions';
import BrushIcon from '@mui/icons-material/Brush';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

const H3Icon = () => <SvgIcon viewBox='0 96 960 960' fontSize='small' sx={{ verticalAlign: "middle" }}>
  <path xmlns="http://www.w3.org/2000/svg" d="M120 776V376h60v170h180V376h60v400h-60V606H180v170h-60Zm420 0v-60h240V606H620v-60h160V436H540v-60h240q25 0 42.5 17.625T840 436v280q0 24.75-17.625 42.375T780 776H540Z" />
</SvgIcon>;

const GraphIcon = () => <SvgIcon viewBox='0 0 512 512' fontSize='small' sx={{ verticalAlign: "middle" }}>
  <path d="M500.364,244.365h-37.248c12.695-18.223,27.124-31.674,42.415-39.273c5.76-2.851,8.099-9.844,5.248-15.593    c-2.851-5.76-9.821-8.122-15.593-5.248c-24.041,11.927-45.894,34.804-63.185,66.129c-22.726,41.146-52.166,63.802-82.909,63.802    c-26.077,0-51.188-16.465-72.087-46.545H384c6.423,0,11.636-5.201,11.636-11.636c0-6.435-5.213-11.636-11.636-11.636H267.636v-128    h11.636c4.701,0,8.948-2.828,10.752-7.18s0.803-9.356-2.525-12.684l-23.273-23.273c-4.55-4.55-11.904-4.55-16.454,0L224.5,96.502    c-3.328,3.328-4.329,8.332-2.525,12.684s6.051,7.18,10.752,7.18h11.636V218.09c-23.599-28.323-51.7-43.543-81.455-43.543    c-37.876,0-72.972,24.879-99.607,69.818H11.636C5.213,244.365,0,249.567,0,256.001c0,6.435,5.213,11.636,11.636,11.636h37.248    C36.189,285.86,21.76,299.312,6.47,306.911c-5.76,2.851-8.099,9.844-5.248,15.593c2.025,4.108,6.144,6.47,10.426,6.47    c1.734,0,3.503-0.384,5.167-1.21C40.855,315.836,62.708,292.959,80,261.633c22.726-41.158,52.166-63.814,82.909-63.814    c26.077,0,51.188,16.465,72.087,46.545H128c-6.423,0-11.636,5.201-11.636,11.636c0,6.435,5.213,11.636,11.636,11.636h116.364    v162.909c0,6.435,5.213,11.636,11.636,11.636s11.636-5.201,11.636-11.636V293.913c23.599,28.323,51.7,43.543,81.455,43.543    c37.876,0,72.972-24.879,99.607-69.818h51.665c6.423,0,11.636-5.201,11.636-11.636C512,249.567,506.787,244.365,500.364,244.365z" />
</SvgIcon>;

import Task1 from "./Task1.json";
import Task2 from "./Task2.json";
import Task3 from "./Task3.json";
import Task4 from "./Task4.json";
import Task5 from "./Task5.json";
import Task6 from "./Task6.json";
import Task7 from "./Task7.json";
import Task8 from "./Task8.json"
import { EditorDocument } from "./types";

const task1Checkpoints = [
  {
    name: "הפוך את הטקסט למודגש",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2">
        2. לחץ על
        <ToggleButton value="bold" size="small" sx={{ m: 1 }}>
          <FormatBoldIcon />
        </ToggleButton>
        
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 1) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.hasFormat("bold")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הפוך את הטקסט לאיטלקי",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2">
        2. לחץ על
        <ToggleButton value="italic" size="small" sx={{ m: 1 }}>
          <FormatItalicIcon />
        </ToggleButton>
        
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 2) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.hasFormat("italic")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף לטקסט קו תחתון",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2">
        2. לחץ על
        <ToggleButton value="underline" size="small" sx={{ m: 1 }}>
          <FormatUnderlinedIcon />
        </ToggleButton>
        
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 3) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.hasFormat("underline")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הפוך את הטקסט הבא לקוד בתוך השורה",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2">
        2. לחץ על
        <ToggleButton value="code" size="small" sx={{ m: 1 }}>
          <CodeIcon />
        </ToggleButton>
        
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 4) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.hasFormat("code")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הפוך את הטקסט הבא לכתב חצוי",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2">
        2. לחץ על
        <ToggleButton value="strike" size="small" sx={{ m: 1 }}>
          <FormatStrikethroughIcon />
        </ToggleButton>
        
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 5) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.hasFormat("strikethrough")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: 'הפוך את הטקסט הבא לכתב תחתי',
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2">
        2. לחץ על
        <ToggleButton value="subscript" size="small" sx={{ m: 1 }}>
          <SubscriptIcon />
        </ToggleButton>
        
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node) => {
          if (node.getTextContent() === "subscript") {
            if ((node as TextNode).hasFormat("subscript")) result = true;
          }
        });
      });
      return result;
    }
  },
  {
    name: 'הפוך את הטקסט הבא לכתב עילי',
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2">
        2. לחץ על
        <ToggleButton value="superscript" size="small" sx={{ m: 1 }}>
          <SuperscriptIcon />
        </ToggleButton>
        
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node) => {
          if (node.getTextContent() === "superscript") {
            if ((node as TextNode).hasFormat("superscript")) result = true;
          }
        });
      });
      return result;
    }
  },
  {
    name: "שנה את צבע הטקסט",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <ToggleButton value="text" size="small" sx={{ m: 1 }}>
          <FormatColorFillIcon />
        </ToggleButton>
        
      </Typography>
      <Typography variant="subtitle2">
        3. בחר צבע טקסט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 8) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.getStyle().includes("color")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "שנה את הרקע של הטקסט",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <ToggleButton value="background" size="small" sx={{ m: 1 }}>
          <FormatColorFillIcon />
        </ToggleButton>
        
      </Typography>
      <Typography variant="subtitle2">
        3. בחר צבע רקע לטקסט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 9) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.getStyle().includes("background-color")) result = true;
          }
        });
      })
      return result;
    }
  },
];

const task2Checkpoints = [
  {
    name: "שנה את גודל גופן הטקסט ל-20 פיקסלים",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <Select size='small' sx={{ width: 68, mx: 1 }} value={15} readOnly>
          <MenuItem key={15} value={15}>15</MenuItem>
        </Select>
        בתפריט סרגל הכלים
      </Typography>
      <Typography variant="subtitle2">
        3. בחר 20 פיקסלים
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 1) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.getStyle().includes("font-size: 20px")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "שנה את הגופן של הטקסט ל- katex",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <Select size='small' sx={{ width: 68, mx: 1 }} value='Roboto' readOnly>
          <MenuItem key='Roboto' value='Roboto'>Roboto</MenuItem>
        </Select>
        בתפריט סרגל הכלים
      </Typography>
      <Typography variant="subtitle2">
        3. בחר KaTex מסרגל הכלים
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 2) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.getStyle().includes("font-family: KaTeX_Main")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "שנה את גופן הטקסט ל-virgil",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <Select size='small' sx={{ width: 68, mx: 1 }} value='Roboto' readOnly>
          <MenuItem key='Roboto' value='Roboto'>Roboto</MenuItem>
        </Select>
        בתפריט סרגל הכלים
      </Typography>
      <Typography variant="subtitle2">
        3. בחר ב- Virgil
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 3) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.getStyle().includes("font-family: Virgil")) result = true;
          }
        });
      })
      return result;
    }
  },
];

const task3Checkpoints = [
  {
    name: "הפוך את הטקסט לכותרת בגודל 3",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על הטקסט
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <Select value="paragraph" size='small' readOnly sx={{
          mx: 1,
          '& .MuiSelect-select': { display: 'flex', alignItems: 'center', py: 0.5 },
          '& .MuiListItemIcon-root': { mr: { sm: 0.5 }, minWidth: 20 },
          '& .MuiListItemText-root': { display: { xs: "none", sm: "flex" } }
        }}>
          <MenuItem value='paragraph'>
            <ListItemIcon>
              <ViewHeadlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>פסקה</ListItemText>
          </MenuItem>
        </Select> בתפריט סרגל הכלים
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <H3Icon /> כותרת 3 מהתפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 1) {
            const target = node.getParent()?.getNextSibling();
            if (target?.__tag == "h3") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הפוך את הטקסט לרשימת תבליטים",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <Select value="paragraph" size='small' readOnly sx={{
          mx: 1,
          '& .MuiSelect-select': { display: 'flex', alignItems: 'center', py: 0.5 },
          '& .MuiListItemIcon-root': { mr: { sm: 0.5 }, minWidth: 20 },
          '& .MuiListItemText-root': { display: { xs: "none", sm: "flex" } }
        }}>
          <MenuItem value='paragraph'>
            <ListItemIcon>
              <ViewHeadlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Normal</ListItemText>
          </MenuItem>
        </Select> בתפריט סרגל הכלים
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <FormatListBulletedIcon sx={{ verticalAlign: "middle" }} /> רשימת תבליטים מהתפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 2) {
            const target = node.getParent()?.getNextSibling();
            if (target?.__tag == "ul") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הפוך את הטקסט הבא לציטוט",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על הטקסט
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <Select value="paragraph" size='small' readOnly sx={{
          mx: 1,
          '& .MuiSelect-select': { display: 'flex', alignItems: 'center', py: 0.5 },
          '& .MuiListItemIcon-root': { mr: { sm: 0.5 }, minWidth: 20 },
          '& .MuiListItemText-root': { display: { xs: "none", sm: "flex" } }
        }}>
          <MenuItem value='paragraph'>
            <ListItemIcon>
              <ViewHeadlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>רגיל</ListItemText>
          </MenuItem>
        </Select> בתפריט סרגל הכלים
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <FormatQuoteIcon sx={{ verticalAlign: "middle" }} /> ציטוט מהתפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 3) {
            const target = node.getParent()?.getNextSibling();
            if (target?.__type == "quote") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הפוך את טקסט הבא לקוד",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. סמן את הטקסט
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <Select value="paragraph" size='small' readOnly sx={{
          mx: 1,
          '& .MuiSelect-select': { display: 'flex', alignItems: 'center', py: 0.5 },
          '& .MuiListItemIcon-root': { mr: { sm: 0.5 }, minWidth: 20 },
          '& .MuiListItemText-root': { display: { xs: "none", sm: "flex" } }
        }}>
          <MenuItem value='paragraph'>
            <ListItemIcon>
              <ViewHeadlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Normal</ListItemText>
          </MenuItem>
        </Select> בתפריט סרגל הכלים
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <CodeIcon sx={{ verticalAlign: "middle" }} /> קוד מתוך התפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 4) {
            const target = node.getParent()?.getNextSibling();
            if (target?.__type == "code") result = true;
          }
        });
      })
      return result;
    }
  }
];

const task4Checkpoints = [
  {
    name: "מרכז את הטקסט",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על הטקסט
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <IconButton aria-label='Align Text'>
          <FormatAlignLeftIcon />
        </IconButton> בתפריט סרגל הכלים
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <FormatAlignCenterIcon sx={{ verticalAlign: "middle" }} /> מרכז מהתפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 1) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            if (paragraphNode.__format === 2) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "ישר לימין את הטקסט",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על הטקסט
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <IconButton aria-label='Align Text'>
          <FormatAlignLeftIcon />
        </IconButton> בתפריט סרגל הכלים
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <FormatAlignRightIcon sx={{ verticalAlign: "middle" }} /> ישר לימין מהתפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 2) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            if (paragraphNode.__format === 3) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הגדל את כניסת הטקסט ב-1",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על הטקסט
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <IconButton aria-label='Align Text'>
          <FormatAlignLeftIcon />
        </IconButton> בתפריט סרגל הכלים
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <FormatIndentIncreaseIcon sx={{ verticalAlign: "middle" }} /> הגדל כניסה מהתפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 3) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            if (paragraphNode.getIndent() === 1) result = true;
          }
        });
      })
      return result;
    }
  }
];

const task5Checkpoints = [
  {
    name: "הוסף חוצץ",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <IconButton aria-label='Insert'>
          <AddIcon />
        </IconButton> 
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <HorizontalRuleIcon sx={{ verticalAlign: "middle" }} /> חוצץ מהתפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 1) {
            const target = node.getParent()?.getNextSibling()?.getNextSibling();
            if (target?.__type === "horizontalrule") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף בלוק מתמטיקה",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <IconButton aria-label='Insert'>
          <AddIcon />
        </IconButton> 
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <FunctionsIcon sx={{ verticalAlign: "middle" }} /> מתמטיקה מהתפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 2) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "math" && target.__value === "x^2+5x+6=0") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף גרף",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <IconButton aria-label='Insert'>
          <AddIcon />
        </IconButton> 
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <GraphIcon /> גרף מהתפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 3) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "graph") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף קשקוש",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <IconButton aria-label='Insert'>
          <AddIcon />
        </IconButton> 
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <BrushIcon sx={{ verticalAlign: "middle" }} /> קשקוש מהתפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 4) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "sketch") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף תמונה",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <IconButton aria-label='Insert'>
          <AddIcon />
        </IconButton> 
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <ImageIcon sx={{ verticalAlign: "middle" }} /> תמונה מהתפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 5) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "image") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף טבלה",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <IconButton aria-label='Insert'>
          <AddIcon />
        </IconButton> 
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <TableIcon sx={{ verticalAlign: "middle" }} /> טבלה מהתפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 6) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getNextSibling();
            if (target?.__type === "table") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף פתק",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על הטקסט מתחת
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ על
        <IconButton aria-label='Insert'>
          <AddIcon />
        </IconButton> 
      </Typography>
      <Typography variant="subtitle2">
        3. בחר <StickyNote2Icon sx={{ verticalAlign: "middle" }} /> פתק מהתפריט
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 7) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const children = paragraphNode.getChildren();
            const containsSticky = children.some((child: any) => child.__type === "sticky");
            if (containsSticky) result = true;
          }
        });
      })
      return result;
    }
  }
];

const task6Checkpoints = [
  {
    name: "הוסף כותרת בגודל 2",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        ## זאת כותרת שנייה
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 1) {
            const target = node.getParent()?.getNextSibling();
            if (target?.__tag == "h2") result = true;
          }
        });
      })
      return result;
    }
  },

  {
    name: "הוסף טקסט מודגש",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        **טקסט מודגש**
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 2) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.hasFormat("bold")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף טקסט נטוי",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        *טקסט נטוי*
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 3) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.hasFormat("italic")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף בלוק ציטוט",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {'> זה בלוק ציטוט'}
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 4) {
            const target = node.getParent()?.getNextSibling();
            if (target?.__type == "quote") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף רשימת תבליטים",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {'- זה רשימת תבליטים'}
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 5) {
            const target = node.getParent()?.getNextSibling();
            if (target?.__tag == "ul") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף קוד בתוך השורה",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {'`זה קוד בתוך השורה`'}
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 6) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.hasFormat("code")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף בלוק קוד",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {'```'}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ רווח
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 7) {
            const target = node.getParent()?.getNextSibling();
            if (target?.__type == "code") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף קו חוצץ",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {'---'}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ רווח
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 8) {
            const target = node.getParent()?.getNextSibling();
            if (target?.__type === "horizontalrule") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף קישור",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {'[זה לינק](https://www.example.com)'}
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 9) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "link") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף תמונה",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {'![תמונה](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_WXU_tgAdLUNaWXImw9Z1ezPGz9KOaH5860wiA50OwtgNMA3Q5KwiagZ9nSnrXJCJ8p8)'}
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 10) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "image") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף סמיילי '😄'",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {':smile'}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. בחר אמוגי מהרשימה
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 11) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target && target.getTextContent() === '😄') result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף בלוק מתמטיקה",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {'$$'}
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 12) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "math") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף בלוק מתמטיקה עם הערך y=x^2 ",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {'$y=x^2$'}
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 13) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "math" && target.__value === "y=x^2") result = true;
          }
        });
      })
      return result;
    }
  },
];

const task7Checkpoints = [
  {
    name: "הוספת גרף",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {'/גרף'}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ אנטר
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        3. כתוב פונקציה ואז לחץ הוספה
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 1) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "graph") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף קשקוש",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {'/קשקוש'}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ אנטר
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        3. צייר משהו ולחץ הוסף
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 2) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "sketch") result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוספה טבלה 4על4",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {'/4x4'}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. לחץ אנטר
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 3) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getNextSibling();
            if (target?.__type === "table" && target.__size === 4) result = true;
          }
        });
      })
      return result;
    }
  },
];

const task8Checkpoints = [
  {
    name: "הוספת מטריצה",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1.  לחץ על השורה הריקה וכתוב $$
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. {"כתוב 'מטריצה'"} , או לחץ לחצן ימני והוסף מהתפריט שנפתח
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        3. הקשר אנטר
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 1) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "math" && target.__value.includes("Bmatrix")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוסף חלוק למקרים",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
        1. לחץ על השורה הריקה וכתוב $$
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        2. {"כתוב 'אפשרויות'"}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        3. לחץ אנטר
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 2) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "math" && target.__value.includes("cases")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוספת סכום ",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
      1. לחץ על השורה הריקה וכתוב $$
      </Typography>
          <Typography variant="subtitle2" gutterBottom>
       2. {"כתוב 'סכום'"}
      </Typography>
       <Typography variant="subtitle2" gutterBottom>
         3. לחץ אנטר
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 3) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "math" && target.__value.includes("sum")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוספת שורש ",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
      1. לחץ על השורה הריקה וכתוב $$
      </Typography>
          <Typography variant="subtitle2" gutterBottom>
       2. {"כתוב 'שורש'"}
      </Typography>
       <Typography variant="subtitle2" gutterBottom>
         3. לחץ אנטר
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 4) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "math" && target.__value.includes("sqrt")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוספת אינטגרל ",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
      1. לחץ על השורה הריקה וכתוב $$
      </Typography>
          <Typography variant="subtitle2" gutterBottom>
       2. {"כתוב 'אינטגרל'"}
      </Typography>
       <Typography variant="subtitle2" gutterBottom>
         3. לחץ אנטר
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 5) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "math" && target.__value.includes("int")) result = true;
          }
        });
      })
      return result;
    }
  },
  {
    name: "הוספת גבול ",
    steps: <>
      <Typography variant="subtitle2" gutterBottom>
      1. לחץ על השורה הריקה וכתוב $$
      </Typography>
          <Typography variant="subtitle2" gutterBottom>
       2. {"כתוב 'גבול'"}
      </Typography>
       <Typography variant="subtitle2" gutterBottom>
         3. לחץ אנטר
      </Typography>
    </>,
    check: (editorState?: EditorState) => {
      let result = false;
      if (!editorState) return result;
      editorState.read(() => {
        editorState._nodeMap.forEach((node:any) => {
          if (node.__value === 6) {
            const paragraphNode = node.getParent()?.getNextSibling();
            if (!paragraphNode) return result;
            const target = paragraphNode.getFirstChild();
            if (target?.__type === "math" && target.__value.includes("lim")) result = true;
          }
        });
      })
      return result;
    }
  },
];

const tasks = [
  Task1 as unknown,
  Task2 as unknown,
  Task3 as unknown,
  Task4 as unknown,
  Task5 as unknown,
  Task6 as unknown,
  Task7 as unknown,
  Task8 as unknown,
] as EditorDocument[];

const checkpoints = [
  task1Checkpoints,
  task2Checkpoints,
  task3Checkpoints,
  task4Checkpoints,
  task5Checkpoints,
  task6Checkpoints,
  task7Checkpoints,
  task8Checkpoints,
];

export { tasks, checkpoints }