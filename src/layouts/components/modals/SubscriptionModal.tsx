"use client";

import { useState } from "react";
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

interface Props {
  isOpen: any;
  onOpenChange: any;
  session: any;
}

const SubscriptionModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  session,
}) => {
  const [modalNumber, setModalNumber] = useState(1);
  const [checked, setChecked] = useState(false);

  return (
    <>
      {!session ? (
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
                ) : (
                    <ModalBody>
                      <div className="flex justify-between">
                      <Card>
                        <CardHeader>
                          <CardTitle>אמצעי תשלום</CardTitle>
                          <CardDescription>הוספת אמצעי תשלום</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                          <RadioGroup
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
                                Card
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
                                Paypal
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
                                Apple
                              </Label>
                            </div>
                          </RadioGroup>
                          <div className="grid gap-2">
                            <Label htmlFor="name">שם בעל כרטיס האשראי</Label>
                            <Input id="name" placeholder="First Last" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="number">מספר כרטיס אשראי</Label>
                            <Input id="number" placeholder="" />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="month">תוקף</Label>
                              <Select>
                                <SelectTrigger id="month">
                                  <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">January</SelectItem>
                                  <SelectItem value="2">February</SelectItem>
                                  <SelectItem value="3">March</SelectItem>
                                  <SelectItem value="4">April</SelectItem>
                                  <SelectItem value="5">May</SelectItem>
                                  <SelectItem value="6">June</SelectItem>
                                  <SelectItem value="7">July</SelectItem>
                                  <SelectItem value="8">August</SelectItem>
                                  <SelectItem value="9">September</SelectItem>
                                  <SelectItem value="10">October</SelectItem>
                                  <SelectItem value="11">November</SelectItem>
                                  <SelectItem value="12">December</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="year">שנה</Label>
                              <Select>
                                <SelectTrigger id="year">
                                  <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 10 }, (_, i) => (
                                    <SelectItem
                                      key={i}
                                      value={`${new Date().getFullYear() + i}`}
                                    >
                                      {new Date().getFullYear() + i}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="cvc">ספרות בגב הכרטיס</Label>
                              <Input id="cvc" placeholder="CVC" />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">תשלום</Button>
                        </CardFooter>
                      </Card>
                      <div>
                          <h3>מנוי חודשי</h3>
                          <h5>₪50 לתשלום</h5>
                        </div>
                      </div>
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
