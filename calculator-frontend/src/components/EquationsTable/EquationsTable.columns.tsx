import { Button, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableData } from "./EquationsTable.typings.ts";

type Props = {
  deleteEquationHandler: (id: string) => void;
  updateEquationHandler: (id: string) => void;
};
export const getColumns = ({
  deleteEquationHandler,
  updateEquationHandler,
}: Props): ColumnsType<TableData> => [
  {
    title: "Номер",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Рівняння",
    dataIndex: "body",
    key: "body",
  },
  {
    title: "Корені",
    dataIndex: "roots",
    key: "roots",
    render: (_, { roots }) => (
      <>
        {roots.map((root, index) => {
          return <Tag key={index}>{root}</Tag>;
        })}
      </>
    ),
  },
  {
    title: "Дії",
    dataIndex: "",
    key: "actions",
    render: (_value, record) => (
      <>
        <Button onClick={() => updateEquationHandler(record.id)}>Edit</Button>
        <Button
          onClick={() => deleteEquationHandler(record.id)}
          style={{ marginLeft: 10 }}
        >
          Delete
        </Button>
      </>
    ),
  },
];
