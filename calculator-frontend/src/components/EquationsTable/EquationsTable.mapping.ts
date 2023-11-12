import { ServerTableData, TableData } from "./EquationsTable.typings.ts";
import { FieldType } from "../UpdateEquationModal/UpdateEquationModal.typings.ts";

export const mapToTableData = (equations: ServerTableData[]): TableData[] =>
  equations.map((equation, index) => ({
    ...equation,
    equation: equation.body,
    number: index + 1,
  }));

export const mapToFieldType = (equation: TableData): FieldType => ({
  id: equation.id,
  body: equation.equation,
  root1: equation.roots[0],
  root2: equation.roots[1],
});
