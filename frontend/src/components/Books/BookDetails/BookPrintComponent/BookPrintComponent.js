import React from 'react';
import {MdOutlineDeleteOutline} from "react-icons/md";
import {BsFillBookmarkCheckFill, BsFillBookmarkStarFill} from "react-icons/bs"

const BookPrintComponent = ({print, onDeleteBookPrint, onMarkAsReturned, onMarkAsTaken}) => {

    const {id, status} = print;

    return (
        <tr>
            <td>{id}</td>
            <td>{status}</td>
            <td className={"text-right"}>
                {
                    status === "AVAILABLE" ?
                        <a className={"btn btn-info"} onClick={() => onMarkAsTaken(id)}>
                            <BsFillBookmarkStarFill/> Mark As Taken
                        </a>
                        :
                        <a className={"btn btn-info"} onClick={() => onMarkAsReturned(id)}>
                            <BsFillBookmarkCheckFill/> Mark As Returned
                        </a>
                }
                <a title={"Delete"} className={"btn btn-danger ml-2"} onClick={() => onDeleteBookPrint(id)}>
                    <MdOutlineDeleteOutline/> Delete
                </a>
            </td>
        </tr>
    )
}

export default BookPrintComponent;
