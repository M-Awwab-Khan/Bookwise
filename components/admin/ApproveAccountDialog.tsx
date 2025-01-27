import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ApproveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ApproveDialog({
  open,
  onOpenChange,
  onConfirm,
}: ApproveDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <DialogTitle>Approve Book Request</DialogTitle>
          <DialogDescription className="text-center">
            Approve the student's account request and grant access. A
            confirmation email will be sent upon approval.
          </DialogDescription>
        </DialogHeader>
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          onClick={onConfirm}
        >
          Approve & Send Confirmation
        </Button>
      </DialogContent>
    </Dialog>
  );
}
