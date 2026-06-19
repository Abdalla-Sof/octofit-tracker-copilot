import { useEffect, useState } from 'react';
import { apiUrl } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl('/api/workouts'))
      .then((res) => res.json())
      .then((data) => setWorkouts(Array.isArray(data) ? data : data.results || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            {workout.name} — {workout.durationMinutes} min ({workout.difficulty})
          </li>
        ))}
      </ul>
    </section>
  );
}
