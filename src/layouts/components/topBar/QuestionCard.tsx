"use client";

import { Card, CardActionArea } from "@mui/material";
import Link from "next/link";
import {
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useGenerationStore } from "@/store/store";


interface Props {
  title: string;
  difficulty: string;
  status: string;
  currentQuestion: string;
  url: string;
}

const QuestionCard: React.FC<Props> = ({
  title,
  difficulty,
  status,
  currentQuestion,
  url,
}) => {
  const { theme } = useTheme();
  const { setSolution } = useGenerationStore();
  return (
    <Link href={url} onClick={() => setSolution(null)}>
      <Card
        sx={{
          border: 1,
          borderColor: "#838383",
          bgcolor: `${
            currentQuestion === title &&
            (theme === "light" ? "#DCDCDC" : "#3A3A3A")
          }`,
        }}
      >
        <CardActionArea sx={{ height: 50 }}>
          <div className="flex justify-between items-center px-4">
            {status === "BEGIN" && (
              <div title="עוד לא התחלתי">
                <CircleIcon className="h-4 w-4" />
              </div>
            )}
            {status === "ONGOING" && (
              <div title="בתהליך">
                <StopwatchIcon />
              </div>
            )}
            {status === "FINISH" && (
              <div title="סיימתי">
                <CheckCircledIcon />
              </div>
            )}
            {status === "STUCK" && (
              <div title="תקוע">
                <QuestionMarkCircledIcon />
              </div>
            )}
            <p dir="rtl" className="font-arial font-bold mx-6">{title}</p>
            <p
              className={`${difficulty === "קל" && "text-green-600"}
            ${difficulty === "בינוני" && "text-yellow-600"}
            ${difficulty === "קשה" && "text-rose-500"}
            `}
            >
              {difficulty}
            </p>
          </div>
        </CardActionArea>
      </Card>
    </Link>
  );
};
export default QuestionCard;
