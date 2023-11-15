import React from "react";
import Logo from "../Logo/Logo";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import UserButton from "../UserButton/UserButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Link from "next/link";
import { HeartIcon } from "lucide-react";

async function Header() {
  const session = await getServerSession(authOptions);

  // console.log(session);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#001427]">
      <nav className="flex flex-row max-w-md items-center p-4 pl-4 md:max-w-7xl mx-auto bg-white dark:bg-[#001427]">
        <Logo />
        <div className="flex-1 flex items-center justify-end space-x-5 p-2 md:p-0">
          {/* Language select */}
          {/* session */}
          {/* {session ? (
            <Link href={"/fav"} prefetch={false}>
              <HeartIcon className="h-6 w-6 text-gray-200 dark:text-gray-200" />
            </Link>
          ) : null} */}
          {/* Dark mode toggle*/}
          <DarkModeToggle />
          {/* User button */}
          <UserButton session={session} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
