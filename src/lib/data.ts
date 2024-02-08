import axios from "axios";
import toast from "react-hot-toast";

type createNewTodoProps = {
  title: string;
  description: string;
  todoStatus: number;
  categoryId: number;
};

type todoCategoryProps = {
  categoryName: string;
};

// todos
export const getAllTodos = async () => {
  try {
    const res = await axios.get(`http://localhost:5252/api/todo/get`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleTodo = async (todoId: number) => {
  try {
    const res = await axios.get(`http://localhost:5252/api/todo/get/${todoId}`);
    const data = res.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = async (createNewTodo: createNewTodoProps) => {
  try {
    const res = await axios.post(
      `http://localhost:5252/api/todo/create`,
      createNewTodo
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await axios.delete(`http://localhost:5252/api/todo/delete/${id}`);
    toast.success("Item deleted successfully!");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

// categories
export const createCategory = async (todoCategory: todoCategoryProps) => {
  const res = await axios.post(
    `http://localhost:5252/api/category/create-category`,
    todoCategory
  );
  console.log(todoCategory);

  const data = res.data;
  return data;
};

export const deleteCategory = async (id: number) => {
  await axios.delete(`http://localhost:5252/api/category/delete/${id}`);
  window.location.reload();
};

export const getAllCategories = async () => {
  try {
    const res = await axios.get(`http://localhost:5252/api/category/get-all`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

// status
export function getStatusString(status: number) {
  switch (status) {
    case 1:
      return "Pending";
    case 2:
      return "Active";
    case 3:
      return "Completed";
    default:
      return "Unknown Status";
  }
}

//   status state
export const statusState = [
  { value: "1", label: "Pending" },
  { value: "2", label: "Active" },
  { value: "3", label: "Completed" },
];
