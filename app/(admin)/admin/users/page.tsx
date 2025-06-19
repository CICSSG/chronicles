"use client";
import { useEffect, useState } from "react";

type User = {
  id: string;
  username: string;
};

const AdminOfficers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(Array.isArray(data?.data) ? data.data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOfficers;
