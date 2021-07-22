import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Data from './Data';
import Pagination from './Pagination';

function AxiosData() {
 const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage , setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8); // by default we want 10 post on page thats why we pass 10 to useState

  // using useEffect we tell React that your component needs to do something after render.
useEffect(()=>{
  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); // we use async because we passing
                                                                            //a request outside to third party service
    setPosts(response.data);
    setLoading(false);
  };

  fetchData();  
}, []); //we pass an empty array, it will run only after mounting.

//console.log(posts);

// to get current page
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

// to change the page
const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-info mb-3">My Data</h1>
      <Data posts={currentPosts} loading={loading}/> 
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate ={paginate}/>
    </div>
  );
}

export default AxiosData;
 
