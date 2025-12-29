import { useParams } from "react-router";
import Layout2 from "../../layouts/Layout2";

export default function UserListDataId() {
  const { id } = useParams();
  return <Layout2>Trang động user/listdata/:id, id = {id}</Layout2>;
}
