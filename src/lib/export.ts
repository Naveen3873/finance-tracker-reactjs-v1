import { saveAs } from "file-saver";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import type { Transaction } from "@/types";

export function exportTransactionsCsv(rows: Transaction[], filename = "transactions.csv") {
  const csv = Papa.unparse(rows);
  saveAs(new Blob([csv], { type: "text/csv;charset=utf-8" }), filename);
}

export function exportTransactionsExcel(rows: Transaction[], filename = "finance-report.xlsx") {
  const sheet = XLSX.utils.json_to_sheet(rows);
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, "Transactions");
  const out = XLSX.write(book, { type: "array", bookType: "xlsx" });
  saveAs(new Blob([out], { type: "application/octet-stream" }), filename);
}
