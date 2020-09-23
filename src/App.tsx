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

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} ({user.height}cm)
        </div>
      ))}
    </div>
  );
}

export default App;
