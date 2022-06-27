import React, { useEffect, useState } from "react"
import { Form } from "antd"
import { FormDropDown } from "~/packages/components/Form/FormDropDown"
import { TableColumnType } from "~/packages/components/ResponsiveTable"

export const TableColumnSorter = (props: {
  sortData: (sortByDataIndex: string, sortOrder: "asc" | "desc") => void
  columns: TableColumnType
}) => {
  const [formInstance] = Form.useForm()
  const [options, setOptions] = useState<any[]>([])

  useEffect(() => {
    const filteredColums = props.columns.filter(
      (x) => !!x.dataIndex && x.title !== "Action" && x.title !== "Published" && !x.hidden
    )
    let _options: any[] = [{ label: "No Sort", value: undefined }]
    for (let i = 0; i < filteredColums.length; i++) {
      const x = filteredColums[i]
      _options = [
        ..._options,
        { label: `${x.title} Asc`, value: `${x.dataIndex}##asc` },
        { label: `${x.title} Desc`, value: `${x.dataIndex}##desc` }
      ]
    }
    setOptions(_options)
  }, [props.columns])

  return (
    <Form>
      <FormDropDown
        formInstance={formInstance}
        label="Sort"
        ariaLabel="Sort by Table Column"
        fieldName={""}
        options={options}
        onSelectedItems={(x) => {
          if (x && typeof x === "string") {
            const [dataIndex, sortDirection] = (x as string).split("##")
            props.sortData(dataIndex, sortDirection as "asc" | "desc")
          }
        }}
      />
    </Form>
  )
}
