import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const TestsPage = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('http://localhost:3500/api/tests');
        setTests(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('No tests found');
        } else {
          setError('Error fetching tests');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleTestClick = (customId) => {
    navigate(`/tests/${customId}/questions`);
  };

  return (
    <div className="tests-page">
      <h2>Available Tests</h2>
      {loading ? (
        <p>Loading tests...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="tests-grid">
          {tests.map(test => (
            <div key={test._id} className="test-box" onClick={() => handleTestClick(test.customId)}>
              <h3>{test.topic}</h3>
              <p>Test ID: {test.customId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestsPage;
