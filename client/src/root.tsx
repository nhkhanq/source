import { Outlet } from "react-router";
import "./app.css";

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return <div className="p-8 text-center text-red-600">Đã có lỗi xảy ra!</div>;
}
