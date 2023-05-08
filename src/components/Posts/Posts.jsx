import './styles.css';
import { PostCard } from '../postCard/index';


export const Posts = ({posts}) => {
    return(
    
    <div className="posts">
    {posts.map(post => (
     <PostCard
     key={post.id}
     title={post.title}
     body={post.body}
     cover={post.cover}/>
    ))}
  </div>
    );
}