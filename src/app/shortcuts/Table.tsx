import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/layouts/components/ui/Table";

const ShortcutsTable = ({ shortcuts }: any) => {
  return (
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
          <TableHead className="border-x border-gray-800 dark:border-gray-200">
            הקיצור באנגלית
          </TableHead>
          <TableHead>הקיצור בעברית</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shortcuts.map((obj: any, index: number) => (
          <TableRow
            key={index}
            className={`${
              index % 2 === 0 ? "bg-gray-200 dark:bg-zinc-700" : ""
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
              {obj.latexShortcut}
            </TableCell>
            <TableCell className="border-l border-gray-800 dark:border-gray-200">
              {obj.engShortcut}
            </TableCell>
            <TableCell>{obj.hebShortcut}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ShortcutsTable;
