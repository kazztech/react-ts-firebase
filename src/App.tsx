import React, { useEffect, useState } from "react";
import { db } from "./firebase";

type User = {
  id: string;
  name: string;
  height: number;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsersData = () => {
    const usersRef = db.collection("users");
    usersRef.get().then((snapshot) => {
      const newUsers: any[] = [];
      snapshot.forEach((doc) => {
        newUsers.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUsers(newUsers);
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("削除してもよろしいですか？")) {
      db.collection("users")
        .doc(id)
        .delete()
        .then(() => {
          fetchUsersData();
          alert("削除しました");
        })
        .catch(() => {
          alert("失敗しました");
        });
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.height}cm</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
