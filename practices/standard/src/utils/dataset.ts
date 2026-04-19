import { type DatasetColumn } from '@visactor/vquery';
import { type LocalRow } from './localConnector';

function isLikelyDate(value: string): boolean {
  if (!value || value.length < 6) return false;
  return /[-/]/.test(value) && !Number.isNaN(Date.parse(value));
}

export function inferSchema(
  headers: string[],
  rows: string[][],
): DatasetColumn[] {
  return headers.map((header, index) => {
    const values = rows
      .map((row) => row[index]?.trim() ?? '')
      .filter((value) => value.length > 0)
      .slice(0, 100); // Sample first 100 rows

    if (
      values.length > 0 &&
      values.every((value) => Number.isFinite(Number(value)))
    ) {
      return { name: header, type: 'number' };
    }

    if (values.length > 0 && values.every(isLikelyDate)) {
      return { name: header, type: 'date' };
    }

    return { name: header, type: 'string' };
  });
}

export function rowsToDataset(
  headers: string[],
  rows: string[][],
  schema: DatasetColumn[],
): LocalRow[] {
  const schemaByName = new Map(schema.map((field) => [field.name, field.type]));

  return rows
    .map((values) => {
      const row: LocalRow = {};

      headers.forEach((header, index) => {
        const rawValue = values[index]?.trim() ?? '';
        const fieldType = schemaByName.get(header);

        if (fieldType === 'number') {
          const numValue = Number(rawValue);
          row[header] =
            rawValue === '' || Number.isNaN(numValue) ? null : numValue;
          return;
        }

        row[header] = rawValue;
      });

      return row;
    })
    .filter((row) =>
      Object.values(row).some((value) => value !== '' && value !== null),
    );
}
