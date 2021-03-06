import React from 'react';
import axios from 'axios';
import NgIf from './NgIf';

class RestController extends React.Component {

  state = {
    posts: [],
    comments: []
  };


	componentDidMount() {
	    axios.get(`http://localhost:8080/posts`).then(res => {
	      const posts = res.data;
	      this.setState({ posts });
	    });			    
	}

	getCommentsByPostId = async (id) => {		
	    axios.get(`http://localhost:8080/posts/comments`, {
       		params: {
    			postId: id
    		}
	    }).then(res => {
	      const comments = res.data;
	      this.setState({ comments });
	    });
	}


  render() {
        return (
            <div className="container">
                <div className="jumbotron-div col s12">
	        	<div>
	        		<h1>Posts from Json Placeholder API</h1>
	        		<h4>Click any post to display its comments</h4>
	        	</div>                
                    <ul className="collection">
                        {this.state.posts.map(post =>
                            (                            	
                                <div className="post-card" key={post.id} onClick={()=> this.getCommentsByPostId(post.id)}>
                                	<h2> Post title: { post.title.substring(0, 50).concat('...') } </h2>
                                	<p>  Post body: { post.body} </p>                                	

                                	<div className="jumbotron-div col s12">                                		
					                    <ul className="collection">					        
					                    	<NgIf show={this.state.comments && (this.state.comments.length > 0 && this.state.comments[0].postId === post.id)}> 
						                    	<div>
				                            		<h2> Comments: </h2>
				                            	</div>
			                            	</NgIf>
					                        {this.state.comments.map(comment =>
					                            (
					                            	<NgIf show={comment.postId === post.id}>
					                            					                            		
						                                <div className="comment-card" key={comment.id}>					                                	
						                                	<p> { comment.body.substring(0, 200).concat('...') } </p>
						                                	<h2> From: { comment.name } </h2>                                	
						                                	<h3> Email: { comment.email}  </h3>
						                                </div>
						                            </NgIf>						                            		                                                   
					                            ))
					                        }					                    
					                    </ul>
					                </div> 
                                </div>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }

}

export default RestController;