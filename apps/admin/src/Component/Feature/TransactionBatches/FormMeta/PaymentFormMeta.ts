import { DATE_PICKER, IField, TEXTAREA, TEXT, NUMBER, DISPLAY_FIELD } from "@packages/components/lib/Form/common"
import { renderAmount } from "@packages/components/lib/ResponsiveTable"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getTransactionBatchRevenueSummary = (netPaymentReceived?: number, revenuePercentage?: number) => {
  const revenueAmount = (revenuePercentage !== undefined) && (netPaymentReceived !== undefined) ? Number((netPaymentReceived * (revenuePercentage / 100)).toFixed(2)) : undefined // revenue amount is rounded
  const totalChequeAmount = (revenueAmount !== undefined) && (netPaymentReceived !== undefined) ? (netPaymentReceived - revenueAmount) : undefined

  return {
    revenueAmount,
    totalChequeAmount
  }
}

export const PaymentFormMeta: IField[] = [
  {
    label: "Batch ID",
    inputType: DISPLAY_FIELD,
    fieldName: "batch_id",
    colSpan: 24,
    labelColSpan: 4,
  },
  {
    label: "Total Transactions",
    inputType: DISPLAY_FIELD,
    fieldName: "total_transactions",
  },
  {
    label: "Total Net Payment Received",
    inputType: DISPLAY_FIELD,
    fieldName: "total_net_payment_received",
    render: renderAmount
  },
  {
    label: "Revenue Percentage",
    inputType: NUMBER,
    fieldName: "revenue_percentage",
    rules: [{ required: true, message: "This field is required!" }],
    withApply: true,
    onApply: ({value, setDisplayFieldValue}) => {
      setDisplayFieldValue?.((val: any) => {
        const { revenueAmount, totalChequeAmount } = getTransactionBatchRevenueSummary(val.total_net_payment_received, value)
        return {
          ...val,
          revenue_amount: revenueAmount,
          cheque_amount: totalChequeAmount
        }
      })
    },
    colSpan: 24,
    labelColSpan: 10,
  },
  {
    label: "Revenue Amount (Calculated)",
    inputType: DISPLAY_FIELD,
    fieldName: "revenue_amount",
    render: renderAmount
  },
  {
    label: "Cheque Amount",
    inputType: DISPLAY_FIELD,
    fieldName: "cheque_amount",
    render: renderAmount
  },
  {
    label: "Payment Reference",
    inputType: TEXT,
    fieldName: "payment_ref",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Payment Date",
    inputType: DATE_PICKER,
    fieldName: "payment_date",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Payment Note",
    inputType: TEXTAREA,
    fieldName: "payment_note",
  },
]
