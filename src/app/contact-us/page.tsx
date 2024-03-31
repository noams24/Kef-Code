import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { FC } from "react";
import ContactUs from "./ContactUs";

interface pageProps {}

const Contact: FC<pageProps> = ({}) => {
  return (
    <div dir="rtl" className="flex justify-center mt-5">
      <SeoMeta
        title="כיף קוד - יצירת קשר"
        meta_title="כיף קוד - יצירת קשר"
        description="כיף קוד - יצירת קשר"
      />
      <div>
        <PageHeader title="יצירת קשר" />
        <p className="mt-5">
          נשמח לסייע לך בכל שאלה או בעיה שיש לך לגבי האתר. 
        </p>
        <ContactUs />
      </div>
    </div>
  );
};

export default Contact;
