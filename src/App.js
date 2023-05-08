import React, {useState } from 'react';
import './App.css'
import Select from 'react-select';
import { Helmet } from 'react-helmet';

function App() {
  const [ message, setMessage ] = useState('')
  const [ response, setResponse ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [questions, setQuestions] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message, selectedOption, questions, difficulty }),
    })
    .then((res) => res.json())
    .then((data) => {
      setResponse(data.message)
      setIsLoading(false)
    })
    .catch((error) => {
      console.error('Error:', error);
      setIsLoading(false); // Handle error case and set isLoading to false
    });
    
  }

  const dropdownOptions = [
    { value: 'Grade 8', label: 'Grade 8' },
    { value: 'Grade 9', label: 'Grade 9' },
    { value: 'Grade 10', label: 'Grade 10' },
    { value: 'Grade 11', label: 'Grade 11' },
    { value: 'Grade 12', label: 'Grade 12' },
  ];


  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#222',
      border: 'none',
      boxShadow: 'none',
      color: 'white',
      width: '200px',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '10px',
    }),
    indicator: (provided) => ({
      ...provided,
      color: 'white',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#333' : '#222',
      color: 'white',
      border: 'none'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };



  
  return (
    <div className='App'>
      <Helmet>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
        <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
      </Helmet>
      <header>
        <h1>Math Test Maker</h1>
      </header>
      <section className="hero">
        <h2>Welcome!</h2>
        <p>Here, you can type anything and AI will make you a test question.</p>
      </section>
      <form onSubmit={handleSubmit}>
        <textarea
        placeholder='What is your test about?'
        value={message}
        onChange={(e) => setMessage(e.target.value)}></textarea>
        <div className='spacer'>
        </div>
        <div className='spacer'>
        <span>Number of questions</span>
        <input
        placeholder='Number of questions'
          type="range"
          min={0}
          max={10}
          value={questions}
          onChange={(e) => setQuestions(Number(e.target.value))}
        />
        <span>{questions}</span>
        <span>Level of difficulty</span>
        <input
          type="range"
          min={0}
          max={4}
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
        />
        <span>{difficulty}</span>
        </div>
        <Select
          value={selectedOption}
          onChange={(option) => setSelectedOption(option)}
          options={dropdownOptions}
          styles={customStyles}
        />

          <button type='submit' class="button5">
            Submit
          </button>

        </form>
        {isLoading ? 
          <div className="loading">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
        :<div className='response'>{response}</div>}
  
        <footer>
        <p>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
      </footer>
        
      
    </div>
    
  )
}

export default App