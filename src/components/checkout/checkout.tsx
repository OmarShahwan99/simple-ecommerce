import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import CheckoutForm from "./checkout-form";

const Checkout = ({
  totalAmount,
  setDrawerOpen,
}: {
  totalAmount: number;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setDrawerOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={totalAmount === 0}>
        <Button disabled={totalAmount === 0} className="w-full">
          الدفع
          <span className="text-xl">({totalAmount}$)</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>اكمال الطلب</DialogTitle>
          <DialogDescription>
            الرجاء تعبية المعلومات أدناه لإكمال طلبك
          </DialogDescription>
        </DialogHeader>
        <CheckoutForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default Checkout;
