import React, { useState } from "react";
import { Button, Input, Text } from "@mantine/core";
import { getStatusString, statusState } from "../lib/data";
import { useTodoContext } from "../context/TodoContext";
import { IconChevronDown } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type updatedTodoProps = {
  Title: string;
  Description: string;
  TodoStatus: number;
};

const EditTodoForm = ({ id }: { id: number }) => {
  const navigate = useNavigate();
  const { editTodo, setTodoStatus, todoStatus } = useTodoContext();

  const [editNewTodo, setEditNewTodo] = useState({
    newTitle: editTodo[0].todoTitle,
    newDescription: editTodo[0].description,
  });

  let name, value;
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    name = e.target.name;
    value = e.target.value;
    setEditNewTodo({ ...editNewTodo, [name]: value });
  };

  const queryClient = useQueryClient();

  const updateTodo = async (updatedTodo: updatedTodoProps) => {
    const res = await axios.put(
      `http://localhost:5252/api/todo/update/${id}`,
      updatedTodo
    );
    const data = res.data;
    return data;
  };

  //   mutation
  const mutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["update-todo"] });
      navigate("/");
    },
  });

  //   update todo
  const handleUpdateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      Title: editNewTodo.newTitle,
      Description: editNewTodo.newDescription,
      TodoStatus: todoStatus,
    };
    mutation.mutate(newTodo);
  };

  return (
    <form
      onSubmit={handleUpdateTodo}
      style={{
        width: "100%",
        border: "1px solid black",
        margin: "50px",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Text
        size="xl"
        c="teal"
        fw={700}
        style={{ textAlign: "center", margin: "20px auto" }}
      >
        Edit Todo
      </Text>
      <hr />
      {/* title */}
      <Input
        name="newTitle"
        placeholder="Enter your title"
        value={editNewTodo.newTitle}
        onChange={handleEditChange}
        style={{ margin: "10px 0" }}
        required
      />
      {/* description */}
      <Input
        name="newDescription"
        placeholder="Enter your description"
        value={editNewTodo.newDescription}
        onChange={handleEditChange}
        required
      />
      {/* status */}
      <Input
        component="select"
        rightSection={<IconChevronDown size={14} stroke={1.5} />}
        pointer
        mt="md"
        onChange={(e) => {
          setTodoStatus(Number(e.target.value));
          console.log(e.target.value);
        }}
      >
        <option value={editTodo[0].todoStatus}>
          {getStatusString(editTodo[0].todoStatus)}
        </option>
        {statusState.map((statusState) => (
          <option value={statusState.value} key={statusState.value}>
            {statusState.label}
          </option>
        ))}
      </Input>

      <Button type="submit" style={{ marginTop: "10px" }}>
        Update Todo
      </Button>
    </form>
  );
};

export default EditTodoForm;
