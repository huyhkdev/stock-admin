import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login, LoginCredentials } from "../../../apis/auth.api";
import { useAuth } from "../../../context/AuthContext";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { login: setLogin } = useAuth();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data: {token: string}) => {
      setLogin(data.token);
      message.success("Login successful");
      navigate("/users");
    },
    onError: () => {
      message.error("Login failed");
    },
  });

  const onFinish = (values: LoginCredentials) => {
    loginMutation.mutate(values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="Login" style={{ width: 500 }}>
        <Form form={form} name="login" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loginMutation.isPending}
              style={{ width: "100%" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginScreen;
