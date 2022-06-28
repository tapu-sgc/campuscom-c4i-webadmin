import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },
  { path: "/institute/course", component: React.lazy(() => import("~/Pages/Institute/Courses").then((x) => ({ default: x.List }))) },
  { path: "/institute/course/:courseID", component: React.lazy(() => import("~/Pages/Institute/Courses/CourseDetailsPage").then((x) => ({ default: x.CourseDetailsPage }))) },
  { path: "/institute/section/:sectionID", component: React.lazy(() => import("~/Pages/Institute/Sections/SectionDetailsPage").then((x) => ({ default: x.SectionDetailsPage }))) },
  { path: "/institute/instructor", component: React.lazy(() => import("~/Pages/Institute/Instructors").then((x) => ({ default: x.List }))) },
  { path: "/institute/instructor/:instructorID", component: React.lazy(() => import("~/Pages/Institute/Instructors/InstructorDetailsPage").then((x) => ({ default: x.InstructorDetailsPage }))) },
  { path: "/institute/campus", component: React.lazy(() => import("~/Pages/Institute/Campuses").then((x) => ({ default: x.List }))) },
  { path: "/institute/campus/:campusID", component: React.lazy(() => import("~/Pages/Institute/Campuses/CampusDetailsPage").then((x) => ({ default: x.CampusDetailsPage }))) },

  { path: "/store/subject", component: React.lazy(() => import("~/Pages/Store/Subjects").then((x) => ({ default: x.List }))) },
  { path: "/store/subject/:subjectID", component: React.lazy(() => import("~/Pages/Store/Subjects/SubjectDetailsPage").then((x) => ({ default: x.SubjectDetailsPage }))) },
  { path: "/store/publishing", component: React.lazy(() => import("~/Pages/Store/Publishings").then((x) => ({ default: x.List }))) },
  { path: "/store/publishing/:publishingID", component: React.lazy(() => import("~/Pages/Store/Publishings/PublishingDetailsPage").then((x) => ({ default: x.PublishingDetailsPage }))) },
  { path: "/store/ready-publishing/:publishingID", component: React.lazy(() => import("~/Pages/Store/Publishings/ReadyPublishingDetailsPage").then((x) => ({ default: x.ReadyPublishingDetailsPage }))) },
  { path: "/store/product", component: React.lazy(() => import("~/Pages/Store/Products").then((x) => ({ default: x.List }))) },
  { path: "/store/product/:productID", component: React.lazy(() => import("~/Pages/Store/Products/ProductDetailsPage").then((x) => ({ default: x.ProductDetailsPage }))) },
  { path: "/store/payment-gateway/:paymentGatewayID", component: React.lazy(() => import("~/Pages/Store/PaymentGateways/StorePaymentGatewayDetailsPage").then((x) => ({ default: x.StorePaymentGatewayDetailsPage }))) },
  { path: "/store/configuration/:storeConfigurationID", component: React.lazy(() => import("~/Pages/Store/StoreConfigurations/StoreConfigurationDetailsPage").then((x) => ({ default: x.StoreConfigurationDetailsPage }))) },

  { path: "/storefront-data/order", component: React.lazy(() => import("~/Pages/StorefrontData/Orders").then((x) => ({ default: x.List }))) },
  { path: "/storefront-data/order/:orderID", component: React.lazy(() => import("~/Pages/StorefrontData/Orders/OrderDetailsPage").then((x) => ({ default: x.OrderDetailsPage }))) },
  { path: "/storefront-data/payment", component: React.lazy(() => import("~/Pages/StorefrontData/Payments").then((x) => ({ default: x.List }))) },
  { path: "/storefront-data/payment/:paymentID", component: React.lazy(() => import("~/Pages/StorefrontData/Payments/PaymentDetailsPage").then((x) => ({ default: x.PaymentDetailsPage }))) },
  { path: "/storefront-data/student", component: React.lazy(() => import("~/Pages/StorefrontData/Students").then((x) => ({ default: x.List }))) },
  { path: "/storefront-data/student/:studentID", component: React.lazy(() => import("~/Pages/StorefrontData/Students/StudentDetailsPage").then((x) => ({ default: x.StudentDetailsPage }))) },
  { path: "/storefront-data/cart-item/:cartItemID", component: React.lazy(() => import("~/Pages/StorefrontData/CartItems/CartItemDetailsPage").then((x) => ({ default: x.CartItemDetailsPage }))) },
  { path: "/storefront-data/course-enrollment/:courseEnrollmentID", component: React.lazy(() => import("~/Pages/StorefrontData/Enrollments/CourseEnrollmentDetailsPage").then((x) => ({ default: x.CourseEnrollmentDetailsPage }))) },

  { path: "/configuration/identity-provider/:identityProviderID", component: React.lazy(() => import("~/Pages/Configuration/IdentityProviders/IdentityProviderDetailsPage").then((x) => ({ default: x.IdentityProviderDetailsPage }))) },

  { path: "/administration/course-provider", component: React.lazy(() => import("~/Pages/Administration/CourseProviders").then((x) => ({ default: x.List }))) },
  { path: "/administration/course-provider/:courseProviderID", component: React.lazy(() => import("~/Pages/Administration/CourseProviders/CourseProviderDetailsPage").then((x) => ({ default: x.CourseProviderDetailsPage }))) },
  { path: "/administration/store", component: React.lazy(() => import("~/Pages/Administration/Stores").then((x) => ({ default: x.List }))) },
  { path: "/administration/store/:storeID", component: React.lazy(() => import("~/Pages/Administration/Stores/StoreDetailsPage").then((x) => ({ default: x.StoreDetailsPage }))) },
  { path: "/administration/role", component: React.lazy(() => import("~/Pages/Administration/Roles").then((x) => ({ default: x.List }))) },
  { path: "/administration/role/:roleID", component: React.lazy(() => import("~/Pages/Administration/Roles/RoleDetailsPage").then((x) => ({ default: x.RoleDetailsPage }))) },
  { path: "/administration/user", component: React.lazy(() => import("~/Pages/Administration/Users").then((x) => ({ default: x.List }))) },
  { path: "/administration/user/:userID", component: React.lazy(() => import("~/Pages/Administration/Users/UserDetailsPage").then((x) => ({ default: x.UserDetailsPage }))) },
  { path: "/administration/course-sharing-contract/:courseSharingContractID", component: React.lazy(() => import("~/Pages/Administration/CourseSharingContracts/CourseSharingContractDetailsPage").then((x) => ({ default: x.CourseSharingContractDetailsPage }))) },
  { path: "/administration/user/:userID", component: React.lazy(() => import("~/Pages/Administration/Users/UserDetailsPage").then((x) => ({ default: x.UserDetailsPage }))) },
  { path: "/administration/question", component: React.lazy(() => import("~/Pages/Administration/Questions").then((x) => ({ default: x.List }))) },
  { path: "/administration/question/:questionID", component: React.lazy(() => import("~/Pages/Administration/Questions/QuestionDetailsPage").then((x) => ({ default: x.QuestionDetailsPage }))) },
  { path: "/administration/company", component: React.lazy(() => import("~/Pages/Administration/Companies").then((x) => ({ default: x.List }))) },
  { path: "/administration/company/:companyID", component: React.lazy(() => import("~/Pages/Administration/Companies/CompanyDetailsPage").then((x) => ({ default: x.CompanyDetailsPage }))) },
  { path: "/configuration/payment-gateway/:paymentGatewayID", component: React.lazy(() => import("~/Pages/Administration/PaymentGateways/PaymentGatewayDetailsPage").then((x) => ({ default: x.PaymentGatewayDetailsPage }))) },
  { path: "/configuration/payment-gateway-config/:paymentGatewayConfigID", component: React.lazy(() => import("~/Pages/Administration/PaymentGatewayConfigs/PaymentGatewayConfigDetailsPage").then((x) => ({ default: x.PaymentGatewayConfigDetailsPage }))) },
  { path: "/administration/refund", component: React.lazy(() => import("~/Pages/Administration/Refunds").then((x) => ({ default: x.List }))) },
  { path: "/administration/refund/:refundID", component: React.lazy(() => import("~/Pages/Administration/Refunds/RefundDetailsPage").then((x) => ({ default: x.RefundDetailsPage }))) },
  { path: "/administration/discount-program", component: React.lazy(() => import("~/Pages/Administration/DiscountPrograms").then((x) => ({ default: x.List }))) },
  { path: "/administration/discount-program/:discountProgramID", component: React.lazy(() => import("~/Pages/Administration/DiscountPrograms/DiscountProgramDetailsPage").then((x) => ({ default: x.DiscountProgramDetailsPage }))) },
  { path: "/administration/membership-program", component: React.lazy(() => import("~/Pages/Administration/MembershipPrograms").then((x) => ({ default: x.List }))) },
  { path: "/administration/membership-program/:membershipProgramID", component: React.lazy(() => import("~/Pages/Administration/MembershipPrograms/MembershipProgramDetailsPage").then((x) => ({ default: x.MembershipProgramDetailsPage }))) },
  { path: "/administration/career", component: React.lazy(() => import("~/Pages/Administration/Careers").then((x) => ({ default: x.List }))) },
  { path: "/administration/career/:careerID", component: React.lazy(() => import("~/Pages/Administration/Careers/CareerDetailsPage").then((x) => ({ default: x.CareerDetailsPage }))) },
  { path: "/administration/store-domain-configuration/:storeDomainConfigurationID", component: React.lazy(() => import("~/Pages/Administration/StoreDomainConfigurations/StoreDomainConfigurationDetailsPage").then((x) => ({ default: x.StoreDomainConfigurationDetailsPage }))) },
  { path: "/administration/audit-trail", component: React.lazy(() => import("~/Pages/Administration/AuditTrails").then((x) => ({ default: x.List }))) },
  { path: "/administration/audit-trail/:auditTrailID", component: React.lazy(() => import("~/Pages/Administration/AuditTrails/AuditTrailDetailsPage").then((x) => ({ default: x.AuditTrailDetailsPage }))) },

  { path: "/configuration/identity-provider", component: React.lazy(() => import("~/Pages/Configuration/IdentityProviders").then((x) => ({ default: x.List }))) },
  { path: "/configuration/identity-provider/:identityProviderID", component: React.lazy(() => import("~/Pages/Configuration/IdentityProviders/IdentityProviderDetailsPage").then((x) => ({ default: x.IdentityProviderDetailsPage }))) },
  { path: "/configuration/payment-gateway", component: React.lazy(() => import("~/Pages/Configuration/PaymentGateways").then((x) => ({ default: x.List }))) },
  { path: "/configuration/payment-gateway/:paymentGatewayID", component: React.lazy(() => import("~/Pages/Configuration/PaymentGateways/PaymentGatewayDetailsPage").then((x) => ({ default: x.PaymentGatewayDetailsPage }))) },
  { path: "/configuration/payment-gateway-config", component: React.lazy(() => import("~/Pages/Configuration/PaymentGatewayConfigs").then((x) => ({ default: x.List }))) },
  { path: "/configuration/payment-gateway-config/:paymentGatewayConfigID", component: React.lazy(() => import("~/Pages/Configuration/PaymentGatewayConfigs/PaymentGatewayConfigDetailsPage").then((x) => ({ default: x.PaymentGatewayConfigDetailsPage }))) },
  { path: "/configuration/global-configuration", component: React.lazy(() => import("~/Pages/Configuration/GlobalConfigurations").then((x) => ({ default: x.List }))) },
  { path: "/configuration/global-configuration/:globalConfigurationID", component: React.lazy(() => import("~/Pages/Configuration/GlobalConfigurations/GlobalConfigurationDetailsPage").then((x) => ({ default: x.GlobalConfigurationDetailsPage }))) },

  { path: "/user-profile", component: React.lazy(() => import("~/Pages/UserProfile").then((x) => ({ default: x.UserProfile }))) },
]
