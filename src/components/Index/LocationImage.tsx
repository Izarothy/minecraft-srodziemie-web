import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import slugify from "~/utils/slugify";
type Props = {
  src: string;
  name: string;
};
const LocationImage = ({ src, name }: Props) => {
  const [imageHovered, setImageHovered] = useState(false);
  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setImageHovered(true)}
      onMouseLeave={() => setImageHovered(false)}
    >
      <Link href={`/artykuly/${slugify(name)}`} className="text-inherit">
        <Image
          width={500}
          height={280}
          className={`${
            imageHovered ? `opacity-50 transition-all  duration-[400ms]` : ``
          }  h-full w-full rounded-sm object-cover shadow-lg`}
          src={src}
          alt={name}
        />
        <span
          className={`${
            imageHovered ? `absolute` : `hidden`
          } left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-bold`}
        >
          {name}
        </span>
      </Link>
    </div>
  );
};

export default LocationImage;
