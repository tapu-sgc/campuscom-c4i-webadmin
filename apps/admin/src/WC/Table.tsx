import React from "react"
import { Col, Row, } from "antd"
import { FwDataTable } from "@freshworks/crayons/react/FwDataTable"
import { FwPagination } from "@freshworks/crayons/react/FwPagination"
import { IDataTableProps, sortByNumber } from "~/packages/components/ResponsiveTable"
import { DataTableColumn } from "@freshworks/crayons/dist/types/utils/types"
import { DownloadButton } from "~/packages/components/ResponsiveTable/DownloadButton"
import { TableSettings } from "~/packages/components/ResponsiveTable/TableSettings/TableSettings"
import { processTableMetaWithUserMetaConfig } from "~/packages/components/ResponsiveTable/TableMetaShadowingProcessor"
import { IConditionalProps } from "~/packages/components/ResponsiveTable/Responsive"
import { TableColumnSorter } from "~/packages/components/ResponsiveTable/TableColumnSorter"

const DEFAULT_PAGE_SIZE = 20

export interface ITableProps extends IDataTableProps {
  loading?: boolean
  paginationChange: (page: number, pageSize?: number) => void
  conditionalProps: IConditionalProps
  setConditionalProps: (props: IConditionalProps) => void
  downloading: boolean
  setDownloading: (flag: boolean) => void
  paginatedData: any[]
  sortData: (sortByDataIndex: string, sortOrder: "asc" | "desc") => void
}

export const Table = (props: ITableProps) => {
  const total = props.conditionalProps.dataSource?.length
  return (
    <Row style={{ backgroundColor: "#fafafa", ...props.style }}>
      {props.conditionalProps.dataSource && !props.hidePagination && (
        <Col
          flex={"auto"}
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "10px",
            paddingRight: "10px",
            paddingBottom: "10px",
            marginLeft: "5px"
          }}
        >
          {!props.loading && total ? (
            <FwPagination page={props.currentPagination} perPage={DEFAULT_PAGE_SIZE} total={total} onFwChange={({ detail }) => props.paginationChange(detail.page, DEFAULT_PAGE_SIZE)} />
          ) : null}
        </Col>
      )}
      <Col flex={"auto"}>
        <Row
          gutter={4}
          justify="end"
          style={{
            marginTop: "10px",
            marginRight: "10px",
            marginBottom: "10px"
          }}
        >
          <Col flex="auto"></Col>
          {!props.disableSorting && !props.loading && total ? (
            <Col flex="auto">
              <TableColumnSorter sortData={props.sortData} columns={props.columns} />
            </Col>
          ) : null}
          {props.actions &&
            props.actions?.length > 0 &&
            props.actions.map((action, i) => (
              <Col key={i} flex="none">
                {action}
              </Col>
            ))}
          {props.searchFunc &&
            props.searchParams &&
            !props.isModal &&
            props.conditionalProps &&
            props.conditionalProps.dataSource &&
            props.conditionalProps.dataSource.length > 0 &&
            !props.hideDownload && (
              <Col flex="none">
                <DownloadButton
                  searchFunc={props.searchFunc}
                  searchParams={props.searchParams}
                  downloading={props.downloading}
                  setDownloading={props.setDownloading}
                />
              </Col>
            )}
          {props.tableName && !props.hideSettings && (
            <Col flex="none">
              <TableSettings
                tableName={props.tableName}
                allColumns={props.columns}
                activeColumns={
                  props.conditionalProps.columns
                    ? props.conditionalProps.columns.sort((x: any, y: any) =>
                      sortByNumber(y.columnPosition, x.columnPosition)
                    )
                    : []
                }
                reload={() => {
                  processTableMetaWithUserMetaConfig(props.columns, props.tableName).then((response) => {
                    props.setConditionalProps({
                      ...props.conditionalProps,
                      columns: response
                    })
                  })
                }}
              />
            </Col>
          )}
        </Row>
      </Col>
      <Col span={24}>
        <FwDataTable
          columns={(props.conditionalProps.columns || []).map(c => ({ key: c.dataIndex, text: c.title, formatData: (data: any) => c.render2 ? c.render2(data) : data, customTemplate: c.customTemplate })) as DataTableColumn[]}
          rows={props.paginatedData}
          rowActions={props.rowActions}
          shimmerCount={!!props.loading ? DEFAULT_PAGE_SIZE : 0}
          isLoading={!!props.loading} />
      </Col>
    </Row>
  )
}