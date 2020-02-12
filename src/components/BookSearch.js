import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import BookDetails from './BookDetails';

class BookSearch extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelfCategory: PropTypes.func.isRequired
    };

    state = {
        query: '',
        arrayBooks: [],
        notFoundErr: false
    };

    getBooks = event => {const query = event.target.value;this.setState({ query });
        if (query) {
            BooksAPI.search(query.trim()).then(books => {books.length > 0
                    ? this.setState({ arrayBooks: books, notFoundErr: false })
                    : this.setState({ arrayBooks: [], notFoundErr: true });
            });
        }
        else this.setState({ arrayBooks: [], notFoundErr: false });
    };

    render() {
        const { query, arrayBooks, notFoundErr } = this.state;
        const { books, changeShelfCategory } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={this.getBooks}/>
                    </div>
                </div>
                <div className="search-books-results">
                    {notFoundErr && (<p>No books found. Please try again.</p>)}
                    {arrayBooks.length > 0 && (
                        <div>
                            <ol className="books-grid">
                                {arrayBooks.map(book => (<BookDetails key={book.id} book={book} books={books} changeShelfCategory={changeShelfCategory}/>))}
                            </ol>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default BookSearch;
