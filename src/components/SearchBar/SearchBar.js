import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SearchResults from '../SearchResults/SearchResults';

function SearchBar(props) {

  //state for the changing of the input text.
  let [inputText, setInputText] = useState('');
  //state for the fetched results data.
  let [hits, setHits] = useState([]);
  //state for the firing of the search button.
  let [fireSearching, setFireSearching] = useState('');

  //handle text input
  function handleInputTextChange(event){
    event.preventDefault();
    setInputText(event.target.value);
    console.log(inputText);
  }


  //handle button click, set new value to the fireSearching, 
  //then the changes of the fireSearching triggers the useEffect()
  function handleSearchButtonClick(event){
    event.preventDefault();
    setFireSearching(inputText);
  }

  //useEffect() is triggered only the fireSearching has been changed.
  //
  useEffect(() => {
    getRecipes(fireSearching).catch((err) =>console.log(err));
         
  },[fireSearching]);

  // declare an axios to get the data from the API.
  async function getRecipes(requestInputText){
    
    const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${requestInputText}&app_id=918ce998&app_key=0a20da66669ae152c136cd62c276c8aa`);
    //console.log(response.data);
    setHits(response.data.hits);
    // console.log(hits);
    // console.log(hits[0].recipe.calories);
    // console.log(hits[0].recipe.label);
    // console.log(hits[0].recipe.image);
    // hits[0].recipe.ingredientLines.forEach((line) =>console.log(line));

  }


  return (
    <>
      <div className="search-bar-container">
        <input id="search-input" type="text" placeholder="input here" onChange={handleInputTextChange}/>
        <button id="search-button" type="button" onClick={handleSearchButtonClick}>Find</button>
      </div>
      <SearchResults hitsObj={{hits}}/>

    </>
  );
}

export default SearchBar;