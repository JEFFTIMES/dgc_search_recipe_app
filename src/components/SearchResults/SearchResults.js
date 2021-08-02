import React from 'react';

function SearchResults(props){
  const hits = props.hitsObj.hits;

  if(hits.length === 0){
    return null;
  }
  //console.log(props.hitsObj.hits);
  console.log(hits[0].recipe.calories);
  console.log(hits[0].recipe.label);
  console.log(hits[0].recipe.image);
  hits[0].recipe.ingredientLines.forEach((line) =>console.log(line));

  
  return (
    <div className="results-container">{
      hits.map(hit =>{
        return (
          <div className="output-card">
            <h2 className="output-card-title">{hit.recipe.label}</h2>
            <ol className="output-card-list">{
              hit.recipe.ingredientLines.map(line =>{ 
                return (
                  <li key={line}>{line}</li>
                )
              })
            }</ol>
            <p className="output-card-calories">{hit.recipe.calories}</p>
            <img 
              className="output-card-image" 
              src={hit.recipe.image} 
              alt={hit.recipe.label}
            />
          </div>
        )
      })
    }</div>
  );
}

export default SearchResults;