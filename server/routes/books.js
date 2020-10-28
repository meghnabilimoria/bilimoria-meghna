// <!-- Meghna Bilimoria - 301127778 - 28th Oct 2020. -->
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//const BookSchema = require('../models/books');
// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});
//  GET the Book Details page in order to add a new Book
router.get('/insert', (req, res, next) => {
  res.render('books/insert', { title: 'Books', page: 'project' })
    /*****************
     * ADD CODE HERE *
     *****************/

});




//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('details', { title: 'Books', page: 'project' })
    /*****************
     * ADD CODE HERE *
     *****************/

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  const {
    Title,
    Price,
    Author,
    Genre
} = req.body;
console.log(Title, Price, Author,Genre);
const bookSchema = new book({
  Title,
  Price,
  Author,
  Genre
});
bookSchema.save(err => {
    if (err) {
        console.log(err);
    } else {
        res.redirect('/books');
    }
});

});

// GET the Book Details page in order to edit an existing Book
router.get('/details/:id', (req, res, next) => {
  console.log(req.params.id);
  // res.send(req.params.id);
  book.findOneAndUpdate({_id: req.params.id},req.body, { new: true }, (err, docs)=>{
      console.log(docs);
      
      console.log(docs.Title);
      
      // console.log(docs._id);
      
      res.render('books/details', {books:docs, title: 'Books', page: 'project' });
  })
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {

  book.findByIdAndUpdate({_id: req.params.id},req.body, (err)=>{
    if (err) {
        console.log(err);
        next(err);
    } else {
        res.redirect('/books');
    }
})

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  book.findByIdAndDelete({_id:req.params.id}, err=>{
    if(err){
        console.log(err);
    }else{
        res.redirect('/books');
    }
});
});


module.exports = router;
