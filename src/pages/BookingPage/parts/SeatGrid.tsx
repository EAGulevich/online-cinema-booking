import React, { useRef } from 'react';
import { Button, Flex, Table } from 'antd';

import { getTableColumns } from './getTableColumns.tsx';

import type { SeatsTableDataType } from './types.ts';

interface SeatGridProps {
  rows: number;
  seatsPerRow: number;
}

const SeatGrid: React.FC<SeatGridProps> = ({ rows, seatsPerRow }) => {
  const selectedSeatsRef = useRef<Set<string>>(new Set());

  const columns = getTableColumns({
    seatsPerRow,
    onSelect: ({ seat, row }) => {
      const seatsSet = selectedSeatsRef.current;
      const seatFullName = `${row}-${seat}`;
      if (!seatsSet.has(seatFullName)) {
        seatsSet.add(seatFullName);
      } else {
        seatsSet.delete(seatFullName);
      }
    },
  });

  const dataSource = Array.from({ length: rows }, (_, rowIndex) => ({
    key: rowIndex,
    rowIndex,
    rowLabel: `Ряд ${rowIndex + 1}`,
    ...Object.fromEntries(
      Array.from({ length: seatsPerRow }, (_, seatIndex) => [
        `seat${seatIndex}`,
        `_`,
      ])
    ),
  }));

  return (
    <Flex vertical gap={'large'} style={{ marginTop: '20px' }}>
      <Table<SeatsTableDataType>
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
        size="small"
        scroll={{ x: 'max-content', y: 400 }}
        sticky
      />
      <Flex justify={'center'}>
        <Button
          onClick={() => {
            const selected = Array.from(selectedSeatsRef.current);
            console.log('selected', selected);
          }}
        >
          Забронировать
        </Button>
      </Flex>
    </Flex>
  );
};

export default SeatGrid;
