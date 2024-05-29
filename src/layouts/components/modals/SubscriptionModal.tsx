"use client";

import { useEffect, useState, useContext } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@/components/ui/Button2";
import { X } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Link from "next/link";
import UserAuthForm from "../UserAuthForm";

import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/Radio-Group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select2";

import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useMutation } from "@tanstack/react-query";
import { handlePayment } from "@/lib/actions/action";
import { QueryContext } from "@/partials/ChildrenProviders";

interface Props {
  isOpen: any;
  onOpenChange: any;
  session: any;
  subscription: String;
}

const SubscriptionModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  session,
  subscription,
}) => {
  const monthlyPrice = 100;
  const yearlyPrice = 600;

  // const coupons = {
  //   'כיף': 10,
  //   "20": 20,
  // };
  const hardCodedDiscount = 0.9;

  const [modalNumber, setModalNumber] = useState(1);
  const [checked, setChecked] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [couponCode, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [flag, setFlag] = useState<boolean>(false); //can apply discount only once
  const [isSnackBar, setSnackBar] = useState<boolean>(false);

  const queryClient = useContext(QueryContext);
  
  const applyCoupon = () => {
    if (couponCode === "10" && !flag) {
      setFlag(true);
      setDiscount(amount * hardCodedDiscount);
      setSnackBar(true);
      setTimeout(() => {
        setSnackBar(false);
      }, 5000);
    }
  };

  useEffect(() => {
    if (subscription === "month") {
      setAmount(monthlyPrice);
    } else {
      setAmount(yearlyPrice);
    }
  }, [subscription]);

  const { mutate: onSubmit, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      const payload = { values, subscription, amount, discount };
      await handlePayment(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      setModalNumber(3);
    },
  });

  return (
    <>
      <Snackbar
        open={isSnackBar}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          הקופון הופעל בהצלחה!
        </Alert>
      </Snackbar>
      {!session ? (
        <Modal
          dir="rtl"
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
                <ModalBody>
                  <Button
                    variant="subtle"
                    className="h-6 w-6 p-0 rounded-md dark:bg-zinc-700 dark:text-white"
                    onClick={() => {
                      onClose(), setChecked(false), setModalNumber(1);
                    }}
                  >
                    <X aria-label="close modal" className="h-6 w-6" />
                  </Button>
                  <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                    <div className="flex flex-col space-y-2 text-center">
                      <h1 className="text-2xl font-semibold tracking-tight">
                        ברוך הבא
                      </h1>
                      <p className="text-sm max-w-xs mx-auto">
                        בהתחברות לאתר אני מאשר את{" "}
                        <Link
                          className="text-blue-500 hover:underline"
                          target="_blank"
                          href="/privacy"
                        >
                          תנאי השימוש
                        </Link>
                      </p>
                    </div>
                    <UserAuthForm />
                  </div>
                </ModalBody>

                <ModalFooter />
              </>
            )}
          </ModalContent>
        </Modal>
      ) : (
        <Modal
          dir="rtl"
          size={"lg"}
          isDismissable={false}
          backdrop="opaque"
          isOpen={isOpen}
          onClose={() => {
            setFlag(false), setDiscount(0);
          }}
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
                        על ידי התחלת מנוי הפרימיום, אתה מסכים לתנאי השירות
                        ולהצהרת הפרטיות שלנו. אתה יכול לבטל בכל עת במהלך המנוי
                        שלך. כדי לבטל, עבור אל חיוב ולחץ על ביטול. לאחר ביטול,
                        המנוי שלך יישאר פעיל עד סוף תקופת החיוב. כיף קוד תחדש
                        אוטומטית את המנוי שלך בתום תקופת החיוב שלך ותחייב את
                        אמצעי התשלום שלך על בסיס תקופה עד שתבטל. אין החזרים עבור
                        סכומים כלשהם שחויבו בגין ביטול מנוי. כיף קוד עשויה למנוע
                        ממך גישה לכל או לחלק מהשירות של כיף קוד או לסיים את
                        חשבונך עם או בלי הודעה מוקדמת אם אתה עוסק בהתנהגות או
                        פעילויות כלשהן ש-כיף קוד קובעת, לפי שיקול דעתה הבלעדי,
                        מפרות את תנאי השירות של כיף קוד או את הכללים של כיף קוד.
                        אחרת לא הולם. ללא הגבלה, כיף קוד עשויה למנוע ממך גישה
                        לשירות כיף קוד או לסיים את חשבון כיף קוד שלך, מבלי לספק
                        כל החזר או החזר חלקי. לכל שאלה אחרת בנושא חיוב, אנא צור
                        קשר עם billing@kef-code.com.
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
                ) : modalNumber === 2 ? (
                  <ModalBody>
                    <div className="flex justify-between gap-4">
                      <div className="w-full rounded-lg bg-[#007aff4d] pt-5 px-3 my-2">
                        <div className="rounded bg-white dark:bg-neutral-700 flex justify-start">
                          <div className="pt-2">
                            <WorkspacePremiumIcon />
                          </div>
                          <div className="pl-3">
                            {subscription === "month" ? (
                              <p className="pr-3">מנוי חודשי</p>
                            ) : (
                              <p className="pr-3">מנוי שנתי</p>
                            )}
                            <p className="pr-3 text-sm">₪{amount}</p>
                          </div>
                        </div>
                        <p className="pt-8 text-sm">סיכום הזמנה</p>
                        <div className="flex justify-between">
                          <p className="pt-3 text-zinc-700 dark:text-zinc-300">
                            מחיר מקורי
                          </p>
                          <p className="pt-3">₪{amount}</p>
                        </div>
                        {discount !== 0 ? (
                          <div>
                            <div className="flex justify-between">
                              <p className="pt-3 text-zinc-700 dark:text-zinc-300">
                                הנחה
                              </p>
                              <p className="pt-3">10%</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="pt-3.5 text-sm text-zinc-700 dark:text-zinc-300">
                                מחיר אחרי הנחה
                              </p>
                              <p className="pt-3">₪{discount}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="pt-16" />
                        )}
                        <p>קופון</p>
                        <div className="flex gap-1">
                          <Input
                            id="coupon"
                            type="text"
                            className="font-arial"
                            placeholder="הכנס קוד קופון"
                            onChange={(e) => setCoupon(e.target.value)}
                          />
                          <button
                            onClick={applyCoupon}
                            className="text-xs bg-blue-500 rounded-lg px-1"
                          >
                            הפעל
                          </button>
                        </div>
                        <div className="mt-6 relative">
                          <hr className="border-dashed border-gray-500" />
                          <div className="absolute -left-7 -top-3.5">
                            <div className="h-7 w-7 rounded-full bg-gray-50 dark:bg-neutral-700" />
                          </div>
                          <div className="absolute -right-7 -top-3.5">
                            <div className="h-7 w-7 rounded-full bg-white dark:bg-neutral-700" />
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <p className="text-sm text-zinc-700 dark:text-zinc-300 pt-0.5">
                            {" "}
                            סך הכל לתשלום{" "}
                          </p>
                          <p>₪{discount !== 0 ? discount : amount}</p>
                        </div>
                      </div>
                      <form action={onSubmit}>
                        <Card>
                          <CardHeader>
                            <CardTitle>אמצעי תשלום</CardTitle>
                            {/* <CardDescription>הוספת אמצעי תשלום</CardDescription> */}
                          </CardHeader>
                          <CardContent className="grid gap-6">
                            {/* <RadioGroup
                            defaultValue="card"
                            className="grid grid-cols-3 gap-4"
                          >
                            <div>
                              <RadioGroupItem
                                value="card"
                                id="card"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="card"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  className="mb-3 h-6 w-6"
                                >
                                  <rect
                                    width="20"
                                    height="14"
                                    x="2"
                                    y="5"
                                    rx="2"
                                  />
                                  <path d="M2 10h20" />
                                </svg>
                                אשראי
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="paypal"
                                id="paypal"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="paypal"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <Icons.paypal className="mb-3 h-6 w-6" />
                                פייפאל
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="apple"
                                id="apple"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="apple"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <Icons.apple className="mb-3 h-6 w-6" />
                                אפל
                              </Label>
                            </div>
                          </RadioGroup> */}

                            <div className="grid gap-2">
                              <Label htmlFor="name">
                                שם מלא של בעל כרטיס האשראי
                              </Label>
                              <Input
                                id="name"
                                name="name"
                                placeholder="שם מלא"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="number">מספר כרטיס אשראי</Label>
                              <Input
                                id="number"
                                className="font-arial"
                                placeholder="xxxx-xxxx-xxxx-xxxx"
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="month">חודש</Label>
                                <Select>
                                  <SelectTrigger id="month" name="month">
                                    <SelectValue placeholder="חודש" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">ינואר</SelectItem>
                                    <SelectItem value="2">פברואר</SelectItem>
                                    <SelectItem value="3">מרץ</SelectItem>
                                    <SelectItem value="4">אפריל</SelectItem>
                                    <SelectItem value="5">מאי</SelectItem>
                                    <SelectItem value="6">יוני</SelectItem>
                                    <SelectItem value="7">יולי</SelectItem>
                                    <SelectItem value="8">אוגוסט</SelectItem>
                                    <SelectItem value="9">ספטמבר</SelectItem>
                                    <SelectItem value="10">אוקטובר</SelectItem>
                                    <SelectItem value="11">נובמבר</SelectItem>
                                    <SelectItem value="12">דצמבר</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="year">שנה</Label>
                                <Select>
                                  <SelectTrigger id="year" name="year">
                                    <SelectValue placeholder="שנה" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 15 }, (_, i) => (
                                      <SelectItem
                                        key={i}
                                        value={`${
                                          new Date().getFullYear() + i
                                        }`}
                                      >
                                        {new Date().getFullYear() + i}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="cvc">cvc</Label>
                                <Input id="cvc" name="cvc" placeholder="CVC" />
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button type="submit" className="w-full">
                              תשלום
                            </Button>
                          </CardFooter>
                        </Card>
                      </form>
                    </div>
                  </ModalBody>
                ) : (
                  <ModalBody>
                    <h4 className="flex justify-center">סיום</h4>
                    <p className="text-sm">תודה על ההזמנה!</p>
                  </ModalBody>
                )}
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default SubscriptionModal;
