"use client"

import { usePathname } from "next/navigation";

export default function getPath(){

const pathname = usePathname();
const paths = pathname.split("/").filter((x) => x);
return paths
}
