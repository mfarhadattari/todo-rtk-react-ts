import { ITodo, TTodoPurity, updateTodo } from "@/redux/features/todoSlice";
import { useAppDispatch } from "@/redux/hooks";
import { FormEvent, ReactNode, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const UpdateTodoModal = ({
  children,
  todo,
}: {
  children: ReactNode;
  todo: ITodo;
}) => {
  const [title, setTitle] = useState(todo.title);
  const [purity, setPurity] = useState(todo.purity);
  const [dateTime, setDateTime] = useState(todo.dateTime.split(".")[0]);
  const [description, setDescription] = useState(todo.description);

  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedTodo = {
      title: title,
      purity: purity,
      dateTime: new Date(dateTime).toISOString(),
      description: description,
    };

    dispatch(updateTodo({ _id: todo._id, todo: updatedTodo }));
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
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left font-medium">Purity</Label>
              <Select
                onValueChange={(e) => setPurity(e as TTodoPurity)}
                defaultValue={purity}
              >
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
                id="datetime"
                defaultValue={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-left font-medium">
                Description
              </Label>
              <Input
                id="description"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Update Task</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodoModal;
