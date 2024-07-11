import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface EditProfileProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (open: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  handleEditProfile: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function EditProfile({ isOpen, setIsOpen, handleEditProfile }: Readonly<EditProfileProps>) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit name</DialogTitle>
          <DialogDescription>Change the name</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEditProfile}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" placeholder="Mame" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
