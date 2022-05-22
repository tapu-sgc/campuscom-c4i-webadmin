import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean } from "~/packages/components/ResponsiveTable"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { IdentityProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/IdentityProviders"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { IdentityProviderFormMeta } from "~/Component/Feature/IdentityProviders/FormMeta/IdentityProviderFormMeta"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { SummaryTablePopover } from "~/packages/components/Popover/SummaryTablePopover"

export const getIdentityProviderDetailsMeta = (identityProvider: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => IdentityProviderQueries.update({ ...data, params: { id: identityProvider.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [IdentityProviderQueries.update])

  const summaryInfo: CardContainer = {
    title: `Identity Provider: ${identityProvider.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Identity Provider`}
        formMeta={IdentityProviderFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...identityProvider, configuration: JSON.stringify(identityProvider.configuration) }}
        defaultFormValue={{ identityProviderId: identityProvider.id }}
        buttonLabel={`Update Identity Provider`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Provider Type', value: identityProvider.provider_type, },
      { label: 'Name', value: identityProvider.name, },
      { label: 'Slug', value: identityProvider.slug, },
      { label: 'Is Sandboxed?', value: identityProvider.is_sandboxed, render: renderBoolean },
      { label: 'Is School Provider?', value: identityProvider.is_school_provider, render: renderBoolean },
      {
        label: 'Configuration', render: () => (
          <SummaryTablePopover card={{
            title: 'Configuration',
            contents: [
              {
                label: 'Text',
                value: identityProvider.configuration?.text
              },
            ]
          }} />
        ),
      },
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
      helpKey: "identityProviderSummaryTab"
    },
  ]

  return {
    pageTitle: `Identity Provider Title - ${identityProvider.name}`,
    tabs: tabMetas
  }
}
