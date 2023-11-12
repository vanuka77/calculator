import { useModal } from "../../hooks/useModal.ts";
import { useMutation, useQueryClient } from "react-query";
import { Form, notification } from "antd";
import { FieldType } from "./UpdateEquationModal.typings.ts";
import { useEffect } from "react";

type Props = {
  modal: ReturnType<typeof useModal>;
  currentEquation?: FieldType;
};
export const useUpdateEquationModal = ({ modal, currentEquation }: Props) => {
  const queryClient = useQueryClient();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [form] = Form.useForm();

  const { mutate: addEquationMutation } = useMutation(
    async (variables: { body: string; roots: string[]; id?: string }) => {
      const response = await fetch(`/v1/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variables),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("");
        notificationApi.success({
          message: currentEquation ? "Успішно оновлено" : "Успішно додано",
        });
        modal.onClose();
        modal.reset();
        form.resetFields();
      },
      onError: () => {
        notificationApi.error({
          message: currentEquation
            ? "Помилка редагування"
            : "Помилка додавання рівняння",
          description:
            "Перевірте рівняння на правильність розміщення дужок, знаків, коренів, тощо.",
        });
      },
    },
  );
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(currentEquation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEquation]);
  const addEquationHandler = () => {
    const roots = [];
    modal?.data?.root1 !== undefined &&
      modal?.data?.root1 !== null &&
      roots.push(modal.data.root1);
    modal?.data?.root2 !== undefined &&
      modal?.data?.root2 !== null &&
      roots.push(modal.data.root2);
    addEquationMutation({
      body: modal.data.body,
      roots,
      id: currentEquation?.id,
    });
  };
  return {
    modal,
    notificationContextHolder,
    addEquationHandler,
    form,
  };
};
