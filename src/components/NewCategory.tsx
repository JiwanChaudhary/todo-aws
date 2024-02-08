import { Button, Group, Input, Text } from "@mantine/core";
import { useTodoContext } from "../context/TodoContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../lib/data";
import AllCategories from "./AllCategories";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import CommonButton from "../common/Button";

const NewCategory = () => {
  const { newCategory, setNewCategory, categories } = useTodoContext();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["create-new-category"] });
      toast.success("Category created successfully!");
      window.location.reload();
    },
  });

  const handleCategorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({ categoryName: newCategory });
  };

  return (
    <>
      <Text
        fw={700}
        size="xl"
        c="green"
        ta="center"
        style={{ margin: "50px 0 0 0" }}
      >
        Create New Category
      </Text>
      <form
        style={{
          margin: "20px 0 30px 0",
        }}
        onSubmit={handleCategorySubmit}
      >
        <Group>
          <Input
            required
            type="text"
            name="newCategory"
            placeholder="Enter Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button type="submit">Create Category</Button>
        </Group>
      </form>
      <hr />
      <AllCategories />
      {categories.length ? (
        <>
          <hr style={{ marginBottom: "20px" }} />
          <Link to="/create-todo" style={{ float: "right" }}>
            <CommonButton props={{ btnTitle: "Create Todo" }} />
          </Link>
        </>
      ) : (
        <></>
      )}

      <Toaster />
    </>
  );
};

export default NewCategory;
