import React from 'react';
import {Link} from 'react-router-dom';
import {FaSearch, FaEdit} from 'react-icons/fa'
import {MdOutlineDeleteOutline} from 'react-icons/md'

const BookRowFragment = ({book, onEdit, onView, onDelete}) => {

    const {id, name,  category, author, availableCopies } = book;

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{category}</td>
            <td>{author.name + " " + author.surname}</td>
            <td>{availableCopies}</td>
            <td>
                <Link className={"btn btn-success ml-2 view-btn"} onClick={() => onView(id)} to={`/books/details/${id}`}>
                    <FaSearch/> Details
                </Link>
                <Link className={"btn btn-info ml-2 edit-btn"} onClick={() => onEdit(id)} to={`/books/edit/${id}`}>
                    <FaEdit/> Edit
                </Link>
                <a title={"Delete"} className={"btn btn-danger ml-2"} onClick={() => onDelete(id)}>
                   <MdOutlineDeleteOutline/> Delete
                </a>
            </td>
        </tr>
    )
}

export default BookRowFragment;