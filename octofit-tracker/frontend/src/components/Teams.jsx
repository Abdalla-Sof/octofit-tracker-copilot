import { useEffect, useState } from 'react';
import { apiUrl } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl('/api/teams'))
      .then((res) => res.json())
      .then((data) => setTeams(Array.isArray(data) ? data : data.results || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {teams.map((team) => (
          <li key={team._id}>{team.name} ({team.members?.length || 0} members)</li>
        ))}
      </ul>
    </section>
  );
}
