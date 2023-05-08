
import '../Home/styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/loadPosts';
import {Posts} from '../../Posts/Posts'
import { Button } from '../../Button/button';
import { TextInput } from '../../textInput/textInput';


class Home extends Component{
  state= {
    posts:[],
    allPosts:[],
    page:0,
    postsPerPage: 10,
    searchValue: '',

  };

   async componentDidMount(){
     await this.loadPosts();   

  }
  loadPosts = async() => {
    const {page,postsPerPage} = this.state
    const postsAndPhotos = await loadPosts();
    this.setState(
      { posts: postsAndPhotos.slice(page,postsPerPage),
        allPosts: postsAndPhotos,
      });
      
  };
  loadMorePosts = () =>{
    const {
      page,
      postsPerPage,
      allPosts,
      posts,
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage,nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({posts,page:nextPage})
   
  }
  handleChange=(e) => {
    const {value} = e.target;
    this.setState({searchValue:value})

  }


  render(){
    const {posts,page,allPosts,postsPerPage,searchValue} = this.state;
    const noMorePOsts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) :  
    
    posts;
    
    return(        
    <section className='container'>
      <div className='search-container'> 
       {!!searchValue && (
        <>
        <h1>Search Value: {searchValue}</h1>
        </>
      )}
      
      <TextInput searchValue = {searchValue} handleChange = {this.handleChange}/>
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
          onClick={this.loadMorePosts}
          disabled = {noMorePOsts}
        />

        )}
      
      </div>
   
    </section>
    );
  }


}



export default Home;
