import React from "react";
import LogoImage from "@logos/tackzon-logo.png";
import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href="/" prefetch={false} className="overflow-hidden">
      <div className="flex items-center">
        <Image
          src={LogoImage}
          alt="logo"
          width={140}
          className="rounded-md object-cover dark:filter dark:invert dark:brightness-0"
        />
      </div>
    </Link>
  );
};

export default Logo;
