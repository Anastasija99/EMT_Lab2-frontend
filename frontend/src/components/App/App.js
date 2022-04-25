import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import BooksList from "../Books/BooksList";
import BookDetails from "../Books/BookDetails/BookDetails";
import Header from '../Header/Header';
import BookAdd from '../Books/BookAdd/BookAdd';
import BookEdit from '../Books/BookEdit/BookEdit';
import Categories from "../Categories/Categories";
import bookRepository from "../../repository/bookRepository";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            books: [],
            bookPrints: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main className={"mt-5"}>
                    <div className={"container"}>
                        <Route path={"/categories"} exact render={() =>
                            <Categories categories={this.state.categories}/>}
                        />
                        <Route path={"/books/add"} exact render={() =>
                            <BookAdd
                                categories={this.state.categories}
                                authors={this.state.authors}
                                addBook={this.addBook}/>
                        }/>
                        <Route path={"/books/edit/:id"} exact render={() =>
                            <BookEdit
                                categories={this.state.categories}
                                authors={this.state.authors}
                                onEditBook={this.editBook}
                                book={this.state.selectedBook}/>
                        }/>
                        <Route path={"/books/details/:id"} exact render={() =>
                            <BookDetails
                                book={this.state.selectedBook}
                                bookPrints={this.state.bookPrints}
                                onMarkAsTaken={this.onMarkAsTaken}
                                onMarkAsReturned={this.onMarkAsReturned}
                                onDeleteBookPrint={this.deleteBookPrint}
                                addNewBookPrint={this.addNewBookPrint}
                            />
                        }/>
                        <Route path={"/books"} exact render={() =>
                            <BooksList books={this.state.books}
                                       onEdit={this.getBook}
                                       onDelete={this.deleteBook}
                                       onView={this.onViewGet}/>
                        }/>
                        <Redirect to={"/books"}/>
                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
    }

    loadBooks = () => {
        bookRepository.fetchBooks().then((data) => {
            this.setState({
                books: data.data
            })
        });
    }

    loadCategories = () => {
        bookRepository.fetchCategories().then((data) => {
            this.setState({
                categories: data.data
            })
        });
    }

    loadAuthors = () => {
        bookRepository.fetchAuthors().then((data) => {
            this.setState({
                authors: data.data
            })
        });
    }

    onViewGet = (id) => {
        this.getBook(id);
        this.getBookPrints(id);
    }

    getBook = (id) => {
        bookRepository.getBook(id).then((data) => {
            this.setState({
                selectedBook: data.data
            })
        })
    }

    getBookPrints = (id) => {
        bookRepository.getBookPrints(id).then((data) => {
            this.setState({
                bookPrints: data.data
            })
        })
    }

    addBook = (name, price, quantity, category, manufacturer) => {
        bookRepository.addBook(name, price, quantity, category, manufacturer).then(() => {
            this.loadBooks();
        });
    }

    editBook = (id, name, price, quantity, category, manufacturer) => {
        bookRepository.editBook(id, name, price, quantity, category, manufacturer).then(() => {
            this.loadBooks();
        });
    }

    deleteBook = (id) => {
        bookRepository.deleteBook(id).then(() => {
            this.loadBooks();
        });
    }

    onMarkAsTaken = (id) => {
        bookRepository.markAsTakenBookPrint(id).then(() => {
            this.reloadSelected();
        });
    }

    onMarkAsReturned = (id) => {
        bookRepository.onMarkAsReturnedBookPrint(id).then(() => {
            this.reloadSelected();
        });
    }

    deleteBookPrint = (id) => {
        bookRepository.deleteBookPrint(id).then(() => {
            this.reloadSelected();
        });
    }

    addNewBookPrint = (id) => {
        bookRepository.addNewBookPrint(id).then(() => {
            this.reloadSelected();
        });
    }

    reloadSelected() {
        this.loadBooks();
        this.getBook(this.state.selectedBook.id);
        this.getBookPrints(this.state.selectedBook.id);
    }
}

export default App;
