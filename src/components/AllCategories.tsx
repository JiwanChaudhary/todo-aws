import { Button, Table, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useTodoContext } from "../context/TodoContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, getAllCategories } from "../lib/data";
import toast, { Toaster } from "react-hot-toast";

const AllCategories = () => {
  const { setCategories, categories, todo } = useTodoContext();

  const getCategory = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: getAllCategories,
  });

  useEffect(() => {
    if (getCategory.isSuccess) {
      setCategories(getCategory.data);
    }
  }, [getCategory, setCategories]);

  // console.log(todo);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delete-category"] });
      toast.success("Item deleted successfully!");
    },
  });

  // console.log(categories);

  //   delete category
  const handleCategoryDelete = (id: number) => {
    const category = categories.find((category) => category.id === id);
    if (!category) {
      toast.error("Category not found!");
      return;
    }

    const todoCategoryExist = todo.some(
      (item) => item.categoryName === category.categoryName
    );
    if (todoCategoryExist) {
      toast.error("Cannot delete category as it has todo");
    } else {
      mutation.mutate(id);
    }
  };

  //   table data
  const rows = categories.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.categoryName}</Table.Td>
      <Table.Td>
        <Button
          type="submit"
          bg="red"
          onClick={() => handleCategoryDelete(item.id)}
        >
          Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Text fw={700} size="xl" c="green" ta="center">
        All Categories
      </Text>
      {categories.length === 0 ? (
        <Text ta="center" c="red" size="lg">
          No categories available
        </Text>
      ) : (
        <Table
          horizontalSpacing="sm"
          // verticalSpacing="sm"
          highlightOnHover
          withTableBorder
          withColumnBorders
          style={{ marginBottom: "20px" }}
        >
          <Table.Tr>
            <Table.Th>Category Name</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
          {rows}
        </Table>
      )}
      <Toaster />
    </>
  );
};

export default AllCategories;
