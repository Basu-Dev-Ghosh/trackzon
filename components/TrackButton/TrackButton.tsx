"use client";

import { MailPlusIcon } from "lucide-react";
import { Session } from "next-auth";
import LoginAlertModal from "../LoginAlertModal/LoginAlertModal";
import { useState } from "react";
import EmailFormModal from "../EmailFormModal/EmailFormModal";

type props = {
  productId: string;
  session: Session | null | undefined;
};

const TrackButton = ({ productId, session }: props) => {
  const [loginAlert, setLoginAlert] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const showEmailFormModal = async () => {
    if (!session) {
      setLoginAlert(true);
      return;
    }
    setShowEmailForm(true);
  };
  return (
    <>
      <EmailFormModal
        open={showEmailForm}
        onOpenChange={setShowEmailForm}
        user={session?.user}
        productId={productId}
      />
      <LoginAlertModal open={loginAlert} onOpenChange={setLoginAlert} />
      <button
        onClick={showEmailFormModal}
        type="button"
        className="flex w-full justify-center items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        <MailPlusIcon className="w-4 h-4 mr-2" />
        Track Item
      </button>
    </>
  );
};

export default TrackButton;
