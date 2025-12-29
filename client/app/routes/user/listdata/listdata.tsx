import { Link } from "react-router";
import Layout2 from "@/layouts/Layout2";

const data = [
  { id: 1, name: "User A" },
  { id: 2, name: "User B" },
  { id: 3, name: "User C" },
];

export default function ListData() {
  return (
    <Layout2>
      <h2 className="text-xl font-bold mb-4">Danh sách user</h2>
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.id}>
            <Link className="text-blue-600 underline" to={`/user/listdata/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </Layout2>
  );
}