import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Nav from "../../components/Nav";


class ScrapedA extends Component {
  getInitialState
   state = {
     books: [],
     title: "",
     author: "",
     synopsis: ""
   };
   // waits untill components mount to load books
  //  componentDidMount() {
  //    this.loadArticles();
  //  }
 // calls the scrapper and returns books
   loadArticles = () => {
     API.getArticles()
     .then(res =>{
      var reBooks = res.request.responseText;
      reBooks = JSON.parse(reBooks);
      console.log(reBooks[0]);
      this.setState({ books:reBooks , title: "", author: "", synopsis: "" })
     } 
    )       
       .catch(err => console.log(err));
   };
   
   //saves and movies books into save array
   saveBook = id => {
     API.saveBook(id)
       .then(res => this.loadBooks())
       .catch(err => console.log(err));
   };
 
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
    //  console.log(this.state.books)
     return (
     
       <Container fluid>
         <Nav />
         <Row>
           <Col size="md-9">
             <Jumbotron>
               <h1>Transword</h1>
               <button  className="btn btn-primary" onClick={() => this.loadArticles()}>Scrape Transworld</button>
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
                     <button className="btn btn-primary" onClick={() => this.saveBook(book._id)}>Saved</button>
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
 
 export default ScrapedA;