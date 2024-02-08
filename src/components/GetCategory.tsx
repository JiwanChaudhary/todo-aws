import { Input } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getAllCategories } from "../lib/data";
import { useTodoContext } from "../context/TodoContext";
import { IconChevronDown } from "@tabler/icons-react";

const GetCategory = () => {
  const { setCategories, categories, setCategoryStatus } = useTodoContext();

  const getCategory = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: getAllCategories,
  });

  useEffect(() => {
    if (getCategory.isSuccess) {
      setCategories(getCategory.data);
    }
  }, [getCategory]);

  return (
    <Input
      component="select"
      rightSection={<IconChevronDown size={14} stroke={1.5} />}
      pointer
      mt="md"
      onChange={(e) => setCategoryStatus(Number(e.target.value))}
    >
      <option value="">Choose Category</option>
      {categories.map((category) => (
        <option value={category.id} key={category.id}>
          {category.categoryName}
        </option>
      ))}
    </Input>
  );
};

export default GetCategory;
