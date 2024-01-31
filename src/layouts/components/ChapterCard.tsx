"use client";
import Link from "next/link";
import Pi from "./Pi";
import { motion } from "framer-motion";
import React from "react";

interface ChapterCardProps {
  title: string;
  link: string;
  course: string;
  complete?: string;
  index: number;
  numberOfQuestions: number;
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  title,
  link,
  course,
  complete,
  index,
  numberOfQuestions,
}) => {
  const heading = `פרק ${index + 1}: ${title}`;

  return (
    <motion.div
      whileHover="whileHover"
      className="chapter-card-container hover:chapter-card-container-hover hover:dark:chapter-card-container-hover-dark hover:border hover:border-black dark:hover:border-white"
    >
      <Link
        dir="rtl"
        href={`/courses/${course}/${link}`}
        className="flex flex-grow text-zinc-700 dark:text-zinc-300 hover:text-black hover:dark:text-white"
      >
        {complete !== "-1" && complete ? (
          <div className="w-14 pl-4 mr-2 mt-2">
            <Pi completed={complete} />
          </div>
        ) : (
          <div className="pr-8" />
        )}
        <div>
          <motion.span
            dir="rtl"
            variants={{
              initial: { x: 0 },
              whileHover: { x: -16 },
            }}
            transition={{
              type: "spring",
              staggerChildren: 0.075,
              delayChildren: 0.25,
            }}
            className="relative z-10 block text-lg font-semibold transition-colors duration-500"
          >
            {heading.split("").map((l, i) => (
              <motion.span
                variants={{
                  initial: { x: 0 },
                  whileHover: { x: 16 },
                }}
                transition={{ type: "spring" }}
                className="inline-block whitespace-pre"
                key={i}
              >
                {l}
              </motion.span>
            ))}
          </motion.span>
          <div className="text-right">{`מספר שאלות: ${numberOfQuestions}`}</div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ChapterCard;
