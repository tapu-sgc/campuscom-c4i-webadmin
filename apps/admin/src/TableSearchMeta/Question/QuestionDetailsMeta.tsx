import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderHtml, renderJson, renderLink, renderBoolean } from "~/packages/components/ResponsiveTable/tableUtils"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { QuestionFormMeta } from "~/Component/Feature/Questions/FormMeta/QuestionFormMeta"
import { QuestionQueries } from "~/packages/services/Api/Queries/AdminQueries/Questions"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"
import { convertToString } from "~/packages/utils/mapper"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const getQuestionDetailsMeta = (question: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => QuestionQueries.update({ ...data, params: { id: question.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [QuestionQueries.update])

  const summaryInfo: CardContainer = {
    title: `Question: ${convertToString(question.title, true)}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Question`}
        formMeta={QuestionFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{
          ...question,
          provider_ref: question.provider?.id,
          autocomplete: question.configuration?.autocomplete,
          options: JSON.stringify(question.configuration?.options),
          multiple: question.configuration?.multiple,
          max_file_size: question.configuration?.max_file_size,
          file_types: question.configuration?.file_types,
          required: question.configuration?.required,
          default_value: question.configuration?.default_value,
          placeholder: question.configuration?.placeholder,
          help_text: question.configuration?.help_text,
        }}
        defaultFormValue={{ questionId: question.id }}
        buttonLabel={`Update Question`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      <IconButton
        toolTip="Delete Question"
        iconType="remove"
        redirectTo="/administration/question"
        onClickRemove={() => QuestionQueries.delete({ data: { ids: [question.id] } })}
      />
    ],
    contents: [
      { label: 'Title (rendered as)', value: renderHtml(question.title) },
      { label: 'Provider Type', value: question.provider_type },
      { label: 'Course Provider', value: question.provider_type === 'course_provider' ? renderLink(`/administration/course-provider/${question.provider.id}`, question.provider.name) : undefined },
      { label: 'Store', value: question.provider_type === 'store' ? renderLink(`/administration/store/${question.provider.id}`, question.provider.name) : undefined },
      { label: 'External ID', value: question.external_id },
      { label: 'Type', value: question.question_type },
      { label: 'Is Autocomplete', value: question.configuration?.autocomplete, render: renderBoolean },
      { label: 'Options', value: question.configuration?.options, render: renderJson },
      { label: 'Is Multiple', value: question.configuration?.multiple, render: renderBoolean },
      { label: 'Max File Size', value: question.configuration?.max_file_size },
      { label: 'Accepted File Types', value: question.configuration?.file_types },
      { label: 'Is Required', value: question.configuration?.required, render: renderBoolean },
      { label: 'Default Value', value: question.configuration?.default_value },
      { label: 'Placeholder', value: question.configuration?.placeholder },
      { label: 'Help Text', value: question.configuration?.help_text },
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
      helpKey: "questionSummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: question.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Question Title - ${convertToString(question.title, true)}`,
    tabs: tabMetas
  }
}
