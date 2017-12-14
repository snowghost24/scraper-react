import axios from "axios";

export default {
//saves Artibles in db
  saveBook: function(id) {
    return axios.post("api/books/save/" + id);
  }, 
  //retrieves saved articles
   getSavedArticles: function() {
    return axios.get("api/books/savings");
  }, 
  // deletes saved articles from db
  deleteBook: function(id) {
    return axios.get("api/books/delete/" + id);
  }, 
  //adds notes to articles
  noteBook: function(note,id) {
    return axios.get("api/books/addnote/"+id+"/"+note);
  }, 
  //retrieves scrapped articles
  getArticles:function() {
    return axios.get("api/books/scrape/articles");
  },
  
};
