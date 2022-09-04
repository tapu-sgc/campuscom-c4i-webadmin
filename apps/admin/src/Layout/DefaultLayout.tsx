import React, { Suspense, useState, useEffect } from "react"
import { Col, Layout, Row, Spin } from "antd"
import { Link } from "react-router-dom"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { Sidebar } from "~/packages/components/SidebarNavigation/Sidebar"
import { useSidebarCollapsed } from "~/Hooks/useSidebarCollapsed"
import { HeaderFunctionalities } from "~/Component/Layout/HeaderFunctionalities/HeaderFunctionalities"
import { Breadcrumb } from "~/Layout/Breadcrumb"
import { logout } from "~/packages/services/AuthService"
import { eventBus } from "~/packages/utils/EventBus"
import { LOGGED_IN_SUCCESSFULLY } from "~/Constants"
import { getSidebarMenus, ISidebarMenu } from "~/Component/Layout/SidebarMenus"

const { Header, Content } = Layout

interface ILayoutProps {
  children: React.ReactNode
}

export function DefaultLayout(props: ILayoutProps) {
  const [collapsed, setCollapsed] = useSidebarCollapsed()
  const [sidebarMenus, setSidebarMenus] = useState<ISidebarMenu[]>(getSidebarMenus())

  useEffect(() => {
    eventBus.subscribe(LOGGED_IN_SUCCESSFULLY, () => setSidebarMenus(getSidebarMenus()))
    return () => {
      eventBus.unsubscribe(LOGGED_IN_SUCCESSFULLY)
    }
  }, [])

  return (
    <Layout>
      <Sidebar collapsed={collapsed} logout={logout} sidebarMenus={sidebarMenus} />
      <Layout className="site-layout">
        <Header role="none" className="site-layout-background" style={{ padding: 0 }}>
          <Row>
            <Col flex="50px" role="navigation" aria-label="Sidebar Toggle">
              <MenuToggle collapsed={collapsed} setCollapsed={setCollapsed} />
            </Col>
            <Col flex="auto" role="navigation" aria-label="Go to home page">
              <h2 aria-label="School Name" style={{ marginTop: "-7px" }}>
                <Link
                  id="main-title"
                  style={{
                    color: "white",
                    fontSize: "25px",
                    marginTop: "-7px",
                    textAlign: "start",
                    marginLeft: "20px"
                  }}
                  to="/"
                >
                  Campus Marketplace Webadmin
                </Link>
              </h2>
            </Col>
            <HeaderFunctionalities />
          </Row>
        </Header>
        <Content role="main" style={{ padding: "0 20px" }}>
          <Breadcrumb />
          <Suspense
            fallback={
              <Spin
                style={{
                  margin: 0,
                  position: "relative",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
                size="large"
              />
            }
          >
            {props.children}
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

interface IMenuToggle {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

function MenuToggle(props: IMenuToggle) {
  return (
    <>
      {props.collapsed && <MenuUnfoldOutlined role="button" style={{ fontSize: "30px", paddingLeft: "15px", color: "white" }} onClick={() => props.setCollapsed(!props.collapsed)} />}
      {!props.collapsed && <MenuFoldOutlined role="button" style={{ fontSize: "30px", paddingLeft: "15px", color: "white" }} onClick={() => props.setCollapsed(!props.collapsed)} />}
    </>
  )
}
