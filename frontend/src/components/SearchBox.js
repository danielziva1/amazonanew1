import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      
      </div>
      
    </form>
    
    
  );
}

{/*<div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" placeholder="What are you looking for?">
      <button type="submit" class="searchButton">
        <i class="fa fa-search"></i>
     </button>
   </div>
</div> */}

{/*  <form onSubmit={submitHandler} class="form-inline md-form mr-auto">
          <input  class="form-control mr-sm-2"  type="text"
          name="q"
          id="q" onChange={(e) => setName(e.target.value)} />
          <button class="btn btn-unique btn-rounded btn-sm my-0 waves-effect waves-light" type="submit" >Search</button>
        </form>*/}