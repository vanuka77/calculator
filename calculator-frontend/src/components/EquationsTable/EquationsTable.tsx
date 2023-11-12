import { getColumns } from "./EquationsTable.columns.tsx";
import { Button, Checkbox, Input, Table } from "antd";
import { FC } from "react";
import { useEquationsTable } from "./useEquationsTable.tsx";
import styles from "./EquationsTable.module.css";
import { UpdateEquationModal } from "../UpdateEquationModal/UpdateEquationModal.tsx";

const { Search } = Input;
export const EquationsTable: FC = () => {
  const {
    dataSource,
    notificationContextHolder,
    isLoading,
    deleteEquationHandler,
    updateEquationModal,
    currentEquation,
    updateEquationHandler,
    setOnlyWithOneRootHandler,
    onSearch,
  } = useEquationsTable();

  return (
    <div className={styles.wrapper}>
      {notificationContextHolder}
      <Search placeholder="Пошук за коренем" allowClear onChange={onSearch} />
      <br />
      <Checkbox onChange={setOnlyWithOneRootHandler}>
        Показати рівняння тільки з 1 коренем
      </Checkbox>
      <br />
      <Button type="primary" onClick={updateEquationModal.open}>
        Додати рівняння
      </Button>
      <Table
        columns={getColumns({ deleteEquationHandler, updateEquationHandler })}
        dataSource={dataSource}
        loading={isLoading}
        pagination={false}
      />
      <UpdateEquationModal
        modal={updateEquationModal}
        currentEquation={currentEquation}
      />
    </div>
  );
};
