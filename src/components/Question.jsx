import React, { useState } from 'react';
import axios from 'axios';

const TestForm = () => {
  const [formData, setFormData] = useState({
    topic: '',
    numberOfQuestions: 0,
    questions: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuestionsChange = (index, e) => {
    const { name, value } = e.target;
    const questions = [...formData.questions];
    questions[index] = {
      ...questions[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      questions,
    });
  };

  const handleNumberOfQuestionsChange = (e) => {
    const numberOfQuestions = parseInt(e.target.value, 10);
    if (!isNaN(numberOfQuestions) && numberOfQuestions >= 0) {
      const questions = new Array(numberOfQuestions).fill({
        topic:'',
        description: '',
        sampleTestCases: '',
        numberOfTestCases: 0,
        testCases: [],
      });
      setFormData({
        ...formData,
        numberOfQuestions,
        questions,
      });
    }
  };

  const handleNumberOfTestCasesChange = (questionIndex, e) => {
    const numberOfTestCases = parseInt(e.target.value, 10);
    if (!isNaN(numberOfTestCases) && numberOfTestCases >= 0) {
      const questions = [...formData.questions];
      questions[questionIndex].numberOfTestCases = numberOfTestCases;
      questions[questionIndex].testCases = new Array(numberOfTestCases).fill({ input: '', output: '' });
      setFormData({
        ...formData,
        questions,
      });
    }
  };

  const handleTestCasesChange = (questionIndex, testCaseIndex, e) => {
    const { name, value } = e.target;
    const questions = [...formData.questions];
    questions[questionIndex].testCases[testCaseIndex] = {
      ...questions[questionIndex].testCases[testCaseIndex],
      [name]: value,
    };
    setFormData({
      ...formData,
      questions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/tests', formData);
      console.log('Form Data Submitted:', formData);
      // Navigate to a confirmation or another page if needed
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Topic of the Test:</label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Number of Questions:</label>
        <input
          type="number"
          name="numberOfQuestions"
          value={formData.numberOfQuestions}
          onChange={handleNumberOfQuestionsChange}
        />
      </div>
      {formData.questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question">
          <h4>Question {questionIndex + 1}</h4>
          <div>
          
            <label>Title:</label>
            <textarea
              name="Title"
              value={question.title}
              onChange={(e) => handleQuestionsChange(questionIndex, e)}
            />
            <label>Description:</label>
            <textarea
              name="description"
              value={question.description}
              onChange={(e) => handleQuestionsChange(questionIndex, e)}
            />
          </div>
          <div>
            <label>Sample Test Cases:</label>
            <textarea
              name="sampleTestCases"
              value={question.sampleTestCases}
              onChange={(e) => handleQuestionsChange(questionIndex, e)}
            />
          </div>
          <div>
            <label>Number of Test Cases:</label>
            <input
              type="number"
              name="numberOfTestCases"
              value={question.numberOfTestCases}
              onChange={(e) => handleNumberOfTestCasesChange(questionIndex, e)}
            />
          </div>
          {question.testCases.map((testCase, testCaseIndex) => (
            <div key={testCaseIndex} className="test-case">
              <h5>Test Case {testCaseIndex + 1}</h5>
              <div>
                <label>Input:</label>
                <input
                  type="text"
                  name="input"
                  value={testCase.input}
                  onChange={(e) => handleTestCasesChange(questionIndex, testCaseIndex, e)}
                />
              </div>
              <div>
                <label>Expected Output:</label>
                <input
                  type="text"
                  name="output"
                  value={testCase.output}
                  onChange={(e) => handleTestCasesChange(questionIndex, testCaseIndex, e)}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default TestForm;
