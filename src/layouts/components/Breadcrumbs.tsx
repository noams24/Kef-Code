"use client";

import { humanize } from "@/lib/utils/textConverter";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dictionary from "@/content/dictionary.json"

const Breadcrumbs = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((x) => x);
  let parts = [
    {
      label: "בית",
      href: "/",
      "aria-label": pathname === "/" ? "page" : undefined,
    },
  ];

  paths.forEach((label: string, i: number) => {
    const href = `/${paths.slice(0, i + 1).join("/")}`;
    {/* @ts-ignore */}
    const translatedLabel = dictionary[decodeURIComponent(label)]
    let newLabel = label
    if (translatedLabel !== undefined){
      newLabel = translatedLabel
    }
    label !== "page" &&
      parts.push({
        label: newLabel.replaceAll('-',' '),
        // label: humanize(label.replace(/[-_]/g, " ")) || "",
        href,
        "aria-label": pathname === href ? "page" : undefined,
      });
  });

  return (
    <nav dir="rtl" aria-label="Breadcrumb" className={className}>
      <ol className="inline-flex items-center " role="list">
        {parts.map(({ label, ...attrs }, index) => (
          <li className="mx-1 capitalize" role="listitem" key={index}>
            {index > 0 && <span className="inlin-block ml-1.5">/</span>}
            {index !== parts.length - 1 ? (
              <Link
                className="text-primary dark:text-darkmode-primary truncate"
                {...attrs}
              >
                  {label}
              </Link>
            ) : (
              <span className="text-light dark:text-darkmode-light font-arial font-bold">
                {decodeURIComponent(label)}
                {/* {label} */}
                {/* @ts-ignore */}
                {/* {dictionary[decodeURIComponent(label)]} */}
                {/* {dictionary[decodeURIComponent(label).toLowerCase]} */}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
