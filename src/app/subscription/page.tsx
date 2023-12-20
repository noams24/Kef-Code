import Faqs from "@/components/Faqs";

export const metadata = {
  title: "פרימיום",
  description: "פרימיום",
};

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

const Subscription = () => {
  return (
    <div dir="rtl" className="flex min-h-screen pt-[30px] px-[40px]">
      <div className="min-w-full">
        <div className="mt-[20px] grid grid-cols-3 gap-[20px]">
          <div
            key="1"
            className="w-full bg-[#fff] dark:bg-darkmode-theme-light rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
          >
            <div className="pt-[15px] px-[25px] pb-[25px]">
              <div className="flex justify-end">
                <div className="bg-[#F6F6F7] dark:bg-blue-800 rounded-[20px] flex justify-center align-center px-[12px]">
                  <p className="text-[12px] leading-[28px] font-bold">
                    קלאסי לתקופת מבחנים
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[19px] leading-[24px] font-bold">
                  מנוי חודשי
                </p>
                <div className="flex justify-start">
                  <p className="text-[33px] leading-[63px] font-bold">₪99</p>
                  <p className="text-[#717F87] dark:text-slate-400 text-[20px] leading-[63px] font-bold pr-2">
                    לחודש
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[#717F87] dark:text-slate-400 text-[18px] leading-[28px] font-medium">
                  התוכנית הטובה ביותר למנויים לטווח קצר
                </p>
              </div>
              <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold mt-5">
                הירשם
              </button>
            </div>
          </div>
          <div
            key="2"
            className="w-full bg-[#fff] dark:bg-darkmode-theme-light  rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
          >
            <div className="pt-[15px] px-[25px] pb-[25px]">
              <div className="flex justify-end">
                <div className="bg-[#F6F6F7] dark:bg-blue-800 rounded-[20px] flex justify-center align-center px-[12px]">
                  <p className="text-[12px] leading-[28px] font-bold">
                    הכי פופולרי
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[19px] leading-[24px] font-bold">
                  מנוי שנתי
                </p>
                <p className="text-[33px] leading-[63px] font-bold">₪399</p>
              </div>

              <div>
                <p className="text-[#717F87] dark:text-slate-400 text-[18px] leading-[28px] font-medium">
                  בסך הכל 33 שקלים בחודש, התוכנית תחסוך לכם כ-60% לעומת המנוי
                  החודשי
                </p>
              </div>
              <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold mt-5">
                הירשם
              </button>
            </div>
          </div>

          <div
            key="3"
            className="w-full bg-[#fff] dark:bg-darkmode-theme-light   rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
          >
            <div className="pt-[15px] px-[25px] pb-[25px]">
              <div className="flex justify-end">
                <div className="bg-[#F6F6F7] dark:bg-blue-800 rounded-[20px] flex justify-center align-center px-[12px]">
                  <p className="text-[12px] leading-[28px] font-bold">
                    הכי משתלם
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[19px] leading-[24px] font-bold">
                  מנוי לכל החיים
                </p>
                <p className="text-[33px] leading-[63px] font-bold">₪899</p>
              </div>

              <div>
                <p className="text-[#717F87] dark:text-slate-400 text-[18px] leading-[28px] font-medium">
                  תוכנית טובה לטווח ארוך
                </p>
              </div>
              <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold mt-5">
                הירשם
              </button>
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
