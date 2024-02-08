import React from "react";
import { Button, Input, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useTodoContext } from "../context/TodoContext";
import { createTodo, statusState } from "../lib/data";
import GetCategory from "../components/GetCategory";
import { useNavigate } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const Form = () => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const { newTodo, setNewTodo, setTodoStatus, todoStatus, categoryStatus } =
    useTodoContext();

  let name, value;
  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    name = event.target.name;
    value = event.target.value;
    setNewTodo({ ...newTodo, [name]: value });
  };

  //   mutation
  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["create-new-todo"] });
      toast.success("Todo Created Successfully");
      setNewTodo({ title: "", description: "" });
      navigate("/");
    },
  });

  //   create todo
  const handleCreateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (categoryStatus !== undefined) {
      const createNewTodo = {
        title: newTodo.title,
        description: newTodo.description,
        todoStatus: todoStatus,
        categoryId: categoryStatus,
      };
      mutation.mutate(createNewTodo);
    } else {
      toast.error("Please create category to add task!");
    }
  };

  return (
    <form
      onSubmit={handleCreateTodo}
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
        Create New Todo
      </Text>
      <hr />
      {/* title */}
      <Input
        name="title"
        placeholder="Enter your title"
        value={newTodo.title}
        onChange={handleTodoChange}
        style={{ margin: "10px 0" }}
        required
      />
      {/* description */}
      <Input
        name="description"
        placeholder="Enter your description"
        value={newTodo.description}
        onChange={handleTodoChange}
        required
      />
      {/* status */}
      <Input
        component="select"
        rightSection={<IconChevronDown size={14} stroke={1.5} />}
        pointer
        mt="md"
        onChange={(e) => setTodoStatus(Number(e.target.value))}
      >
        {statusState.map((statusState) => (
          <option value={statusState.value} key={statusState.value}>
            {statusState.label === "Pending" ? (
              <>Select Todo Status</>
            ) : (
              <>{statusState.label}</>
            )}
          </option>
        ))}
      </Input>

      <QueryClientProvider client={queryClient}>
        <GetCategory />
      </QueryClientProvider>
      <Button type="submit" style={{ marginTop: "10px" }}>
        Create Todo
      </Button>
      <Toaster />
    </form>
  );
};

export default Form;
