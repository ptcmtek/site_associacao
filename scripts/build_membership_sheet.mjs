import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "outputs/inscricoes-associacao";
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const entries = workbook.worksheets.add("Inscrições");
const summary = workbook.worksheets.add("Resumo");
const lists = workbook.worksheets.add("Listas");

const navy = "#102A43";
const blue = "#1677FF";
const sky = "#DDEEFF";
const green = "#20A779";
const mint = "#DDF7EF";
const yellow = "#F5B942";
const coral = "#FF6B5E";
const muted = "#52677B";
const line = "#D9E4EE";

// Listas editáveis usadas nas validações.
lists.getRange("A1:D1").values = [["Tipo de inscrição", "Estado da inscrição", "Estado do pagamento", "Consentimento"]];
lists.getRange("A2:A3").values = [["Novo sócio"], ["Renovação"]];
lists.getRange("B2:B5").values = [["Recebida"], ["Em validação"], ["Ativa"], ["Cancelada"]];
lists.getRange("C2:C6").values = [["Não aplicável"], ["Pendente"], ["Pago"], ["Recusado"], ["Expirado"]];
lists.getRange("D2:D3").values = [["Sim"], ["Não"]];
lists.getRange("A1:D6").format = { borders: { preset: "inside", style: "thin", color: line } };
lists.getRange("A1:D1").format = { fill: navy, font: { bold: true, color: "#FFFFFF" }, rowHeight: 30 };
lists.getRange("A2:D6").format.fill = "#F8FBFE";
lists.getRange("A:D").format.columnWidth = 22;
lists.showGridLines = false;
lists.freezePanes.freezeRows(1);

// Folha principal, preparada para 500 inscrições.
entries.getRange("A1:R1").merge();
entries.getRange("A1").values = [["Associação de Pais de Pardilhó — Registo de Sócios"]];
entries.getRange("A1:R1").format = {
  fill: navy,
  font: { bold: true, color: "#FFFFFF", size: 18 },
  verticalAlignment: "center",
  rowHeight: 42,
};
entries.getRange("A2:R2").merge();
entries.getRange("A2").values = [["Importe ou copie aqui as respostas do formulário. Os campos MB WAY ficam reservados para uma fase futura."]];
entries.getRange("A2:R2").format = { fill: sky, font: { color: muted, italic: true }, rowHeight: 30 };

const headers = [[
  "Data/hora", "ID", "Tipo de inscrição", "Nome completo", "Email", "Telemóvel",
  "Nome do educando", "Ano/turma", "Estabelecimento", "2.º educando (opcional)",
  "Consentimento RGPD", "Estado da inscrição", "Data de ativação", "Valor da quota",
  "Estado do pagamento", "Referência MB WAY", "Data do pagamento", "Notas internas"
]];
entries.getRange("A4:R4").values = headers;
entries.getRange("A4:R4").format = {
  fill: blue,
  font: { bold: true, color: "#FFFFFF" },
  wrapText: true,
  verticalAlignment: "center",
  rowHeight: 44,
};

// Linha de exemplo claramente identificada, útil para perceber o formato após upload.
entries.getRange("A5:R5").values = [[
  new Date("2026-08-09T10:00:00"), "SOC-0001", "Novo sócio", "Exemplo — apagar esta linha",
  "exemplo@email.pt", "912345678", "Nome do educando", "5.º A", "Escola de exemplo", "",
  "Sim", "Recebida", null, 0, "Não aplicável", "", null, "Linha demonstrativa"
]];
entries.getRange("A5:R5").format = { fill: "#FFF8E1", font: { color: muted, italic: true } };

entries.getRange("A5:A504").format.numberFormat = "yyyy-mm-dd hh:mm";
entries.getRange("M5:M504").format.numberFormat = "yyyy-mm-dd";
entries.getRange("N5:N504").format.numberFormat = "€#,##0.00";
entries.getRange("Q5:Q504").format.numberFormat = "yyyy-mm-dd hh:mm";
entries.getRange("B5:B504").format.numberFormat = "@";
entries.getRange("F5:F504").format.numberFormat = "@";
entries.getRange("P5:P504").format.numberFormat = "@";

entries.getRange("C5:C504").dataValidation = { rule: { type: "list", formula1: "'Listas'!$A$2:$A$3" } };
entries.getRange("K5:K504").dataValidation = { rule: { type: "list", formula1: "'Listas'!$D$2:$D$3" } };
entries.getRange("L5:L504").dataValidation = { rule: { type: "list", formula1: "'Listas'!$B$2:$B$5" } };
entries.getRange("O5:O504").dataValidation = { rule: { type: "list", formula1: "'Listas'!$C$2:$C$6" } };

