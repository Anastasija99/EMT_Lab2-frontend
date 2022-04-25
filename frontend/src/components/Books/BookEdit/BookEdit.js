import React, {useCallback} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {BsFillBackspaceFill} from "react-icons/bs";
import {IoMdDoneAll} from "react-icons/io"

const BookEdit = ({book, authors, onEditBook, categories}) => {

    const history = useHistory();

    const [formData, updateFormData] = React.useState({
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

    const onFormSubmit = (e) => {
        e.preventDefault();

        const name = formData.name !== "" ? formData.name : book.name;
        const category = formData.category !== -1 ? formData.category : book.category;
        const author = formData.author !== -1 ? formData.author : book.author.id;
        const availableCopies = book.availableCopies;

        onEditBook(book.id, name, category, author, availableCopies);

        history.push("/books");
    }

    return (
        <div className="row book-edit">
            <div>
                <Link className={"btn text-danger font-weight-bold"} to={"/books"}> <BsFillBackspaceFill/> Back</Link>
            </div>
            <div className={"col-sm-12 m-4"}>
                <h1>Edit book details</h1>
            </div>
            <div className={"col-sm-12"}>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Title</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               placeholder={book?.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" id="category"
                                className="form-control"
                                onChange={handleChange}
                                defaultValue={book?.category}>
                            {categories.map((category, index) => {
                                if (book.category !== undefined && book.category === category)
                                    return <option key={index} selected={book.category}
                                                   value={category}>{category}</option>
                                else
                                    return <option key={index} value={category}>{category}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="author" id="author" className="form-control" onChange={handleChange}
                                defaultValue={book?.author?.id}>
                            {authors.map((author, index) => {
                                if (book.author !== undefined &&
                                    book.author.id === author.id)
                                    return <option key={index} selected={book.author.id}
                                                   value={author.id}>{author.name + ' ' + author.surname}</option>
                                else
                                    return <option key={index} value={author.id}>{author.name + ' ' + author.surname}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Number of available copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               value={book.availableCopies}
                               onChange={handleChange}
                               disabled
                        />
                    </div>
                    <button id="submit" type="submit" className={"btn btn-primary"}><IoMdDoneAll/> Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookEdit;
