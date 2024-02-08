import React, { useEffect } from "react";
import { useTodoContext } from "../context/TodoContext";
import { Box, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../lib/data";

const TodoByCategory = () => {
  const { todo, setCategories, categories } = useTodoContext();

  const getCategory = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: getAllCategories,
  });

  useEffect(() => {
    if (getCategory.isSuccess) {
      setCategories(getCategory.data);
    }
  }, [getCategory, setCategories]);

  return (
    <>
      {categories.length ? (
        <>
          {categories.map((category) => {
            const todosForCategory = todo.filter(
              (item) => item.categoryName === category.categoryName
            );
            return (
              <Box key={category.id} bg="blue" c="white" m="md" p="md" style={{borderRadius: "10px"}}>
                <Text fw={700}>{category.categoryName}</Text>
                <Text c="gray.4">Total todos: {todosForCategory.length}</Text>
              </Box>
            );
          })}
        </>
      ) : (
        <Text c="red" fw="normal" ta="center">No Categories!</Text>
      )}
    </>
  );
};

export default TodoByCategory;