entries.getRange("A4:R504").format.borders = { insideHorizontal: { style: "thin", color: line } };
entries.getRange("A5:R504").format.verticalAlignment = "top";
entries.getRange("D5:R504").format.wrapText = true;
entries.freezePanes.freezeRows(4);
entries.freezePanes.freezeColumns(2);
entries.showGridLines = false;

const widths = [18, 13, 18, 28, 27, 16, 24, 13, 25, 24, 18, 19, 17, 15, 19, 20, 19, 32];
widths.forEach((width, index) => entries.getRangeByIndexes(0, index, 504, 1).format.columnWidth = width);

const table = entries.tables.add("A4:R504", true, "InscricoesTable");
table.style = "TableStyleMedium2";
table.showFilterButton = true;
table.showBandedRows = true;

entries.getRange("L5:L504").conditionalFormats.add("containsText", { text: "Ativa", format: { fill: mint, font: { color: "#11684C", bold: true } } });
entries.getRange("L5:L504").conditionalFormats.add("containsText", { text: "Cancelada", format: { fill: "#FFE6E3", font: { color: "#A9342A" } } });
entries.getRange("O5:O504").conditionalFormats.add("containsText", { text: "Pago", format: { fill: mint, font: { color: "#11684C", bold: true } } });
entries.getRange("O5:O504").conditionalFormats.add("containsText", { text: "Pendente", format: { fill: "#FFF1CB", font: { color: "#7A5200" } } });

// Resumo simples e auditável.
summary.getRange("A1:F1").merge();
summary.getRange("A1").values = [["Resumo de inscrições"]];
summary.getRange("A1:F1").format = { fill: navy, font: { bold: true, color: "#FFFFFF", size: 18 }, rowHeight: 42 };
summary.getRange("A3:B7").values = [
  ["Indicador", "Total"],
  ["Inscrições registadas", null],
  ["Sócios ativos", null],
  ["Inscrições recebidas", null],
  ["Pagamentos confirmados (futuro)", null],
];
summary.getRange("B4").formulas = [["=COUNTA('Inscrições'!$D$5:$D$504)"]];
summary.getRange("B5").formulas = [["=COUNTIF('Inscrições'!$L$5:$L$504,\"Ativa\")"]];
summary.getRange("B6").formulas = [["=COUNTIF('Inscrições'!$L$5:$L$504,\"Recebida\")"]];
summary.getRange("B7").formulas = [["=COUNTIF('Inscrições'!$O$5:$O$504,\"Pago\")"]];
summary.getRange("A3:B3").format = { fill: blue, font: { bold: true, color: "#FFFFFF" }, rowHeight: 30 };
summary.getRange("A4:A7").format = { fill: sky, font: { bold: true } };
summary.getRange("B4:B7").format = { fill: "#FFFFFF", font: { bold: true, color: navy, size: 16 }, horizontalAlignment: "center", numberFormat: "#,##0" };
summary.getRange("A3:B7").format.borders = { preset: "all", style: "thin", color: line };
summary.getRange("A:A").format.columnWidth = 38;
summary.getRange("B:B").format.columnWidth = 16;
summary.getRange("A9:F9").merge();
summary.getRange("A9").values = [["Nota: apague a linha demonstrativa na folha “Inscrições” antes de começar a recolher respostas."]];
summary.getRange("A9:F9").format = { fill: "#FFF1CB", font: { color: "#7A5200", italic: true }, rowHeight: 30 };
summary.showGridLines = false;

const inspect = await workbook.inspect({ kind: "table", range: "Resumo!A1:F9", include: "values,formulas", tableMaxRows: 12, tableMaxCols: 8 });
console.log(inspect.ndjson);
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 100 }, summary: "formula errors" });
console.log(errors.ndjson);

for (const [sheetName, range, fileName] of [
  ["Resumo", "A1:F9", "resumo.png"],
  ["Inscrições", "A1:R9", "inscricoes.png"],
  ["Listas", "A1:D6", "listas.png"],
]) {
  const preview = await workbook.render({ sheetName, range, scale: 1.2, format: "png" });
  await fs.writeFile(`${outputDir}/${fileName}`, new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/registo-socios-associacao-pais.xlsx`);
