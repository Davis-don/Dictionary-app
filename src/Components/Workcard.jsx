import React from 'react';
import './Wordcard.css';
import { useQuery } from 'react-query';

function Workcard({ SearchTerm }) {
  // Fetching the data using React Query
  const { data, isLoading, error } = useQuery(
    ['dictionaryWords', SearchTerm.value], // Query key includes the search term for caching
    async () => {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${SearchTerm.value}`);
      
      // Check if the response is ok (status 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result;
    },
    {
      enabled: !!SearchTerm.value // Only fetch if there is a search term
    }
  );

  // Check for loading state
  if (isLoading) {
    return <h1>Loading.....</h1>;
  }

  // Check for errors in fetching data
  if (error) {
    return <h1>Error fetching data: {error.message}</h1>;
  }

  // Function to filter unique words based on the 'word' property
  const getUniqueWords = (data) => {
    return data.filter((item, index, self) =>
      index === self.findIndex((t) => t.word === item.word)
    );
  };

  // Log the data to see its structure
  console.log(data);

  return (
    <div className='workcard-overall-container'>
      <h1 className="search-term">{SearchTerm.value}</h1>
      <div className="content-section">
        {data && getUniqueWords(data).map((word, index) => (
          <div key={index} className="word-entry">
            <h2>Word: {word.word}</h2>
            <h3>Pronunciation: {word.phonetic}</h3>
            <ul>
              {word.meanings.map((meaning, idx) => (
                <li key={idx}>
                  <strong>{meaning.partOfSpeech}</strong>: {meaning.definitions[0].definition}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workcard;


