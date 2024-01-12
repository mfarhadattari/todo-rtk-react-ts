import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addTodo } from "@/redux/features/todoSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Label } from "@radix-ui/react-label";
import { FormEvent, ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AddTodoModal = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState("");
  const [purity, setPurity] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const todo = {
      title,
      purity: purity as "high" | "low" | "medium",
      dateTime: new Date(dateTime).toISOString(),
      description,
    };

    dispatch(addTodo(todo));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>
            Add your todo, that you want to list.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-left font-medium">
                Title
              </Label>
              <Input
                id="title"
                required
                onBlur={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left font-medium">Purity</Label>
              <Select required onValueChange={(e) => setPurity(e)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Purity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="datetime" className="text-left font-medium">
                Date Time
              </Label>
              <Input
                type="datetime-local"
                required
                id="datetime"
                onBlur={(e) => setDateTime(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-left font-medium">
                Description
              </Label>
              <Input
                id="description"
                required
                onBlur={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Add Task</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoModal;
