import Breadcrumbs from "@/components/Breadcrumbs";
import dictionary from "@/content/dictionary.json"

const PageHeader = ({ title }: { title: string }) => {
  return (
    <section>
      <div className="container text-center">
        <div className="rounded-2xl bg-gradient-to-b from-body to-theme-light px-8 py-2 dark:from-darkmode-body dark:to-darkmode-theme-light">
          {/* @ts-ignore */}
          <h1>{dictionary[title]}</h1>
          <Breadcrumbs />
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
