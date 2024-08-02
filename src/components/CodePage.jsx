import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function CodeSpace() {
  const { problemId } = useParams();
  const [language, setLanguage] = useState('.js');
  const [output, setOutput] = useState('');
  const [fileName, setFileName] = useState('');
  const [input, setInput] = useState('');
  const [code, setCode] = useState({
    '.js': '',
    '.py': '',
    '.java': '',
    '.cpp': '',
    '.c': ''
  });
  const [problemDetails, setProblemDetails] = useState({
    title: '',
    description: '',
    sampleTestCases: '',
    testCases: []
  });

  useEffect(() => {
    document.getElementById('editor').value = code[language];
  }, [language, code]);

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/api/problems/${problemId}`);
        setProblemDetails(response.data);
      } catch (error) {
        console.error('Error fetching problem details:', error);
      }
    };

    fetchProblemDetails();
  }, [problemId]);

  const runCode = async () => {
    const currentCode = code[language];
    try {
      console.log('Posting data:', { language, code: currentCode, fileName, input });
      const response = await axios.post('http://localhost:3500/create', {
        language,
        code: currentCode,
        fileName,
        input
      });
      setOutput(response.data);
    } catch (error) {
      console.error('Error running code:', error.response || error.message);
      setOutput('Error running code.');
    }
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(prevCode => ({
      ...prevCode,
      [language]: newCode
    }));
  };

  return (
    <div className="container">
      <div className="left-half">
        <h2>{problemDetails.title}</h2>
        <p>{problemDetails.description}</p>
        <h3>Sample Test Cases</h3>
        <pre>{problemDetails.sampleTestCases}</pre>
        <h3>Test Cases</h3>
        <table>
          <thead>
            <tr>
              <th>Input</th>
              <th>Expected Output</th>
              <th>Actual Output</th>
              <th>Passed</th>
            </tr>
          </thead>
          <tbody>
            {problemDetails.testCases.map((testCase, index) => (
              <tr key={index}>
                <td>{testCase.inputs.join(', ')}</td>
                <td>{testCase.outputs.join(', ')}</td>
                <td>{/* Actual output will go here */}</td>
                <td>{/* Passed status will go here */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="right-half">
        <div className="top-bar">
          <input
            type="text"
            className="file-name-input"
            placeholder="File Name"
            value={fileName}
            onChange={handleFileNameChange}
          />
          <select
            className="language-dropdown"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value=".js">JavaScript</option>
            <option value=".py">Python</option>
            <option value=".java">Java</option>
            <option value=".cpp">C++</option>
            <option value=".c">C</option>
          </select>
          <button className="run-button" onClick={runCode}>
            Run Code
          </button>
        </div>
        <textarea
          id="editor"
          className="text-editor"
          placeholder="Type your code here..."
          onChange={handleCodeChange}
        ></textarea>
        <div className="input-output-container">
          <textarea
            className="input-area"
            placeholder="Type your input here..."
            value={input}
            onChange={handleInputChange}
          ></textarea>
          <div className="output-area">
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeSpace;
