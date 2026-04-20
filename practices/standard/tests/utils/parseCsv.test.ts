import { describe, expect, test } from '@rstest/core';
import { inferSchema, rowsToDataset } from 'src/utils/dataset';
import { parseCsv } from 'src/utils/parseCsv';
import { type DatasetColumn } from '@visactor/vquery';

describe('CSV Utils', () => {
  describe('parseCsv', () => {
    test('should parse simple CSV', () => {
      const csv = 'name,age\nalice,20\nbob,25';
      expect(parseCsv(csv)).toEqual([
        ['name', 'age'],
        ['alice', '20'],
        ['bob', '25'],
      ]);
    });

    test('should handle quoted fields', () => {
      const csv = '"name, last",age\n"Alice ""Wonder""",20';
      expect(parseCsv(csv)).toEqual([
        ['name, last', 'age'],
        ['Alice "Wonder"', '20'],
      ]);
    });

    test('should handle newlines in quoted fields', () => {
      const csv = 'id,note\n1,"line1\nline2"';
      expect(parseCsv(csv)).toEqual([
        ['id', 'note'],
        ['1', 'line1\nline2'],
      ]);
    });

    test('should remove BOM', () => {
      const csv = '\uFEFFname,age\nalice,20';
      const result = parseCsv(csv);
      expect(result[0][0]).toBe('name');
    });

    test('should handle different line endings', () => {
      const csv = 'a,b\r\n1,2\r3,4';
      expect(parseCsv(csv)).toEqual([
        ['a', 'b'],
        ['1', '2'],
        ['3', '4'],
      ]);
    });
  });

  describe('dataset utils', () => {
    const headers = ['Name', 'Age', 'Birthday'];
    const rows = [
      ['Alice', '20', '2000-01-01'],
      ['Bob', '25', '1995/12/31'],
      ['Charlie', '', ''],
    ];

    test('inferSchema should detect types correctly', () => {
      const schema = inferSchema(headers, rows);
      expect(schema).toEqual([
        { name: 'Name', type: 'string' },
        { name: 'Age', type: 'number' },
        { name: 'Birthday', type: 'date' },
      ]);
    });

    test('rowsToDataset should map rows to objects', () => {
      const schema: DatasetColumn[] = [
        { name: 'Name', type: 'string' },
        { name: 'Age', type: 'number' },
        { name: 'Birthday', type: 'date' },
      ];

      const dataset = rowsToDataset(headers, rows, schema);
      expect(dataset).toHaveLength(3);
      expect(dataset[0]).toEqual({
        Name: 'Alice',
        Age: 20,
        Birthday: '2000-01-01',
      });
      expect(dataset[2]).toEqual({
        Name: 'Charlie',
        Age: null,
        Birthday: '',
      });
    });

    test('rowsToDataset should filter empty rows', () => {
      const emptyRows = [
        ['', '', ''],
        ['   ', '', ''],
      ];
      const dataset = rowsToDataset(headers, emptyRows, []);
      expect(dataset).toHaveLength(0);
    });
  });
});
