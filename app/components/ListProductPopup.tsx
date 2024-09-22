"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ListProductForm from "./ListProductForm";

export default function ListProductPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-black text-white hover:bg-gray-800 text-sm"
        >
          List a Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>List a Product</DialogTitle>
        </DialogHeader>
        <ListProductForm />
      </DialogContent>
    </Dialog>
  );
}
