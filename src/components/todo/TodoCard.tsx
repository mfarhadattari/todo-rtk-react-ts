import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

const TodoCard = () => {
  return (
    <div className="flex justify-between p-3 bg-slate-900 text-white rounded-md">
      <input type="checkbox" name="check" id="check" />
      <p>Todo title</p>
      <p>Todo Time</p>
      <p>Todo description</p>
      <div className="flex justify-center items-center">
        <Button>
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
