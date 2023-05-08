import React, {useState } from 'react';
import './App.css'
import Select from 'react-select';

function App() {
  const [ message, setMessage ] = useState('')
  const [ response, setResponse ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ questions, setQuestions] = useState(1);
  const [ difficulty, setDifficulty] = useState('');
  const [ selectedOption, setSelectedOption] = useState('');

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
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
  ];

  const dropdownDifficultyOptions = [
    { value: 'easy', label: 'easy' },
    { value: 'medium', label: 'medium' },
    { value: 'difficult', label: 'difficult' },
    { value: 'challenging', label: 'challenging' },
    { value: 'impossible', label: 'impossible' },
  ];


  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#222',
      border: 'none',
      boxShadow: 'none',
      color: 'white',
      width: '200px',
      cursor: 'pointer',
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
      border: 'none',
      cursor: 'pointer',

    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };



  
  return (
    <div className='App'>
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
        <Select
          value={difficulty}
          onChange={(option) => setDifficulty(option)}
          options={dropdownDifficultyOptions}
          styles={customStyles}
        />
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
        </div>
        :<div className='response'>{response.content}</div>}


        <footer>
        <p>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
      </footer>
        
      
    </div>
    
  )
}

export default App