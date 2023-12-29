import Link from "next/link";
import { INavigationLink } from "@/components/NavMenu";


interface MenuItemProps {
  menu: INavigationLink;
}

const MenuItem: React.FC<MenuItemProps> = ({ menu }) => {
  if (menu.hasChildren) {
    return (
      <li className="nav-item nav-dropdown group relative">
        <span
          className={`nav-link inline-flex items-center active ${menu.children?.map(({ url }) => url) || menu.children?.map(({ url }) => `${url}/`)}`}
        >
          {menu.name}
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
      </li>
    );
  } else {
    return (
      <li className="nav-item">
        <Link href={menu.url} className={`nav-link block`}>
          {menu.name}
        </Link>
      </li>
    );
  }
};

export default MenuItem;