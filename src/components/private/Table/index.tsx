// #region ---- Core Imports ----
import {
  ZEllipsisVerticalCircleOutlineIcon,
  ZInboxesOutlineIcon,
} from "@/assets";
import { flexRender, Row, Table } from "@tanstack/react-table";
import React from "react";
import { ZClassNames } from "zaions-react-tool-kit";
import {
  ZBox,
  ZCard,
  ZFlex,
  ZPopover,
  ZRUAlignE,
  ZRUDirectionE,
  ZRUJustifyE,
  ZRUScrollbarsE,
  ZRUScrollbarTypeE,
  ZScrollArea,
  ZSpinner,
  ZText,
} from "zaions-react-ui-kit";

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----
interface IZTable<T> {
  table: Table<T>;
  selectId: string;
  inProcessing?: boolean;
  PopoverContent?: (row: Row<T>) => React.ReactNode;
}
// #endregion

const ZTable = <T,>({
  table,
  selectId,
  inProcessing,
  PopoverContent,
}: IZTable<T>): React.ReactElement => {
  return (
    <ZScrollArea
      scrollbars={ZRUScrollbarsE.horizontal}
      type={ZRUScrollbarTypeE.auto}
      style={{ minWidth: 1000 }}
    >
      <ZCard>
        {table?.getHeaderGroups()?.map((_headerInfo, _headerIndex) => {
          return (
            <ZFlex
              align={ZRUAlignE.center}
              className="gap-5 px-2"
              key={_headerIndex}
            >
              {_headerInfo?.headers?.map((_columnInfo, _columnIndex) => {
                return (
                  <ZFlex
                    key={_columnIndex}
                    align={ZRUAlignE.center}
                    className={ZClassNames({
                      "flex-1": _columnInfo?.column?.id !== selectId,
                    })}
                  >
                    {flexRender(
                      _columnInfo?.column?.columnDef?.header,
                      _columnInfo?.getContext()
                    )}
                  </ZFlex>
                );
              })}

              <ZFlex
                align={ZRUAlignE.center}
                justify={ZRUJustifyE.end}
                className="min-w-20"
              >
                Actions
              </ZFlex>
            </ZFlex>
          );
        })}
      </ZCard>

      <ZCard className="flex flex-col mt-3 gap-y-5">
        {inProcessing ? (
          <ZFlex
            direction={ZRUDirectionE.column}
            align={ZRUAlignE.center}
            className="my-5"
          >
            <ZSpinner size="3" />
          </ZFlex>
        ) : table?.getRowModel()?.rows?.length > 0 ? (
          table?.getRowModel()?.rows?.map((_rowInfo, _rowIndex) => {
            return (
              <ZFlex
                align={ZRUAlignE.center}
                className="gap-5 px-2"
                key={_rowIndex}
              >
                {_rowInfo.getAllCells().map((_cellInfo, _cellIndex) => {
                  return (
                    <ZFlex
                      key={_cellIndex}
                      align={ZRUAlignE.center}
                      className={ZClassNames({
                        "flex-1 line-clamp-1 overflow-hidden text-ellipsis":
                          _cellInfo?.column?.id !== selectId,
                      })}
                    >
                      {flexRender(
                        _cellInfo?.column?.columnDef?.cell,
                        _cellInfo?.getContext()
                      )}
                    </ZFlex>
                  );
                })}

                <ZPopover
                  trigger={{
                    children: (
                      <ZFlex
                        align={ZRUAlignE.center}
                        justify={ZRUJustifyE.end}
                        className="min-w-20"
                      >
                        <ZEllipsisVerticalCircleOutlineIcon className="w-6 h-6 cursor-pointer" />
                      </ZFlex>
                    ),
                  }}
                >
                  <ZBox className="flex flex-col *:w-20 *:text-base *:font-normal">
                    {PopoverContent ? PopoverContent(_rowInfo) : null}
                  </ZBox>
                </ZPopover>
              </ZFlex>
            );
          })
        ) : (
          <ZFlex direction={ZRUDirectionE.column} align={ZRUAlignE.center}>
            <ZInboxesOutlineIcon className="w-12 h-12" />
            <ZText className="mt-2 text-xl">No Top ups Found</ZText>
          </ZFlex>
        )}
      </ZCard>
    </ZScrollArea>
  );
};

export default ZTable;
