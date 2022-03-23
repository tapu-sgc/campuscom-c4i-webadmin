import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },
  { path: "/institute/course", component: React.lazy(() => import("~/Pages/Institute/Courses").then((x) => ({ default: x.List }))) },
  { path: "/institute/course/:courseID", component: React.lazy(() => import("~/Pages/Institute/Courses/CourseDetailsPage").then((x) => ({ default: x.CourseDetailsPage }))) },
  { path: "/institute/section/:sectionID", component: React.lazy(() => import("~/Pages/Institute/Sections/SectionDetailsPage").then((x) => ({ default: x.SectionDetailsPage }))) },
  { path: "/institute/instructor/:instructorID", component: React.lazy(() => import("~/Pages/Institute/Instructor/InstructorDetailsPage").then((x) => ({ default: x.InstructorDetailsPage }))) },

  { path: "/storefront-data/order", component: React.lazy(() => import("~/Pages/StorefrontData/Orders").then((x) => ({ default: x.List }))) },
  { path: "/storefront-data/order/:orderID", component: React.lazy(() => import("~/Pages/StorefrontData/Orders/OrderDetailsPage").then((x) => ({ default: x.OrderDetailsPage }))) },
  { path: "/storefront-data/payment", component: React.lazy(() => import("~/Pages/StorefrontData/Payments").then((x) => ({ default: x.List }))) },
  { path: "/storefront-data/payment/:paymentID", component: React.lazy(() => import("~/Pages/StorefrontData/Payments/PaymentDetailsPage").then((x) => ({ default: x.PaymentDetailsPage }))) },
  { path: "/storefront-data/student", component: React.lazy(() => import("~/Pages/StorefrontData/Students").then((x) => ({ default: x.List }))) },
  { path: "/storefront-data/student/:studentID", component: React.lazy(() => import("~/Pages/StorefrontData/Students/StudentDetailsPage").then((x) => ({ default: x.StudentDetailsPage }))) },

  { path: "/administration/course-provider/:courseProviderID", component: React.lazy(() => import("~/Pages/Administration/CourseProviders/CourseProviderDetailsPage").then((x) => ({ default: x.CourseProviderDetailsPage }))) },

  { path: "/user-profile", component: React.lazy(() => import("~/Pages/UserProfile").then((x) => ({ default: x.UserProfile }))) },
]
