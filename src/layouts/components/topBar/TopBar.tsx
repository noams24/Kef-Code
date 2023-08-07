"use client";

import Breadcrumbs from "../Breadcrumbs";
import Timer from "./Timer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import FullScreen from "./FullScreen";


const TopBar = ({ title }: { title: string }) => {

    return (
        <section>
            <div className="text-center mx-auto rounded px-12">
                <div className="flex justify-between gap-2 rounded bg-gradient-to-b from-body to-theme-light px-8  dark:from-darkmode-body dark:to-darkmode-theme-light">
                    <div className='flex items-center justify-between rounded h-10 w-24 cursor-pointer '>
                        <div className=" hover:bg-gray-300 hover:border-white">
                            <FaChevronLeft />
                        </div>
                        <div className="rounded hover:bg-gray-300 hover:border-white">
                            <BsList />
                        </div>
                        <div className="rounded hover:bg-gray-300 hover:border-white">
                            <FaChevronRight />
                        </div>
                    </div>
                    <Breadcrumbs/>
                    <div className="flex items-center gap-4">
                        <Timer />
                        <FullScreen />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopBar;
