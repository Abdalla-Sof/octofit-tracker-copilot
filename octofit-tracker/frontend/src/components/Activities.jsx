import { useEffect, useState } from 'react';
import { apiUrl } from '../api';

// Codespaces endpoint fallback for Activities: -8000.app.github.dev/api/activities
export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl('/api/activities'))
      .then((res) => res.json())
      .then((data) => setActivities(Array.isArray(data) ? data : data.results || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            {activity.type} - {activity.durationMinutes} min - {activity.caloriesBurned} cal
          </li>
        ))}
      </ul>
    </section>
  );
}
