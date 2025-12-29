import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  { path: "admin/dashboard", file: "routes/admin/dashboard.tsx" },
  { path: "user/profile", file: "routes/user/profile.tsx" },
  { path: "user/listdata", file: "routes/user/listdata/listdata.tsx" },
  { path: "user/listdata/:id", file: "routes/user/listdata/listdata.$id.tsx" },
  { path: "user/order/:orderId", file: "routes/user/order/$orderId.tsx" },
  { path: "guest/welcome", file: "routes/guest/welcome.tsx" },
] satisfies RouteConfig;
