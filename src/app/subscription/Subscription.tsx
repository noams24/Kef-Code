"use client";

import Faqs from "@/components/Faqs";
import { useDisclosure } from "@nextui-org/react";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

const faqs = [
  {
    question: "1. מה אני אקבל במנוי הפרימיום?",
    answer: (
      <p>
        פתרונות מפורטים למעל 500 שאלות, כולל סרטוני הסבר מעולים ממרצים תותחים
      </p>
    ),
  },
  {
    question: "2. אפשר לראות פתרון לדוגמא?",
    answer: (
      <p>
        כיף קוד מציעה פתרונות רשמיים באיכות גבוהה למבחר גדול מהבעיות שלנו. חלק
        מהפתרונות הללו זמינים רק למנויי פרימיום. אתה יכול לצפות במאמר לדוגמה{" "}
        <span className="underline  text-blue-500">
          <a href="/courses/algebra-1/bases/תלות-לינארית" target="_blank">
            כאן
          </a>
        </span>{" "}
        בחינם. אנחנו כל הזמן מוסיפים פתרונות חדשים.
      </p>
    ),
  },
  {
    question: "3. מה אם אני נרשם ורוצה לבטל?",
    answer: (
      <p>
        אתה יכול לבטל את המנוי שלך{" "}
        <span className="underline  text-blue-500">
          <a href="/settings" target="_blank">
            כאן
          </a>
        </span>{" "}
        בכל עת. לאחר ביטול, המנוי שלך יישאר פעיל עד סוף התקופה הנוכחית.
      </p>
    ),
  },
];

const Subscription = ({ session }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div dir="rtl" className="flex min-h-screen pt-[30px] px-[40px]">
      <SubscriptionModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        session={session}
      />
      <div className="min-w-full">
        <h1 className="flex justify-center pb-10">מנוי פרימיום</h1>
        <div className="mt-[20px] grid grid-cols-2 gap-[20px] mx-20">
          <div
            key="1"
            className="w-full bg-[#fff] dark:bg-darkmode-theme-light rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] "
          >
            <div className="pt-[15px] px-[25px] pb-[25px]">
              <div className="flex justify-end">
                <div className="bg-[#F6F6F7] dark:bg-blue-800 rounded-[20px] flex justify-center align-center px-[12px]">
                  <p className="text-[12px] leading-[28px] font-bold">
                    קלאסי לתקופת מבחנים
                  </p>
                </div>
              </div>
              <div className="flex justify-start pt-4">
                <p className="text-[19px] leading-[24px] font-bold">
                  מנוי חודשי
                </p>
                <p className="pr-3 text-gray-500 text-sm pt-0.5">התשלום מתבצע מדי חודש</p>
              </div>
              <div>
                <p className="pt-3 text-zinc-700 dark:text-zinc-300 text-[18px] leading-[28px] font-medium">
                  התוכנית הטובה ביותר למנויים לטווח קצר
                </p>
              </div>
              <div className="flex justify-start pt-4">
                <p className="text-[28px] leading-[63px] ">₪100</p>
                <p className="text-[#717F87] dark:text-slate-400 text-[20px] leading-[63px] font-bold pr-2">
                  / לחודש
                </p>
              </div>
              <div className="flex justify-center">
              <button
                onClick={onOpen}
                className=" bg-[#006EF5] rounded-[5px] h-10 w-3/4 text-[#fff] text-[14px] leading-[17px] font-semibold "
              >
                הרשמה
              </button>
              </div>
            </div>
          </div>
          <div
            key="1"
            className="w-full bg-[#fff] dark:bg-darkmode-theme-light rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border-4 border-blue-500 "
          >
            <div className="pt-[15px] px-[25px] pb-[25px]">
              <div className="flex justify-end">
                <div className="bg-[#F6F6F7] dark:bg-blue-800 rounded-[20px] flex justify-center align-center px-[12px]">
                  <p className="text-[12px] leading-[28px] font-bold">
                    הכי פופולרי
                  </p>
                </div>
              </div>
              <div className="flex justify-start pt-4">
                <p className="text-[19px] leading-[24px] font-bold">
                  מנוי שנתי
                </p>
                <p className="pr-3 text-gray-500 text-sm pt-0.5">תשלום שנתי (₪600)</p>
              </div>
              <div>
                <p className="pt-3 text-zinc-700 dark:text-zinc-300 text-[18px] leading-[28px] font-medium">
                  תוכנית זו תחסוך לכם כ- 50% לעומת התוכנית החודשית
                </p>
              </div>
              <div className="flex justify-start pt-4">
                <p className="text-[28px] leading-[63px] ">₪50</p>
                <p className="text-[#717F87] dark:text-slate-400 text-[20px] leading-[63px] font-bold pr-2">
                  / לחודש
                </p>
              </div>
              <div className="flex justify-center">
              <button
                onClick={onOpen}
                className=" bg-[#006EF5] rounded-[5px] h-10 w-3/4 text-[#fff] text-[14px] leading-[17px] font-semibold "
              >
                הרשמה
              </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[60px]">
          <h3 className="flex justify-center text-justify">שאלות נפוצות</h3>
        </div>
        <div className="mt-[20px]">
          <Faqs faqs={faqs} />
        </div>
        <div className="mt-[20px]">
          <h3 className="flex justify-center text-justify">
            מה אנשים אומרים על כיף קוד
          </h3>
          <p className="pt-5">TODO</p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
