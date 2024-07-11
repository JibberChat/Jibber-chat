import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface EditRoomProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleInviteUser: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function EditRoom({ isOpen, setIsOpen, handleInviteUser }: Readonly<EditRoomProps>) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite user to the room</DialogTitle>
          <DialogDescription>Invite a user to the room by entering their email address.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleInviteUser}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="roomName" className="text-right">
                User Email
              </Label>
              <Input id="userEmail" name="userEmail" placeholder="user email" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Invite</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
