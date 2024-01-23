import DynamicIcon from "@/helpers/DynamicIcon";
import Link from "next/link";
import Image from "next/image";

export interface ISocial {
  name: string;
  icon: string;
  link: string;
}

const Social = ({
  source,
  className,
}: {
  source: ISocial[];
  className: string;
}) => {
  return (
    <ul className={className}>
      {source.map((social) => (
        <li key={social.name}>
          <a
            aria-label={social.name}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <span className="sr-only">{social.name}</span>
            <DynamicIcon className="inline-block" icon={social.icon} />
          </a>
        </li>
      ))}
      {/* <li>
      <Link
            href={"https://discord.gg/Mht9WcSKqp"}
            target="_blank"
            className=""
          >
            <Image
              src={"/images/discord.png"}
              alt="discord"
              width={20}
              height={20}
            />
          </Link>
      </li> */}
    </ul>
  );
};

export default Social;
