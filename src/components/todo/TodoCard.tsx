import { ITodo, removeTodo } from "@/redux/features/todoSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

const TodoCard = ({ todo }: { todo: ITodo }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-between p-3 bg-slate-900 text-white rounded-md">
      <input type="checkbox" name="check" id="check" />
      <p>{todo.title}</p>
      <p>{new Date(todo.dateTime).toLocaleString()}</p>
      <p>{todo.description}</p>
      <div className="flex justify-center items-center">
        <Button onClick={() => dispatch(removeTodo(todo._id))}>
          <TrashIcon className="size-6 text-red-600" />
        </Button>
        <Button>
          <Pencil2Icon className="size-5 text-white-600" />
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
