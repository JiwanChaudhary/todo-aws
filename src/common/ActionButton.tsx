import { Button } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteTodo } from "../lib/data";
import { useNavigate } from "react-router-dom";

type ActionButtonProps = {
  btnTitle: string;
  bgColor: string;
  itemId: number;
  btnType: string;
};

const ActionButton = ({ props }: { props: ActionButtonProps }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["delete-todo"] }),
  });
  // handleDelete
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  // handleEdit
  const handleEdit = (id: number) => {
    navigate(`/update-todo/${id}`);
  };

  return (
    <Button
      onClick={() => {
        props.btnType === "delete"
          ? handleDelete(props.itemId)
          : handleEdit(props.itemId);
      }}
      bg={props.bgColor}
    >
      {props.btnTitle}
    </Button>
  );
};

export default ActionButton;
