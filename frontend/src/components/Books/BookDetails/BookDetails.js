import ReactPaginate from "react-paginate";
import BookPrintComponent from "./BookPrintComponent/BookPrintComponent";

import React from 'react';
import {Link} from "react-router-dom";
import {FaPlus} from "react-icons/fa";
import {BsFillBackspaceFill} from "react-icons/bs"
import {MdOutlineNavigateBefore, MdOutlineNavigateNext} from "react-icons/md";

class BookDetails extends React.Component {

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
        const pageCount = Math.ceil(this.props.bookPrints.length / this.state.size);
        const bookPrintList = this.getBookPrintsPage(offset, nextPageOffset);

        return (
            <div className="">
                <div className={"row py-4"}>
                    <div>
                        <Link className={"btn text-danger font-weight-bold"} to={"/books"}> <BsFillBackspaceFill/> Back</Link>
                    </div>
                    <div className={"pr-5"}>
                        <a className={"btn"}
                           onClick={() => this.props.addNewBookPrint(this.props.book?.id)}>
                            <FaPlus/> Add new copy of this book
                        </a>
                    </div>
                    <div className={"pl-5"}>
                        <h1>Book Details</h1>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-6"}>
                        <div className={"mr-5"}>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text"
                                           className="form-control"
                                           id="name"
                                           name="name"
                                           value={this.props.book?.name}
                                           disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text"
                                           className="form-control"
                                           id="category"
                                           name="category"
                                           value={this.props.book?.category}
                                           disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Author</label>
                                    <input type="text"
                                           className="form-control"
                                           id="author"
                                           name="author"
                                           value={this.props.book?.author?.name + ' ' + this.props.book?.author?.surname}
                                           disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Author's country of origin</label>
                                    <input type="text"
                                           className="form-control"
                                           id="author"
                                           name="author"
                                           value={this.props.book?.author?.country?.name + ' (' + this.props.book?.author?.country?.continent + ')'}
                                           disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="availableCopies">Available Copies</label>
                                    <input type="text"
                                           className="form-control"
                                           id="availableCopies"
                                           name="availableCopies"
                                        // placeholder={this.props.book.availableCopies}
                                           value={this.props.book.availableCopies}
                                           disabled
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <div className={""}>
                            <h5>Book copies</h5>
                        </div>
                        <div className={""}>
                            <div className={"row"}>
                                <div className={"table-responsive mt"}>
                                    <table className={"table table-hover"}>
                                        <thead className={"thead-light"}>
                                        <tr>
                                            <th scope={"col"}>ID</th>
                                            <th scope={"col"}>Status</th>
                                            <th scope={"col"}></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {bookPrintList}
                                        </tbody>
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
                        </div>
                    </div>
                </div>



            </div>
        )
    }


    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }

    getBookPrintsPage = (offset, nextPageOffset) => {
        return this.props.bookPrints.map((term, index) => {
            return (
                <BookPrintComponent key={index}
                                    print={term}
                                    onDeleteBookPrint={this.props.onDeleteBookPrint}
                                    onMarkAsTaken={this.props.onMarkAsTaken}
                                    onMarkAsReturned={this.props.onMarkAsReturned}/>
            );
        }).filter((book, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }

}

export default BookDetails;
