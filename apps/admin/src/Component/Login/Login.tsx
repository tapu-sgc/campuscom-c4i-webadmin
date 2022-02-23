import React, { useState } from "react"
import { Form, Button, Card, Typography, Input } from "antd"
import { Error } from "~/Component/Error"
import { Store } from "antd/lib/form/interface"
import { login } from "~/ApiServices/Login"
import { Redirect } from "react-router"

interface IFormState {
  username: string
  password: string
}

const INITIAL_FORM_VALUES: IFormState = {
  username: "",
  password: ""
}

enum EnumLoading {
  PENDING,
  INPROGRESS
}

export function Login(props: {
  globalErrorMessage?: null | string
  modal?: boolean
  page?: boolean
  redirect?: (url: string) => void
}) {
  const [loading, setloading] = useState(EnumLoading.PENDING)
  const [redirect, setRedirect] = useState<string>()
  const [error, setError] = useState<string>()
  const onFinish = async (values: Store) => {
    const { username, password } = values as IFormState
    setloading(EnumLoading.INPROGRESS)
    setError(undefined)
    const response = await login(username, password)
    setloading(EnumLoading.PENDING)
    if (props.page) {
      if (response && response.success && props.redirect) {
        setRedirect("/")
      }
    }
    if (Array.isArray(response.error) && response.error.length > 0) {
      switch (response.error[0].message) {
        case "INCORRECT_USERNAME_PASSWORD":
          setError("Incorrect Username or Password")
          break
      }
    }
  }

  const { globalErrorMessage } = props
  const modalProps = {
    title: "Login required",
    description: "Your session has been timed out, please login again"
  }
  return (
    <Card style={{ minWidth: "300px" }}>
      {props.modal && (
        <>
          <Card.Meta title={modalProps.title} />
          <Typography.Title level={5} style={{ marginTop: "20px", color: "#8b0000" }}>
            {modalProps.description}
          </Typography.Title>
        </>
      )}
      {Boolean(globalErrorMessage) && <Error>{globalErrorMessage}</Error>}
      {redirect && <Redirect to={redirect} />}
      <Form
        layout="vertical"
        name="basic"
        hideRequiredMark
        className="login-form"
        initialValues={INITIAL_FORM_VALUES}
        onFinish={onFinish}
      >
        <Form.Item
          {...{
            label: "Username",
            name: "username",
            rules: [{ required: true, message: "Please input your username!" }]
          }}
        >
          <Input aria-label="User Name" />
        </Form.Item>

        <Form.Item
          {...{
            label: "Password",
            name: "password",
            rules: [{ required: true, message: "Please input your password!" }]
          }}
        >
          <Input aria-label="password" type="password" />
        </Form.Item>

        {error && <p style={{ color: "darkred", textAlign: "center" }}>{error}</p>}
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" loading={loading === EnumLoading.INPROGRESS}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
