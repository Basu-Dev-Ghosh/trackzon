import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

function UserAvatar({
  name,
  image,
  className,
}: {
  name?: string | null | undefined;
  image?: string | null | undefined;
  className?: string;
}) {
  return (
    <Avatar className={cn("bg-white text-black", className)}>
      {image && (
        <Image
          src={image}
          alt={name || "User Name"}
          width={40}
          height={40}
          className="rounded-md"
        />
      )}
      {/* <AvatarImage className="object-cover" src="/basu.png" /> */}
      <AvatarFallback className="dark:bg-white dark:text-black text-lg">
        {!name
          ? "UN"
          : name
              .split(" ")
              .map((n) => n[0])
              .join("")}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
