import React, { useEffect, useState } from "react";
import { db } from "./firebase";

type User = {
  id: string;
  name: string;
  height: number;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [addUserName, setAddUserName] = useState<string>("");
  const [addUserHeight, setAddUserHeight] = useState<number>(200);

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

  const handleAdd = () => {
    if (window.confirm("追加してもよろしいですか？")) {
      db.collection("users")
        .add({
          name: addUserName,
          height: addUserHeight,
        })
        .then(() => {
          fetchUsersData();
          setAddUserHeight(200);
          setAddUserName("");
          alert("追加しました");
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
      <div>
        <label>
          NAME:{" "}
          <input
            type="text"
            value={addUserName}
            onChange={(event) => setAddUserName(event.target.value)}
          />
        </label>
        <label>
          HEIGHT:{" "}
          <input
            type="number"
            value={addUserHeight}
            onChange={(event) => setAddUserHeight(event.target.valueAsNumber)}
          />
        </label>
        <button onClick={() => handleAdd()}>追加</button>
      </div>
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
