import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ServerTableData } from "./EquationsTable.typings.ts";
import { mapToFieldType, mapToTableData } from "./EquationsTable.mapping.ts";
import { useModal } from "../../hooks/useModal.ts";
import { useState } from "react";
import { FieldType } from "../UpdateEquationModal/UpdateEquationModal.typings.ts";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { SearchProps } from "antd/es/input";

export const useEquationsTable = () => {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState<string>("");
  const [onlyWithOneRoot, setOnlyWithOneRoot] = useState<boolean>(false);
  const [currentEquation, setCurrentEquation] = useState<
    FieldType | undefined
  >();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const { data, isLoading } = useQuery<ServerTableData[]>(
    searchText !== "" ? `/root/${searchText}` : onlyWithOneRoot ? "/root" : "",
    {
      onError: () => {
        notificationApi.error({
          message: "Помилка отримання рівнянь",
          description: "Спробуйте перезавантажити.",
        });
      },
    },
  );
  const { mutate: deleteEquationHandler } = useMutation(
    (id: string) =>
      fetch(`/v1/api/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("");
        notificationApi.success({
          message: "Успішно видалено",
        });
      },
      onError: () => {
        notificationApi.error({
          message: "Помилка видалення рівняння",
          description: "Спробуйте ще раз.",
        });
      },
    },
  );
  const resetCurrentEquation = () => setCurrentEquation(undefined);

  const updateEquationModal = useModal({
    beforeOnClose: resetCurrentEquation,
  });
  const updateEquationHandler = (id: string) => {
    const currentItem = mapToTableData(data || []).find(
      (equation) => equation.id === id,
    );
    currentItem && setCurrentEquation(mapToFieldType(currentItem));
    updateEquationModal.open();
  };

  const setOnlyWithOneRootHandler = (e: CheckboxChangeEvent) => {
    setOnlyWithOneRoot(e.target.checked);
  };

  const onSearch: SearchProps["onChange"] = (e) =>
    setSearchText(e.target.value);

  return {
    dataSource: mapToTableData(data || []),
    isLoading,
    notificationContextHolder,
    deleteEquationHandler,
    updateEquationModal,
    updateEquationHandler,
    currentEquation,
    setOnlyWithOneRootHandler,
    onSearch,
  } as const;
};
