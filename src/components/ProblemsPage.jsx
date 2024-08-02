import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ProblemsPage = () => {
  const { customId } = useParams();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/api/tests/${customId}/questions`);
        setProblems(response.data);
        console.log(response.data)
      } catch (err) {
        setError('Error fetching problems');
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [customId]);

  return (
    <div className="problems-page">
      <h2>Problems for Test {customId}</h2>
      {loading ? (
        <p>Loading problems...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Problem ID</th>
              <th>Name of the Problem</th>
              <th>Link</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(problem => (
              <tr key={problem._id}>
                <td>{problem.questionId}</td>
                <td>{problem.title}</td>
                <td>
                  <Link to={`/codespace/${problem.questionId}`} target="_blank" rel="noopener noreferrer">
                    View Problem
                  </Link>
                </td>
                <td>{problem.completed ? 'Completed' : 'Not Completed'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProblemsPage;
