import SolutionCard from './SolutionCard';
import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select"

interface SolutionSectionProps {
    problemId: String
}

const SolutionsSection: React.FC<SolutionSectionProps> = ({ problemId }) => {

    return (
        <>
        <div className="mt-3 dark:text-white text-center" dir="rtl">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="לייקים" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>מיין לפי</SelectLabel>
                        <SelectItem value="likes">לייקים</SelectItem>
                        <SelectItem value="recent">נוסף לאחרונה</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            </div>
            <SolutionCard author="ישראל ישראלי" date="2023-08-14" likes={42} comments={7} />
            <SolutionCard author="ג'ון סינה" date="2023-08-20" likes={9} comments={5} />
            <SolutionCard author="משתמש1234" date="2023-08-20" likes={4} comments={2} />
        </>
    );
};

export default SolutionsSection;

