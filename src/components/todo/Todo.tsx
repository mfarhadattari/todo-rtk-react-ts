import { useAppSelector } from "@/redux/hooks";
import Container from "../ui/Container";
import { Button } from "../ui/button";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";

const Todo = () => {
  const { todos } = useAppSelector((state) => state.todo);
  return (
    <Container>
      <div className="mt-5 max-w-5xl mx-auto">
        <h1 className="text-center uppercase text-2xl">My Todo</h1>
        <div className="flex justify-between gap-5 mt-5">
          <AddTodoModal>
            <Button>Add todo</Button>
          </AddTodoModal>
          <TodoFilter>
            <Button>Filter todo</Button>
          </TodoFilter>
        </div>
        <div className="h-full bg-slate-950 mt-5 p-5 rounded-md space-y-3">
          {todos.length < 1 && (
            <div className="flex justify-center p-3 rounded-md bg-white">
              <p className="text-center text-xl text-red-600">
                No any pending todo
              </p>
            </div>
          )}

          {todos.map((todo) => (
            <TodoCard key={todo._id} todo={todo} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Todo;
