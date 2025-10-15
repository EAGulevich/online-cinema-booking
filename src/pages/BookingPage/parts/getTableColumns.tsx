import { Checkbox, type TableColumnsType } from 'antd';

import type { SeatsTableDataType, SelectedSeat } from './types.ts';

type GetTableColumnsParams = {
  seatsPerRow: number;
  onSelect: (selectedSeat: SelectedSeat) => void;
};

export const getTableColumns = ({
  seatsPerRow,
  onSelect,
}: GetTableColumnsParams): TableColumnsType<SeatsTableDataType> => {
  return [
    {
      key: 'rowLabel',
      dataIndex: 'rowLabel',
      fixed: 'left',
      width: 100,
    },
    ...Array.from(
      { length: seatsPerRow },
      (_, index): TableColumnsType<SeatsTableDataType>[number] => {
        const inxNumber = index + 1;
        return {
          key: `seat${inxNumber}`,
          title: inxNumber,
          width: 40,
          align: 'center',
          render: (_, record) => {
            const rowNumber = record.rowIndex + 1;

            return (
              <Checkbox
                onChange={() =>
                  onSelect({
                    row: rowNumber,
                    seat: inxNumber,
                  })
                }
                title={`Ряд ${rowNumber}, Место ${inxNumber}`}
              />
            );
          },
        };
      }
    ),
  ];
};
