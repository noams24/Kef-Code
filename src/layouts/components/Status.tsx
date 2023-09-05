
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
const Status = () => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="סטטוס" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel dir="rtl">הגדר סטטוס</SelectLabel>
            <SelectItem dir="rtl" value="START">
              עוד לא התחלתי
            </SelectItem>
            <SelectItem dir="rtl" value="ONGOING">
              בתהליך
            </SelectItem>
            <SelectItem dir="rtl" value="STUCK">
              תקוע
            </SelectItem>
            <SelectItem dir="rtl" value="FINISH">
              סיימתי
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    // <QuestionMarkCircledIcon width={25} height={25}/>
  );
};

export default Status;
