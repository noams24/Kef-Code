import Breadcrumbs from "@/components/Breadcrumbs";
import { humanize } from "@/lib/utils/textConverter";

const PageHeader = ({ title }: { title: string }) => {
  return (
    <section>
      <div className="text-center mx-auto  px-4">
        <div className="rounded-m bg-gradient-to-b from-body to-theme-light px-8 py-4 dark:from-darkmode-body dark:to-darkmode-theme-light">
          <Breadcrumbs className="mt-6" />
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
