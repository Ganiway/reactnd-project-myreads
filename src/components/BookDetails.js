import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noCoverImage from '../img/no-cover-img-avail.png';

class BookDetails extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        changeShelfCategory: PropTypes.func.isRequired
    }

    updateShelf = event => this.props.changeShelfCategory(this.props.book, event.target.value);

    render() {
        const { book, books } = this.props;

        const coverImage = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCoverImage;

        const title = book.title ? book.title : 'No title available';

        let current = 'none';
        for (let item of books) {
            if (item.id === book.id) {
                current = item.shelf;
                break;
            }
        }

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ backgroundImage: `url(${coverImage})` }}/>
                        <div className="book-shelf-changer">
                            <select onChange={this.updateShelf} defaultValue={current}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    {book.authors && book.authors.map((author, index) => (<div className="book-authors" key={index}> {author}</div>))}
                </div>
            </li>
        );
    }
}

export default BookDetails;
