import React from 'react';
import ReactPaginate from 'react-paginate'
import './Books.css';
import {Link} from "react-router-dom";
import {FaPlus} from "react-icons/fa"
import {ImBooks} from "react-icons/im";
import BookRowFragment from "./BookRowFragment/BookRowFragment";
import {MdOutlineNavigateNext, MdOutlineNavigateBefore} from "react-icons/md";

class BooksList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 5
        }
    }

    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.books.length / this.state.size);

        const bookList = this.getBooksPage(offset, nextPageOffset);

        return (
            <>
                <div className={"row"}>
                    <h1 className={"display-4 font-weight-bold mx-auto py-2"}><ImBooks/> Books</h1>
                </div>
                <div className={"row pb-2 text-start"}>
                    <Link to={"/books/add"} className={"btn"}><FaPlus/> Add a new book</Link>
                </div>
                <div className={"row"}>
                    <div className={"table-responsive mt"}>
                        <table className={"table table-hover"}>
                            <thead className={"thead-light"}>
                            <tr>
                                <th scope={"col"}>ID</th>
                                <th scope={"col"}>Book Name</th>
                                <th scope={"col"}>Book Category</th>
                                <th scope={"col"}>Author Name</th>
                                <th scope={"col"}>Available Copies</th>
                                <th scope={"col"}/>
                            </tr>
                            </thead>
                            <tbody>{bookList}</tbody>
                        </table>
                    </div>
                    <div className="col mb-3">
                        <div className="row">
                            <div className="col-sm-12 col-sm-12">
                                <ReactPaginate previousLabel={<MdOutlineNavigateBefore/>}
                                               nextLabel={<MdOutlineNavigateNext/>}
                                               breakLabel={<a href="/#">...</a>}
                                               breakClassName={"break-me"}
                                               pageClassName={"ml-1"}
                                               pageCount={pageCount}
                                               marginPagesDisplayed={2}
                                               pageRangeDisplayed={5}
                                               onPageChange={this.handlePageClick}
                                               containerClassName={"pagination react-pagination-js-border-bottom mb-3 justify-content-center"}
                                               activeClassName={"active"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }

    getBooksPage = (offset, nextPageOffset) => {
        return this.props.books.map((book, index) => {
            return (
                <BookRowFragment
                    key={index}
                    book={book}
                    onEdit={this.props.onEdit}
                    onView={this.props.onView}
                    onDelete={this.props.onDelete}/>
            );
        }).filter((book, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }
}

export default BooksList;
