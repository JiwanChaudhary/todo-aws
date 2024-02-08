import React, { createContext, useContext, useState } from "react";

type TodoItem = {
  todoId: number;
  todoTitle: string;
  description: string;
  todoStatus: number;
  categoryName: string;
};

type CategoryItem = {
  id: number;
  categoryName: string;
};

type TodoContextProps = {
  todo: TodoItem[];
  setTodo: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  newTodo: {
    title: string;
    description: string;
  };
  setNewTodo: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
    }>
  >;

  editTodo: TodoItem[];
  setEditTodo: React.Dispatch<React.SetStateAction<TodoItem[]>>;

  todoStatus: number;
  setTodoStatus: React.Dispatch<React.SetStateAction<number>>;
  categories: CategoryItem[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryItem[]>>;
  categoryStatus: number | undefined;
  setCategoryStatus: React.Dispatch<React.SetStateAction<number | undefined>>;
  newCategory: string;
  setNewCategory: React.Dispatch<React.SetStateAction<string>>;
};

// create context
const TodoContext = createContext<TodoContextProps | null>(null);

const TodoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [todo, setTodo] = useState<Array<TodoItem>>([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });

  const [editTodo, setEditTodo] = useState<Array<TodoItem>>([]);
  const [todoStatus, setTodoStatus] = useState(1);
  const [categories, setCategories] = useState<Array<CategoryItem>>([]);
  const [categoryStatus, setCategoryStatus] = useState<number | undefined>();
  const [newCategory, setNewCategory] = useState("");

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        newTodo,
        setNewTodo,
        todoStatus,
        setTodoStatus,
        categories,
        setCategories,
        categoryStatus,
        setCategoryStatus,
        editTodo,
        setEditTodo,
        newCategory,
        setNewCategory,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;

// use context
export function useTodoContext() {
  const context = useContext(TodoContext);

  if (context === null) {
    throw new Error("Context cannot be null");
  }

  return context;
}
