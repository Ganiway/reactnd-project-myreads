import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/App.css';
import * as BooksAPI from '../utils/BooksAPI';
import BooksList from "./BooksList";
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelfCategory = (changedBook, shelf) => {
      BooksAPI.update(changedBook, shelf).then(response => {
          changedBook.shelf = shelf;
          this.setState(prevState => ({
              books: prevState.books
                  .filter(book => book.id !== changedBook.id)
                  .concat(changedBook)
          }));
      });
  };

  render() {
    return (
      <div className="app">
          <Switch>
              <Route exact path="/" render={() => (
                  <div className="list-books">
                      <div className="list-books-title">
                          <h1>My Reads</h1>
                      </div>
                      <BooksList books={this.state.books} changeShelfCategory={this.changeShelfCategory} />
                      <div className="open-search">
                          <Link to="/search">Search</Link>
                      </div>
                  </div>)}
              />
              <Route path="/search" render={() => (
                  <BookSearch books={this.state.books} changeShelfCategory={this.changeShelfCategory} />)}
              />
          </Switch>
      </div>
    )
  }
}

export default BooksApp
