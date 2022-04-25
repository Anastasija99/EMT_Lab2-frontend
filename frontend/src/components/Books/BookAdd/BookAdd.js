import React, {useCallback, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {IoMdDoneAll} from "react-icons/io";
import {BsFillBackspaceFill} from "react-icons/bs";

const BookAdd = ({categories, authors, addBook}) => {

    const history = useHistory();

    const [formData, updateFormData] = useState({
        name: "",
        category: -1,
        author: -1,
        availableCopies: 0
    })

    const handleChange = useCallback(
        (e) => {
            updateFormData({
                ...formData,
                [e.target.name]: e.target.value.trim()
            });
        }, [formData]
    )

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            const {name, category, author, availableCopies} = formData;
            addBook(name, category, author, availableCopies);

            history.push("/books");

        }, [addBook, formData, history]
    )

    return (
        <div className="row">
            <div>
                <Link className={"btn text-danger font-weight-bold"} to={"/books"}> <BsFillBackspaceFill/> Back</Link>
            </div>
            <div className={"col-sm-12 m-4"}>
                <h1>Add Book</h1>
            </div>
            <div className={"col-sm-12"}>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder="Enter book name"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" id="category" className="form-control" onChange={handleChange}
                                required>
                            <option value="" selected disabled hidden>Choose category</option>
                            {categories.map((category, index) =>
                                <option key={index} value={category}>{category}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="author" id="author" className="form-control" onChange={handleChange}
                                required>
                            <option value="" selected disabled hidden>Choose author</option>
                            {authors.map((author, index) =>
                                <option key={index} value={author.id}>{author.name + ' ' + author.surname}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Available Copies</label>
                        <input type="number"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               required
                               placeholder="Enter number of available copies for this book"
                               onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className={"btn btn-primary"}><IoMdDoneAll/> Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookAdd;
