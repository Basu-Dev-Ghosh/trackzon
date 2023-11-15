"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FrownIcon } from "lucide-react";
import { signIn } from "next-auth/react";

const LoginAlertModal = (props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FrownIcon className="w-7 h-7 mr-2" />
            Login Required !
          </DialogTitle>
          <DialogDescription className="p-2">
            By signing in you will gain exclusive entry to explore and utilize
            its complete set of functions and capabilities within the platform.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={() => signIn()}>
            Log In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginAlertModal;
