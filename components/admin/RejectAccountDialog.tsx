import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DenyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DenyDialog({ open, onOpenChange, onConfirm }: DenyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle>Deny Account Request</DialogTitle>
          <DialogDescription className="text-center">
            Denying this request will notify the student they is not eligible
            due to unsuccessful ID card verification.
          </DialogDescription>
        </DialogHeader>
        <Button variant="destructive" className="w-full" onClick={onConfirm}>
          Deny & Notify Student
        </Button>
      </DialogContent>
    </Dialog>
  );
}
