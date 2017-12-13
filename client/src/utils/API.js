import axios from "axios";

export default {
//saves Artibles in db
  saveBook: function(id) {
    return axios.post("/save/" + id);
  }, 
  //retrieves saved articles
   getSavedArticles: function() {
    return axios.get("/savings");
  }, 
  // deletes saved articles from db
  deleteBook: function(id) {
    return axios.get("/delete/" + id);
  }, 
  //adds notes to articles
  noteBook: function(note,id) {
    return axios.get("/addnote/"+id+"/"+note);
  }, 
  //retrieves scrapped articles
  getArticles:function() {
    console.log("get articles was called");
    return axios.get("/scrape/articles");
  },
  
};
