"use client";

import Faqs from "@/components/Faqs";
import { useState } from "react";
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@/components/ui/Button2";
import { X } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // Button,
  useDisclosure,
  // Checkbox,
} from "@nextui-org/react";
import Link from "next/link";

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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Subscription = () => {
  // const [open, setOpen] = useState(false);
  const [modalNumber, setModalNumber] = useState(1);
  const [checked, setChecked] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => {
  //   setOpen(false), setModalNumber(1);
  // };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // const handleCheckBox = (e: any) => {
  //   console.log(e);
  // };

  // const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // console.log(checked);

  return (
    <div dir="rtl" className="flex min-h-screen pt-[30px] px-[40px]">
      <Modal
        dir="rtl"
        size={"lg"}
        isDismissable={false}
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        hideCloseButton={true}
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-black dark:border-white bg-white dark:bg-neutral-700  rounded-lg shadow-lg",
          header: "border-b-[1px]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                תשלום
                <div className="absolute top-4 left-4">
                  {/* Close Modal Button */}
                  <Button
                    variant="subtle"
                    className="h-6 w-6 p-0 rounded-md dark:bg-zinc-700 dark:text-white"
                    onClick={() => {
                      onClose(), setChecked(false), setModalNumber(1);
                    }}
                  >
                    <X aria-label="close modal" className="h-6 w-6" />
                  </Button>
                </div>
              </ModalHeader>
              {modalNumber === 1 ? (
                <div>
                  <ModalBody>
                    <h4 className="flex justify-center">הסכם</h4>
                    <p className="font-bold">מדיניות מנוי</p>
                    <p className="text-sm">
                      על ידי התחלת מנוי הפרימיום, אתה מסכים לתנאי השירות ולהצהרת
                      הפרטיות שלנו. אתה יכול לבטל בכל עת במהלך המנוי שלך. כדי
                      לבטל, עבור אל חיוב ולחץ על ביטול. לאחר ביטול, המנוי שלך
                      יישאר פעיל עד סוף תקופת החיוב. כיף קוד תחדש אוטומטית את
                      המנוי שלך בתום תקופת החיוב שלך ותחייב את אמצעי התשלום שלך
                      על בסיס תקופה עד שתבטל. אין החזרים עבור סכומים כלשהם
                      שחויבו בגין ביטול מנוי. כיף קוד עשויה למנוע ממך גישה לכל
                      או לחלק מהשירות של כיף קוד או לסיים את חשבונך עם או בלי
                      הודעה מוקדמת אם אתה עוסק בהתנהגות או פעילויות כלשהן ש-כיף
                      קוד קובעת, לפי שיקול דעתה הבלעדי, מפרות את תנאי השירות של
                      כיף קוד או את הכללים של כיף קוד. אחרת לא הולם. ללא הגבלה,
                      כיף קוד עשויה למנוע ממך גישה לשירות כיף קוד או לסיים את
                      חשבון כיף קוד שלך, מבלי לספק כל החזר או החזר חלקי. לכל
                      שאלה אחרת בנושא חיוב, אנא צור קשר עם billing@kef-code.com.
                    </p>
                  </ModalBody>
                  <ModalFooter className="flex justify-start">
                    <Checkbox onClick={() => setChecked(!checked)} />
                    <p className="pt-3 text-sm">אני מאשר להסכם זה</p>{" "}
                    <Link
                      className="pt-3 text-sm text-blue-500 hover:underline"
                      target="_blank"
                      href="/privacy"
                    >
                      ולתנאי השימוש{" "}
                    </Link>
                    <Button
                      onClick={() => setModalNumber(2)}
                      disabled={!checked}
                      className="mr-24"
                    >
                      המשך
                    </Button>
                  </ModalFooter>
                </div>
              ) : (
                <div>
                  <ModalBody>
                    <p className="text-sm">
                      פרטי תשלום...
                    </p>
                  </ModalBody>
                </div>
              )}
            </>
          )}
        </ModalContent>
      </Modal>

      {/* <Modal
      dir="rtl"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          modalNumber === 1 ?
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            תנאי השימוש
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            אני מאשר לתנאי השימוש
          </Typography>
          <div className="flex justify-between">
          <Checkbox onClick ={() => {setChecked(!checked)}} {...label} />
          <Button onClick={() => {setModalNumber(2)}}>אישור</Button>
          </div>
        </Box>
        :
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          צקאווט
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          תשלום
        </Typography>
        <Button onClick={() => {setModalNumber(2)}}>שלם</Button>
      </Box>
         }
      </Modal> */}

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
              <button
                onClick={onOpen}
                className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold mt-5"
              >
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
              <button
                onClick={onOpen}
                className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold mt-5"
              >
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
              <button
                onClick={onOpen}
                className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold mt-5"
              >
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
