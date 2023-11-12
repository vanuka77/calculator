import { FC } from "react";
import { Form, Input, InputNumber, Modal } from "antd";
import { FieldType } from "./UpdateEquationModal.typings.ts";
import { useUpdateEquationModal } from "./useUpdateEquationModal.ts";
import { useModal } from "../../hooks/useModal.ts";

type Props = {
  modal: ReturnType<typeof useModal>;
  currentEquation?: FieldType;
};
export const UpdateEquationModal: FC<Props> = ({ modal, currentEquation }) => {
  const { addEquationHandler, notificationContextHolder, form } =
    useUpdateEquationModal({ modal, currentEquation });

  return (
    <>
      {notificationContextHolder}
      <Modal
        title="Додавання рівняння"
        open={modal.isOpen}
        onCancel={modal.onClose}
        onOk={addEquationHandler}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          form={form}
          autoComplete="off"
          onChange={() => modal.setData(form.getFieldsValue())}
        >
          <Form.Item<FieldType>
            label="Рівняння"
            name="body"
            rules={[
              { required: true, message: "Будь ласка введіть рівняння!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="Корінь 1" name="root1">
            <InputNumber />
          </Form.Item>
          <Form.Item<FieldType> label="Корінь 2" name="root2">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
