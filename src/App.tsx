import React, { useState } from "react";

type User = {
  id: string;
  name: string;
  height: number;
};

function App() {
  const [users, setUsers] = useState<User[]>([
    { id: "ID1", name: "ゾンビ", height: 195 },
    { id: "ID2", name: "スケルトン", height: 199 },
    { id: "ID3", name: "クリーパー", height: 170 },
  ]);
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
