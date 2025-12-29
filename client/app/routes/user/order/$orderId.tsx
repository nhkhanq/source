import { useParams } from "react-router";
import Layout2 from "../../../layouts/Layout2";

export default function UserOrderDetail() {
  const { orderId } = useParams();
  return <Layout2>Chi tiết đơn hàng: {orderId}</Layout2>;
}
