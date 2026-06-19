import { useEffect, useState } from 'react';
import { apiUrl } from '../api';

// Codespaces endpoint fallback for Users: -8000.app.github.dev/api/users
export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl('/api/users'))
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : data.results || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </section>
  );
}
