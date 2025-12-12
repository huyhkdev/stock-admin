import { Form, Input, Button, Card, message, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../config/firebase";
import { 
  AuthCredentials, 
  login, 
  LoginCredentials, 
  loginWithGoogle,
  GoogleLoginPayload 
} from "../../../apis/auth.api";
import { useAuth } from "../../../context/AuthContext";
import googleIcon from "../../../assets/googleIcon.svg";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { login: setLogin } = useAuth();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data: AuthCredentials) => {
      setLogin(data);
      message.success("Login successful");
      navigate("/users");
    },
    onError: () => {
      message.error("Login failed");
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: (data: AuthCredentials) => {
      setLogin(data);
      message.success("Login with Google successful");
      navigate("/users");
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.errors?.[0]?.errorMessage || "Login with Google failed";
      message.error(errorMessage);
    },
  });

  const onFinish = (values: LoginCredentials) => {
    loginMutation.mutate(values);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const payload: GoogleLoginPayload = {
        email: result.user.email || "",
        fullName: result.user.displayName || "",
        accessToken: (result.user as any).accessToken,
      };
      googleLoginMutation.mutate(payload);
    } catch (error) {
      console.error("Google sign-in failed:", error);
      message.error("Google sign-in failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card title="Admin Login" style={{ width: 500 }}>
        <Form form={form} name="login" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loginMutation.isPending}
              style={{ width: "100%" }}
              size="large"
            >
              Login
            </Button>
          </Form.Item>

          <Divider>or</Divider>

          <Button
            type="default"
            onClick={handleGoogleLogin}
            loading={googleLoginMutation.isPending}
            style={{ 
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
            size="large"
          >
            <img 
              src={googleIcon} 
              alt="Google" 
              style={{ width: "20px", height: "20px" }} 
            />
            Continue with Google
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginScreen;
