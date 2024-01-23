import ImageFallback from "@/helpers/ImageFallback";
import Footer from "@/partials/Footer";
import SeoMeta from "@/partials/SeoMeta";
import { FaCheck } from "react-icons/fa/index.js";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  const ul1 = "מגוון שאלות ממבחנים עם פתרונות הלקוחות ";
  const ul2 = "מתמטיקה: אינטרקציה עם ";
  const ul3 = " על מנת לכתוב נוסחאות מתמטיות";
  const ul4 = "גרפים: אינטרקציה עם ";
  const ul5 = " על מנת לשרטט גרפים וצורות";
  const ul6 = "איור: אינטרקציה עם ";
  const ul7 = " על מנת לאייר כמו כתב יד";

  return (
    <>
      <SeoMeta />
      <section className="section pt-7">
        <div className="container">
          <div className="row justify-center">
            <div className="mb-12 text-center lg:col-7">
              <h1 className="mb-6">כיף קוד</h1>
              <p dir="rtl" className="mb-4 text-justify text-lg">
                כיף קוד היא פלטפורמה לתרגול בעיות במדעי המחשב העוזרת להתכונן
                למבחנים בצורה היעילה ביותר.
                <br />
                הפלטפורמה נועדה להיות קלה לשימוש ואינטואיטיבית עם ממשק משתמש
                המאפשר לכתוב נוסחאות מתמטיות, הוספת גרפים, איורים, תמונות, ועוד
                הרבה פ&apos;יצרים מגניבים. בנוסף תוכלו לדפדף בקלות בין שאלות
                ותשובות כדי ללמוד במהירות ולחסוך זמן יקר.
                <br />
                למה אתם מחכים?
              </p>
              <Link className="btn btn-primary" href="/courses">
                התחלה
              </Link>
            </div>
            <div className="col-12">
              <ImageFallback
                src="/images/banner.png"
                className="mx-auto"
                width="700"
                height="330"
                alt="banner image"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm bg-gradient">
        <div className="container">
          <div className="row items-center justify-between">
            <div className="mb:md-0 mb-6 md:col-5 ">
              <ImageFallback
                src="/images/service-1.png"
                height={480}
                width={520}
                alt="מה כלול בכיף קוד"
              />
            </div>
            <div className="md:col-7 lg:col-6 ">
              <h2 className="mb-4 text-center">מה כלול בכיף קוד</h2>
              <p className="mb-8 text-lg" />
              <ul dir="rtl">
                <div className="flex gap-4 items-center mb-3">
                  <FaCheck />
                  <li> מעל 20 קורסים</li>
                </div>
                <div className="flex gap-4 items-center mb-3">
                  <FaCheck />
                  <li>
                    {ul1}
                    <Link
                      className="text-blue-500 hover:underline"
                      href="https://mega.nz/folder/0Sg0iD4B#0OPF1JJgFjtYoJuStlsCtA"
                      target="_blank"
                    >
                      מהמגה של האוניברסיטה הפתוחה
                    </Link>
                  </li>
                </div>
                <div className="flex gap-4 items-center">
                  <FaCheck />
                  <li> תמיכה מהקהילה</li>
                </div>
              </ul>
              <div className="flex justify-center">
                <Link
                  className="btn inline-block btn-primary mt-5"
                  href="/courses/algebra-1/bases/תלות-לינארית"
                >
                  דוגמא
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="row items-center justify-between">
            <div className="mb:md-0 mb-6 md:col-5 md:order-2">
              <ImageFallback
                src="/images/service-1.png"
                height={480}
                width={520}
                alt="מה כלול בכיף קוד"
              />
            </div>
            <div className="md:col-7 lg:col-6 md:order-1">
              <h2 className="mb-4 text-center">פיצ&apos;רים</h2>
              <p className="mb-8 text-lg" />
              <ul dir="rtl">
                <div className="flex gap-4 items-center mb-3">
                  <FaCheck />
                  <li>
                    {ul2}
                    <Link
                      className="text-blue-500 hover:underline"
                      href="https://cortexjs.io/mathlive"
                      target="_blank"
                    >
                      mathlive
                    </Link>
                    {ul3}
                  </li>
                </div>
                <div className="flex gap-4 items-center mb-3">
                  <FaCheck />
                  <li>
                    {ul4}
                    <Link
                      className="text-blue-500 hover:underline"
                      href="https://www.geogebra.org"
                      target="_blank"
                    >
                      geogebra
                    </Link>
                    {ul5}
                  </li>
                </div>
                <div className="flex gap-4 items-center mb-3">
                  <FaCheck />
                  <li>
                    {ul6}
                    <Link
                      className="text-blue-500 hover:underline"
                      href="https://excalidraw.com"
                      target="_blank"
                    >
                      excalidraw
                    </Link>
                    {ul7}
                  </li>
                </div>
              </ul>
              <div className="flex justify-center gap-6 mt-6">
                <Link
                  className="btn-outline-primary inline-block pt-2"
                  href="/playground"
                >
                  סביבת ניסוי
                </Link>
                <Link
                  className="btn inline-block btn-primary"
                  href="/tutorial"
                >
                  מדריך
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="mb-10">
        <h3 dir="rtl" className="flex justify-center">
          צרו איתנו קשר:
        </h3>
        <div className="flex justify-center">
          <Link
            href={"https://discord.gg/Mht9WcSKqp"}
            target="_blank"
            className="rounded-full w-36 bg-indigo-300 mt-4 items-center flex justify-center gap-2"
          >
            דיסקורד
            <Image
              src={"/images/discord.png"}
              alt="discord"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div> */}
      <Footer />
    </>
  );
};

export default Home;
