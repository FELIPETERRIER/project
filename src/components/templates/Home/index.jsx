
import '../Home/styles.css';
import {useCallback, useEffect, useState } from 'react';
import { loadPosts } from '../../utils/loadPosts';
import {Posts} from '../../Posts/Posts'
import { Button } from '../../Button/button';
import { TextInput } from '../../textInput/textInput';

export const Home = () =>{
  
  const [posts,setPosts] = useState([]);
  const [allPosts,setAllPosts] = useState([]);
  const [page,setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue,setSearchValue] = useState('');
 
  
  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) :      
    posts;

   
    const handleLoadPosts = useCallback( async(page,postsPerPage) => {
      const postsAndPhotos = await loadPosts();
      
      setPosts(postsAndPhotos.slice(page,postsPerPage));
      setAllPosts(postsAndPhotos);
        
    },[]);
    useEffect(() =>{
      
      handleLoadPosts(0,postsPerPage)
    },[handleLoadPosts,postsPerPage]);
     const loadMorePosts = () =>{
     
      const nextPage = page + postsPerPage;
      const nextPosts = allPosts.slice(nextPage,nextPage + postsPerPage);
      posts.push(...nextPosts);
  
      
      setPosts(posts);
      setPage(nextPage);
     
    }
    const handleChange=(e) => {
      const {value} = e.target;
      setSearchValue(value)
        
  
    }
  

  return(        
    <section className='container'>
      <div className='search-container'> 
       {!!searchValue && (
        
        <h1>Search Value: {searchValue}</h1>
        
      )}
      
      <TextInput searchValue = {searchValue} handleChange = {handleChange}/>
      </div>
      {filteredPosts.length > 0 && (
        <Posts posts = {filteredPosts}/>
      )}
      {filteredPosts.length === 0 && (
       <p>Não existe posts</p>
      )}
      
      <div className='button-container'>
        {!searchValue && (
          <Button  text = 'Load posts'
          onClick={loadMorePosts}
          disabled = {noMorePosts}
        />

        )}
      
      </div>
   
    </section>
    );

}

export default Home;
