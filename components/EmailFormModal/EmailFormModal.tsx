"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "../ui/input";
import { addUserEmailToProduct } from "@/lib";
import { PartyPopper } from "lucide-react";

const EmailFormModal = (props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | null
    | undefined;
  productId: string;
}) => {
  const [email, setEmail] = useState(props?.user?.email || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();
  const addEmailToProduct = async () => {
    // console.log(email);

    if (!email) {
      toast({
        variant: "default",
        description: "Please provide an valid Email",
      });
      return;
    }
    try {
      setIsLoading(true);
      const isSent: boolean | undefined = await addUserEmailToProduct(
        props.productId,
        email
      );
      if (isSent) {
        props.onOpenChange(false);
        setIsLoading(false);
        setIsSent(true);
      }
    } catch (err: any) {
      setIsLoading(false);
      toast({
        variant: "default",
        description: err?.message,
      });
    }
  };

  return (
    <>
      {/* {Congrats modal} */}
      <Dialog open={isSent} onOpenChange={setIsSent}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader className="text-left ">
            <DialogTitle className="flex items-center text-xl justify-center">
              <PartyPopper className="w-7 h-7 mr-2 text-green-300" />
              Congratulations! You are on list
              <PartyPopper className="w-7 h-7 ml-2 text-green-300" />
            </DialogTitle>
            <DialogDescription className="text-center p-2">
              From right now we will send you an email when the product price
              drops or any changes are made
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* {form modal} */}
      <Dialog {...props}>
        <DialogContent className="sm:max-w-[360px]">
          <DialogHeader className="text-left ">
            <DialogTitle>Your Email</DialogTitle>
            <DialogDescription>
              We will send you an email when the product price drops
            </DialogDescription>
          </DialogHeader>
          <div className="grid py-4">
            <div className="">
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="md:w-full"
                id="name"
                type="email"
                defaultValue={props?.user?.email || "doejohn@email.com"}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={addEmailToProduct}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailFormModal;
