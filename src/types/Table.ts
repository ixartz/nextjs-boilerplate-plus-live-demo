import type { RowData } from '@tanstack/react-table';
import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line ts/consistent-type-definitions, unused-imports/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
  }
}
