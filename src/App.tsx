import React, { useEffect, useState } from "react";
import { db } from "./firebase";

type User = {
  id: string;
  name: string;
  height: number;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const usersRef = db.collection("users");
    usersRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
      });
    });
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
