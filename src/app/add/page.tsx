
import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UploadImage from "@/components/UploadImage";


const Add = async () => {
  const session = await getServerSession(authOptions)
  if (session?.user.role !== 'ADMIN') {
     throw new Error('Unauthorized')
  }

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
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6 text-center">
              <form action={contact_form_action} method="POST">
                <div className="mb-6">
                  <label htmlFor="title" className="form-label">
                    שם השאלה
                  </label>
                  <input
                    id="title"
                    className="form-input"
                    type="text"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="course" className="form-label">
                    קורס
                  </label>
                  <input
                    id="mail"
                    className="form-input"
                    type="email"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="chapter" className="form-label">
                    פרק 
                  </label>
                  <input
                    id="chapter"
                    className="form-input"
                    type="chapter"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="difficulty" className="form-label">
                   רמת קושי
                  </label>
                  <input
                    id="difficulty"
                    className="form-input"
                    type="difficulty"
                  />
                </div>

                <h3 className="mb-10">העלאת תמונה של השאלה</h3>
                <UploadImage/>
                <button type="submit" className="btn btn-primary">
                  העלאה
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Add;
