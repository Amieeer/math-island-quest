import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, Sparkles } from "lucide-react";
import { Button } from "./button";

interface LevelUpModalProps {
  open: boolean;
  onClose: () => void;
  oldLevel: number;
  newLevel: number;
}

export const LevelUpModal = ({
  open,
  onClose,
  oldLevel,
  newLevel,
}: LevelUpModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary">
            <Star className="h-10 w-10 text-primary-foreground fill-primary-foreground animate-pulse" />
          </div>
          <DialogTitle className="text-center text-3xl font-bold">
            Level Up! 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-lg pt-4">
            <div className="flex items-center justify-center gap-4 my-6">
              <span className="text-4xl font-bold text-foreground">
                {oldLevel}
              </span>
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <span className="text-4xl font-bold text-primary">{newLevel}</span>
            </div>
            <p className="text-muted-foreground">
              Congratulations! You've reached Level {newLevel}!
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Keep up the amazing work!
            </p>
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onClose} size="lg" className="w-full mt-4">
          Continue Adventure
        </Button>
      </DialogContent>
    </Dialog>
  );
};
