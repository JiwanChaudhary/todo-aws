import React from "react";
import { Box, Text } from "@mantine/core";
import CommonButton from "../common/Button";
import classes from "../styles/Todos.module.css";
import TableData from "../common/Table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoByCategory from "./TodoByCategory";
import { useTodoContext } from "../context/TodoContext";

const Todos = () => {
  const queryClient = new QueryClient();
  const { todo } = useTodoContext();

  return (
    <>
      <Text
        size="lg"
        fw={700}
        c={"blue"}
        tt={"uppercase"}
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        Welcome To Todo
      </Text>
      <Box className={classes.TodoBox}>
        <Text size="lg" fw={700} c={"blue"} tt={"uppercase"}>
          My Todos
        </Text>
        <Box style={{ display: "flex", gap: "2px" }}>
          <CommonButton props={{ btnTitle: "Create Todo" }} />
          <CommonButton props={{ btnTitle: "Create category" }} />
        </Box>
      </Box>
      {/* <hr /> */}
      <Box>
        <QueryClientProvider client={queryClient}>
          <TableData />
        </QueryClientProvider>
        {/* <hr /> */}
        <Text size="md" fw={600} ta="end" c={"blue"} tt={"uppercase"}>
          {todo.length ? <>You have total: {todo.length} todos</> : <></>}
        </Text>
      </Box>
      <hr style={{marginTop: "20px"}} />
      <Box>
        <Text
          size="lg"
          fw={700}
          c={"blue"}
          tt={"uppercase"}
          ta="center"
          style={{ margin: "20px 0" }}
        >
          Todos By Category
        </Text>
        <TodoByCategory />
      </Box>
    </>
  );
};

export default Todos;
