import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Nav2 from "../../components/Nav2";
import Modal from 'react-modal';
//testign

class SavedA extends Component {

 state = {
  books: [],
  title: "",
  author: "",
  synopsis: "",
  isActive: false
 };

 componentDidMount() {
  this.loadSavedArticles();
 }

 loadSavedArticles = () => {
  API.getSavedArticles()
   .then(res => {
    var reBooks = res.request.responseText;
    reBooks = JSON.parse(reBooks);
    console.log(reBooks[0]);
    this.setState({ books: reBooks, title: "", author: "", synopsis: "" })
   }

   )

   .catch(err => console.log(err));
 };

 deleteBook = id => {
  API.deleteBook(id)
   .then(res => {
    console.log("I made it to callback");
    this.loadSavedArticles()
   })
   .catch(err => console.log(err));
 };

 noteBook = id =>{
  alert(id);
  var note = this.refs.newText.value;
  alert(note);
  API.noteBook(note,id)
   .then(res => {console.log(res);

   })
   .catch(err => console.log(err));
 };

 componentWillMount() {
  Modal.setAppElement('body');
 }
 toggleModal = () => {
  this.setState({
   isActive: !this.state.isActive
  })

 }

 // noteBook = id => {
 //    API.noteBook(id)
 //      .then(res => {
 //        alert("I made it to callback");
 //        this.setState({
 //          modelView:true
 //        });
 //        })
 //      .catch(err => console.log(err));
 //  };

 handleInputChange = event => {
  const { name, value } = event.target;
  this.setState({
   [name]: value
  });
 };

 handleFormSubmit = event => {
  event.preventDefault();
  if (this.state.title && this.state.author) {
   API.saveBook({
    title: this.state.title,
    author: this.state.author,
    synopsis: this.state.synopsis
   })
    .then(res => this.loadBooks())
    .catch(err => console.log(err));
  }
 };

 render() {

  return (
   <Container fluid>
    <Nav2 />
    <Row>
     <Col size="md-9">
      <Jumbotron>
       <h1>Transword Saved Articles</h1>
      </Jumbotron>
      {this.state.books.length ? (
       <List>
        {this.state.books.map(book => (
         <ListItem key={book._id}>
          <Link to={"/books/" + book._id}>
           <strong>
            {book.title}
            {book.link}
           </strong>
          </Link>
          {/* deletes articles */}
          <DeleteBtn onClick={() => this.deleteBook(book._id)} />
          {/* deletes Notes */}
          {/* <button className="btn btn-primary" onClick={() => this.noteBook(book._id)}>Delete Note</button> */}
          {/* add notes */}
          <button className="btn btn-info" onClick={() => this.toggleModal()}>Add Note</button>


          
          <Modal className="modal-dialog" role="document" isOpen={this.state.isActive} >
       <div className="modal-content">
        <div className="modal-header">
         <h1 className="modal-title" id="exampleModalLabel">Notes For Article</h1>
         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
         </button>
        </div>
        <div className="modal-body">
         <p>Enter Note Here</p>
         <div id="addNote">
          <input ref="newText" type="text" />
         </div>
        </div>
        <div className="modal-footer">
         <button type="button" className="btn btn-primary" onClick={() => this.noteBook(book._id)} >Save changes</button>
         <button type="button" onClick={() => this.toggleModal()} className="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
       </div>
      </Modal>



         </ListItem>
        ))}
       </List>
      ) : (
        <h3>No Results to Display</h3>
       )}
     </Col>
    </Row>
   </Container>
  );
 }
}

export default SavedA;