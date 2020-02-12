import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookDetails from './BookDetails';

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelfCategory: PropTypes.func.isRequired
    };

    render() {
        const { books, changeShelfCategory } = this.props;

        return (
            <ol className="books-grid">
                {books.map(book => (<BookDetails key={book.id} book={book} books={books} changeShelfCategory={changeShelfCategory}/>))}
            </ol>
        );
    }
}

export default BookShelf;
