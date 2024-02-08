import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTodoContext } from "../context/TodoContext";
import EditTodoForm from "./EditTodoForm";
import axios from "axios";

const EditTodo = () => {
  const { setEditTodo } = useTodoContext();

  const { todoId } = useParams();

  const singleTodo = useQuery({
    queryKey: ["single-todo"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5252/api/todo/get/${todoId}`
      );
      setEditTodo(res.data);
    },
  });

  if (singleTodo.isLoading) return <>Loading...</>;
  if (singleTodo.fetchStatus === "fetching") return <>Fetching...</>;
  return (
    <>
      <EditTodoForm id={Number(todoId)} />
    </>
  );
};

export default EditTodo;
