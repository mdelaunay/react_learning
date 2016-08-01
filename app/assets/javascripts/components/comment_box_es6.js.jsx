
// This is in es6 syntaxe.

class CommentBox extends React.Component {

  constructor(props) {
    super(props);

    // Set up initial state
    this.state = {
      data: []
    };

    // Functions must be bound manually with ES6 classes
    this.ajaxCall = this.ajaxCall.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentDestroy = this.handleCommentDestroy.bind(this);
  }

  ajaxCall() {
    console.log("ajaxCall...");
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  componentDidMount() {
    this.ajaxCall();
  }

  handleCommentSubmit(comment) {
    var data = {comment: comment}
    console.log("save submit with data " + data + "...");
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleCommentDestroy(comment_key) {
    console.log("destroying " + comment_key + "...");
    var destroy_url = this.props.url + "/" + comment_key
    $.ajax({
      url: destroy_url,
      dataType: 'json',
      type: 'delete',
      data: comment_key,
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    return (
      <div className="commentBox">
        <CommentList data={this.state.data} onCommentDestroy={this.handleCommentDestroy} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }

}


class CommentList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var commentNodes = this.props.data.map( (comment) => {
      return (
        <Comment key={comment.id} id={comment.id} data={comment} onCommentDestroy={this.props.onCommentDestroy} />
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}

class Comment extends React.Component {
  constructor(props) {
    super(props);
    // Functions must be bound manually with ES6 classes
    this.handleDestroy = this.handleDestroy.bind(this);
  }

  handleDestroy() {
    this.props.onCommentDestroy(this.props.id)
  }

  render() {
    return (
      <div className="comment">
        <div className="comment-author">
          {this.props.data.author}
        </div>
        <div>
          {this.props.data.description}
        </div>
        <div>
          <button onClick={this.handleDestroy} > DELETE </button>
        </div>
      </div>
    );
  }
}


class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    // Set up initial state
    this.state = {
      author: '',
      description: ''
    };

    // Functions must be bound manually with ES6 classes
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value})
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    var author = this.state.author;
    var description = this.state.description;
    // if(!author || !description) {
    //   return;
    // }
    this.props.onCommentSubmit({author: author, description: description});
    // this.setState({author: '', description: ''});
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        {"(" + this.state.author + " : " + this.state.description + ")"}
        <div>
          <label>Your name : </label>
          <input type="text" value={this.state.author} onChange={this.handleAuthorChange}/>
        </div>
        <div>
          <label>Your comment : </label>
          <input type="text" value={this.state.description} onChange={this.handleDescriptionChange}/>
        </div>
        <input type="submit" value="Send !"/>
      </form>
    );
  }


}

