import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";

const Contact = async () => {
  const data: RegularPage = getListPage("pages/contact.md");
  const { frontmatter } = data;
  const { title, description, meta_title, image } = frontmatter;
  const { contact_form_action } = config.params;
  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title="יצירת קשר" />
      <section dir="rtl" className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              <form action={contact_form_action} method="POST">
                <div className="mb-6">
                  <label htmlFor="name" className="form-label">
                    שם <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    className="form-input"
                    type="text"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="mail" className="form-label">
                    אימייל <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="mail"
                    className="form-input"   
                    type="email"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="form-label">
                    פרטי הודעה <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="form-input"
                    id="message"
                    rows={8}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  שליחה
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
