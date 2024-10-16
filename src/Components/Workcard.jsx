import React from 'react';
import './Wordcard.css';
import { useQuery } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css'

function Workcard({ SearchTerm }) {


const { data, isLoading, refetch } = useQuery(
  ['searchWord', SearchTerm.value], 
  async () => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${SearchTerm.value}`);
    return await response.json();
  },
  {
    cacheTime: 600000,
    staleTime: 300000, 
  }
);
  const getUniqueWords = (data) => {
    return  data.filter((item, index, self) =>
      index === self.findIndex((t) => t.word === item.word)
    );
  };
 

!isLoading && console.log(getUniqueWords(data));



  return (
  <>
    <>{isLoading ? 
    <div className='spinner-overall'>
    <div className="spinner-grow text-muted "></div>
  <div className="spinner-grow text-primary"></div>
  <div className="spinner-grow text-success"></div>
  <div className="spinner-grow text-info"></div>
  <div className="spinner-grow text-warning"></div>
  <div className="spinner-grow text-danger"></div>
  <div className="spinner-grow text-secondary"></div>
  <div className="spinner-grow text-dark"></div>
  <div className="spinner-grow text-light"></div>
    </div>:
    <div className='workcard-overall-container'>
      <h1 className="search-term">{SearchTerm.value}</h1>
   

      {
        getUniqueWords(data).map((word,index)=> {
          return(
            <div key={index}>
              <div className="pronounciation-div">
                {getUniqueWords(word.phonetics).map((phonetic,index)=>{
                  return(
                    <div key={index} className="overall-phonetics">
                      





                      <audio controls>
  <source src={phonetic.audio} type="audio/mpeg"/>
  Your browser does not support the audio element.
</audio>


                      <p><span className='fs-3'><b>Pronounciation</b></span><span> <i>{phonetic.text}</i></span></p>
                    </div>
                  )
                })}
              </div>

               {word.meanings[0].definitions.map((dfn,index)=>{
                return(
                  <div  key={index} className="dfn-div">
                    <h3 className='text-primary'>Meaning {index+1}</h3>
                     <p>{dfn.definition}</p>
                     <h4 className='text-danger'>Example</h4>
                     <p>{dfn.example}</p>
                  </div>
                 
                )
               })
}
            </div>
          )
        })
      }
        
      
    </div>
    }
    </>
    </>
  );
}

export default Workcard;


