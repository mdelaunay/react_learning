// var CommentBox = React.createClass({

//   getInitialState: function(){
//     return {data: []};
//   },

//   ajaxCall: function(){
//     console.log("ajaxCall...");
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       cache: false,
//       success: function(data){
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err){
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },

//   componentDidMount: function(){
//     this.ajaxCall();
//     // setInterval(this.ajaxCall, this.props.ajaxCallInterval);
//   },

//   handleCommentSubmit: function(comment){
//     var data = {comment: comment}
//     console.log("save submit with data " + data + "...");
//     $.ajax({
//       url: this.props.url,
//       dataType: 'json',
//       type: 'POST',
//       data: data,
//       success: function(data){
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err){
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },

//   handleCommentDestroy: function(comment_key){
//     console.log("destroying " + comment_key + "...");
//     var destroy_url = this.props.url + "/" + comment_key
//     $.ajax({
//       url: destroy_url,
//       dataType: 'json',
//       type: 'delete',
//       data: comment_key,
//       success: function(data){
//         this.setState({data: data});
//       }.bind(this),
//       error: function(xhr, status, err){
//         console.error(this.props.url, status, err.toString());
//       }.bind(this)
//     });
//   },

//   render: function() {
//     return (
//       <div className="commentBox">
//         <CommentList data={this.state.data} onCommentDestroy={this.handleCommentDestroy} />
//         <CommentForm onCommentSubmit={this.handleCommentSubmit} />
//       </div>
//     );
//   }
// });

// var CommentList = React.createClass({
//   render: function() {
//     var commentDestroy = this.props.onCommentDestroy
//     var commentNodes = this.props.data.map( function(comment) {
//       return (
//         <Comment key={comment.id} id={comment.id} data={comment} onCommentDestroy={commentDestroy} />
//       );
//     });

//     return (
//       <div className="commentList">
//         {commentNodes}
//       </div>
//     );
//   }
// });

// var Comment = React.createClass({
//   handleDestroy: function(){
//     this.props.onCommentDestroy(this.props.id)
//   },
//   render: function() {
//     return (
//       <div className="comment">
//         <div className="comment-author">
//           {this.props.data.author}
//         </div>
//         <div>
//           {this.props.data.description}
//         </div>
//         <div>
//           <button onClick={this.handleDestroy} > DELETE </button>
//         </div>
//       </div>
//     );
//   }
// });

// var CommentForm = React.createClass({

//   getInitialState: function(){
//     return {author: '', description: ''};
//   },

//   handleAuthorChange: function(e){
//     this.setState({author: e.target.value})
//   },

//   handleDescriptionChange: function(e){
//     this.setState({description: e.target.value})
//   },

//   handleSubmit: function(e) {
//     e.preventDefault();
//     var author = this.state.author;
//     var description = this.state.description;
//     // if(!author || !description) {
//     //   return;
//     // }
//     this.props.onCommentSubmit({author: author, description: description});
//     // this.setState({author: '', description: ''});
//   },

//   render: function() {
//     return (
//       <form className="commentForm" onSubmit={this.handleSubmit}>
//         {"(" + this.state.author + " : " + this.state.description + ")"}
//         <div>
//           <label>Your name : </label>
//           <input type="text" value={this.state.author} onChange={this.handleAuthorChange}/>
//         </div>
//         <div>
//           <label>Your comment : </label>
//           <input type="text" value={this.state.description} onChange={this.handleDescriptionChange}/>
//         </div>
//         <input type="submit" value="Send !"/>
//       </form>
//     );
//   }
// });
