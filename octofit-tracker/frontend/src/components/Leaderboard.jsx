import { useEffect, useState } from 'react';
import { apiUrl } from '../api';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl('/api/leaderboard'))
      .then((res) => res.json())
      .then((data) => setLeaders(Array.isArray(data) ? data : data.results || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="error">{error}</p>}
      <ol>
        {leaders.map((leader) => (
          <li key={leader._id || leader._id}>User {leader._id}: {leader.totalCalories} cal</li>
        ))}
      </ol>
    </section>
  );
}
