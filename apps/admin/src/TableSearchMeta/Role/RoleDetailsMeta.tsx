// import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
// import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
// import { RoleQueries } from "~/packages/services/Api/Queries/AdminQueries/Roles"
// import { UPDATE_SUCCESSFULLY } from "~/Constants"
// import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
// import { RoleFormMeta } from "~/Component/Feature/Roles/FormMeta/RoleFormMeta"
// import { REFRESH_PAGE } from "~/packages/utils/EventBus"

export const getRoleDetailsMeta = (role: { [key: string]: any }): IDetailsMeta => {
  // const updateEntity = QueryConstructor(((data) => RoleQueries.update({ ...data, params: { id: role.id } }).then(resp => {
  //   if (resp.success) {
  //     message.success(UPDATE_SUCCESSFULLY)
  //   }
  //   return resp
  // })), [RoleQueries.update])

  const summaryInfo: CardContainer = {
    title: `Role: ${role.name}`,
    cardActions: [
      // <MetaDrivenFormModalOpenButton
      //   formTitle={`Update Role`}
      //   formMeta={RoleFormMeta}
      //   formSubmitApi={updateEntity}
      //   initialFormValue={{ ...role }}
      //   defaultFormValue={{ roleId: role.id }}
      //   buttonLabel={`Update Role`}
      //   iconType="edit"
      //   refreshEventName={REFRESH_PAGE}
      // />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Name', value: role.name },
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summaryInfo]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "roleSummaryTab"
    },
  ]

  return {
    pageTitle: `Role Title - ${role.name}`,
    tabs: tabMetas
  }
}
