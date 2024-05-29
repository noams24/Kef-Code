import SeoMeta from "@/partials/SeoMeta";

const NotFound = () => {

  return (
    <>
      <SeoMeta title={"דף לא נמצא"} />
      <section className="section-sm text-center">
        <div className="container">
          <div className="row justify-center">
            <div className="sm:col-10 md:col-8 lg:col-6">
              <h1 className="h2 mb-4">הדף לא נמצא</h1>
              <a href="/" className="btn btn-primary mt-8">
                חזרה לדף הבית
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
