import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TTodoPurity, filterTodos } from "@/redux/features/todoSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ReactNode, useState } from "react";

const TodoFilter = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const onChange = (value: TTodoPurity) => {
    setValue(value);
    dispatch(filterTodos(value));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter Todo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => onChange(value as TTodoPurity)}
        >
          <DropdownMenuRadioItem value="">No-Filter</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoFilter;
