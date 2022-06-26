import React, { useEffect, useState } from "react"
import { IDeviceView, useDeviceViews } from "~/packages/components/Hooks/useDeviceViews"
import { TableViewForDesktop } from "~/packages/components/ResponsiveTable/Responsive/TableViewForDesktop"
import { IDataTableProps, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ListViewforMobile } from "./ListViewforMobile"
import { TableProps } from "antd/lib/table"
import { useFirstRender } from "~/packages/components/Hooks/useFirstRender"
import { eventBus, REFRESH_MODAl, REFRESH_PAGE } from "~/packages/utils/EventBus"
import { processTableMetaWithUserMetaConfig } from "~/packages/components/ResponsiveTable/TableMetaShadowingProcessor"
import { objectToQueryString } from "~/packages/utils/ObjectToQueryStringConverter"
import { querystringToObject } from "~/packages/utils/QueryStringToObjectConverter"
import { getAndScrollToPosition } from "~/packages/components/ResponsiveTable/ManageScroll"
import { Table } from "~/WC/Table"

export interface IConditionalProps extends TableProps<{ [key: string]: string }> {
  columns?: IDataTableProps['columns'] & TableColumnType
}

const DEFAULT_PAGE_SIZE = 20
export const ResponsiveTable = (props: IDataTableProps & { useWC?: boolean }) => {
  const [desktopView, setDesktopView] = useState(true)
  useDeviceViews((deviceViews: IDeviceView) => {
    setDesktopView(deviceViews.desktop)
  })

  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [paginatedData, setPaginatedData] = useState<any[]>([])
  const [currentPagination, setCurrentPagination] = useState<number>(1)
  const firstRender = useFirstRender()

  const loadDataFromSearchFunc = (refreshParams?: { [key: string]: any }) => {
    processTableMetaWithUserMetaConfig(props.columns, props.tableName).then((columnsConfigByUser: TableColumnType) => {
      if (loading) {
        return
      } else if (props.dataSource) {
        setTableProps(columnsConfigByUser)
      } else if ((props.searchParams || refreshParams) && props.searchFunc) {
        setLoading(true)
        typeof props.searchParams === "object" &&
          Object.keys(props.searchParams).forEach((key) => {
            if (props.searchParams[key] === "") delete props.searchParams[key]
          })
        props.searchFunc({ params: props.searchParams || refreshParams }).then((x) => {
          if (x.success) {
            let tableData: Array<any> = []
            if (Array.isArray(x.data)) {
              tableData = x.data.map((y: any, i: number) => {
                if (!props.rowKey) y.rowKey = i
                return y
              })
            }
            setTableProps(columnsConfigByUser, tableData)
            props.dataLoaded && props.dataLoaded(tableData)
          }
          setTimeout(() => {
            setLoading(false)
            getAndScrollToPosition()
          }, 0)
        })
      }
    })
  }
  useEffect(() => {
    if (!firstRender) loadDataFromSearchFunc()
    // eslint-disable-next-line
  }, [props.dataSource, props.searchParams, props.columns])

  useEffect(() => {
    processTableMetaWithUserMetaConfig(props.columns, props.tableName).then(setTableProps)

    const queryParams = querystringToObject()
    if (queryParams["pagination"] && props.setCurrentPagination)
      props.setCurrentPagination(Number(queryParams["pagination"]))

    if (props.searchFunc) {
      const eventName = props.isModal ? REFRESH_MODAl : props.refreshEventName ? props.refreshEventName : REFRESH_PAGE
      eventBus.subscribe(eventName, loadDataFromSearchFunc)
      eventBus.publish(eventName)
      return () => {
        eventBus.unsubscribe(eventName)
      }
    } else {
      loadDataFromSearchFunc()
    }

    // eslint-disable-next-line
  }, [])

  const [conditionalProps, setConditionalProps] = useState<IConditionalProps>({})
  const setTableProps = (columnsConfigByUser: TableColumnType, data: any = []) => {
    const _conditionalProps: IConditionalProps = {
      ...props,
      columns: columnsConfigByUser.map((x) => {
        if (x.title === "" || !x.title || x.title === "Action" || x.title === "Published" || props.disableSorting) {
          return x
        }
        const dataIndex: string = x.dataIndex as string
        x.sorter = (a: any, b: any) => {
          const aa =
            a[dataIndex] === undefined || a[dataIndex] === null || a[dataIndex] === false ? "" : String(a[dataIndex])
          const bb =
            b[dataIndex] === undefined || b[dataIndex] === null || b[dataIndex] === false ? "" : String(b[dataIndex])
          return aa.localeCompare(bb)
        }
        return x
      })
    }

    _conditionalProps.dataSource = props.dataSource ? props.dataSource : data
    if (Array.isArray(_conditionalProps.dataSource)) {
      !props.hidePagination && setPaginatedData(_conditionalProps.dataSource?.filter((x, i) => i < DEFAULT_PAGE_SIZE))
      props.hidePagination && setPaginatedData(_conditionalProps.dataSource)
    }

    _conditionalProps.scroll = { x: props.columns.length }
    _conditionalProps.rowSelection = props.rowSelection
    // _conditionalProps.rowKey = props.rowKey ? props.rowKey : "rowKey"
    setConditionalProps(_conditionalProps)
  }

  const sortData = (sortByDataIndex: string, sortOrder: "asc" | "desc") => {
    const sorter = props.columns.find(c => c.dataIndex === sortByDataIndex)?.sorter

    const sortedDataSource = (conditionalProps.dataSource as any[]).sort((a: any, b: any) => {
      if (typeof sorter === 'function') {
        return sortOrder === "asc" ? sorter(a[sortByDataIndex], b[sortByDataIndex])
          : sorter(b[sortByDataIndex], a[sortByDataIndex])
      }
      const aa =
        a[sortByDataIndex] === undefined || a[sortByDataIndex] === null || a[sortByDataIndex] === false
          ? ""
          : String(a[sortByDataIndex])
      const bb =
        b[sortByDataIndex] === undefined || b[sortByDataIndex] === null || b[sortByDataIndex] === false
          ? ""
          : String(b[sortByDataIndex])
      return sortOrder === "asc" ? aa.localeCompare(bb) : bb.localeCompare(aa)
    })
    setConditionalProps({
      ...conditionalProps,
      dataSource: sortedDataSource
    })
    paginationChange(1, DEFAULT_PAGE_SIZE, sortedDataSource)
  }

  const paginationChange = (page: number, pageSize = DEFAULT_PAGE_SIZE, sortedData?: any[]) => {
    if (props.setCurrentPagination) props.setCurrentPagination(page)
    else setCurrentPagination(page)

    const quaryParams = { ...querystringToObject(), pagination: page }
    const _queryString = objectToQueryString(Object.keys(quaryParams).length > 0 ? quaryParams : null)
    window.history && window.history.pushState({}, "", _queryString)

    if (sortedData && Array.isArray(sortedData)) {
      const __dataSource = sortedData.slice(page === 1 ? 0 : page * pageSize - pageSize, page * pageSize)
      setPaginatedData(__dataSource)
    } else if (conditionalProps && Array.isArray(conditionalProps.dataSource)) {
      const __dataSource = conditionalProps.dataSource.slice(
        page === 1 ? 0 : page * pageSize - pageSize,
        page * pageSize
      )
      setPaginatedData(__dataSource)
    }
  }

  return props.useWC ?
    <Table
      {...props}
      title={() => props.title || props.tableName}
      loading={!!props.loading || loading}
      currentPagination={props.currentPagination || currentPagination}
      conditionalProps={conditionalProps}
      setConditionalProps={setConditionalProps}
      downloading={downloading}
      setDownloading={setDownloading}
      paginatedData={paginatedData}
      paginationChange={paginationChange}
      sortData={sortData}
      rowActions={props.rowActions}
    /> :
    desktopView || conditionalProps.rowSelection ? (
      <TableViewForDesktop
        {...props}
        title={() => props.title || props.tableName}
        loading={props.loading || loading}
        currentPagination={props.currentPagination || currentPagination}
        conditionalProps={conditionalProps}
        setConditionalProps={setConditionalProps}
        downloading={downloading}
        setDownloading={setDownloading}
        paginatedData={paginatedData}
        paginationChange={paginationChange}
      />
    ) : (
      <ListViewforMobile
        {...props}
        loading={props.loading || loading}
        currentPagination={props.currentPagination || currentPagination}
        conditionalProps={conditionalProps}
        setConditionalProps={setConditionalProps}
        downloading={downloading}
        setDownloading={setDownloading}
        paginatedData={paginatedData}
        paginationChange={paginationChange}
      />
    )
}
