
import { renderBoolean, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { CourseQueries } from "~/packages/services/Api/Queries/AdminQueries/Courses"

export const getCourseListTableColumns = (isModal = false, CourseID?: number): ITableMeta => {
  const columns: TableColumnType = [
    {
      title: "Title",
      dataIndex: "__meta",
      customTemplate: (createElement, props) => {
        return createElement('a', {href: `/institute/course/${props.id}`}, props.name)
      },
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    {
      title: "Course Provider",
      dataIndex: "course_provider",
      //render2: (data: any) => data.name,
      customTemplate: (createElement, props) => {
        return createElement('a', {href: `/administration/course-provider/${props.id}`}, props.name)
      },
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Content Ready",
      dataIndex: "content_ready",
      render: (text: any, record: any) => renderBoolean(text),
      render2: (data: any) => renderBoolean(data),
    },
    {
      title: "Active Status",
      dataIndex: "active_status",
      render: (text: any, record: any) => renderBoolean(text),
      render2: (data: any) => renderBoolean(data),
    }
    // ,
    // {
    //   title: "Actions",
    //   dataIndex: "StatusCode"
    // }
  ]

  return {
    columns,
    searchFunc: CourseQueries.getPaginatedList,
    tableName: 'Course',
    rowActions: [{
      name: 'View',
      handler: (row) => window.location.href = `/institute/course/${row.id}`
    }]
  }
}
