import React, { useMemo } from 'react'

import millify from 'millify';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getSortedRowModel } from '@tanstack/react-table';
import cx from 'classnames';

import { TickerProduct } from '@/types/products'

import styles from './markets-table.module.css';
import Text from '@/lib/ui/text/text';


function createColumnDef():  ColumnDef<TickerProduct>[] {

    return [
        {
          accessorKey: 'symbol',
          header: 'Symbol',
          cell: ({ row: { original: { symbol } } }) => {
            return <Text size='small'>{symbol}</Text>
          },
          enableSorting: true,
          sortDescFirst: false,
        },
        {
          accessorKey: 'description',
          header: 'Description',
          enableSorting: false,
          cell: ({ row: { original: { description } } }) => {
            return <Text size='small'>{description}</Text>
          }
        },
        {
          accessorKey: 'close',
          header: 'Last Price',
          enableSorting: false,
          cell: ({ row: { original: { close } } }) => {
            return <Text size='small'>{`${millify(Number(close), { precision: 3 })}`}</Text>
          }
        },
        {
          accessorKey: 'mark_change_24h',
          header: '24h. Change',
          enableSorting: false,
          cell: ({ row: { original: { mark_change_24h } } }) => {
            return <Text size='small' color={Number(mark_change_24h) > 0 ? 'success' : 'error'}>{mark_change_24h}</Text>
          }
        },
        {
          accessorKey: 'turnover_usd',
          header: 'Volume',
          enableSorting: false,
          cell: ({ row: { original: { turnover_usd } } }) => {
            return <Text size='small'>{turnover_usd}</Text>
          }
        },
        {
          accessorKey: 'oi_value_usd',
          header: 'Open Interest',
          enableSorting: false,
          cell: ({ row: { original: { oi_value_usd } } }) => {
            return <Text size='small'>{oi_value_usd}</Text>
          }
        },
      ]
}

const MarketsTable = ({ data }: { data?: TickerProduct[] }) => {

  const columns = useMemo(() => createColumnDef(), []);

  const table = useReactTable({
    columns,
    data: data ?? [],
    debugTable: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

  });

  return (
    <div className={styles.tableContainer}>
        <table className={styles.table}>
        <thead>
            {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={styles.tableHeader}>
                {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan} className={styles.tableHeader} style={{ width: `${header.getSize()}px` }}>
                    <div className={cx({ [styles.pointer]: header.column.getCanSort() })} onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(header.column.columnDef.header, header.getContext())} {header.column.getCanSort() && (
                            header.column.getIsSorted() === 'asc' && '↑'
                            || header.column.getIsSorted() === 'desc' && '↓'
                         )}
                         {
                            header.column.getCanSort() && !header.column.getIsSorted() && '↕'
                         }
                    </div>
                </th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody>
            {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.tableRow}>
                {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.tableCell}>
                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
                ))}
            </tr>
            ))}
        </tbody>
        </table>
  </div>
  )
}

export default MarketsTable