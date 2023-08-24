"use client";

import { BsList } from "react-icons/bs";
import { BiSolidChevronLeftCircle, BiSolidChevronRightCircle } from 'react-icons/bi'

import Breadcrumbs from "../Breadcrumbs";
import Timer from "./Timer";
import FullScreen from "./FullScreen";


const TopBar = ({ title }: { title: string }) => {

    return (
        <section>
            <div className="text-center mx-auto rounded px-12">
                <div className="flex justify-between gap-2 rounded bg-gradient-to-b from-body to-theme-light px-8  dark:from-darkmode-body dark:to-darkmode-theme-light">
                    <div className='flex items-center justify-between h-6 w-24 cursor-pointer'>
                        <BiSolidChevronLeftCircle size={23} />
                        <div className="rounded hover:bg-gray-400 bg-gray-400">
                            <BsList />
                        </div>
                        <BiSolidChevronRightCircle size={23} />
                    </div>
                    <Breadcrumbs />
                    <div className="container-right-top-bar">
                        <Timer />
                        <FullScreen />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopBar;
