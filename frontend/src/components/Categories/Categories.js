import React from 'react';
import {BiCategoryAlt} from "react-icons/bi";

const Categories = (props) => {
    return (
        <>
            <div className={"row py-1"}>
                <h1 className={"display-4 font-weight-bold mx-auto py-2"}><BiCategoryAlt/> Categories</h1>
            </div>
            <div className={"row py-1"}>
                <div className={"w-50 mx-auto"}>
                    <div className={"table-responsive"}>
                        <table className={"table table-sm table-hover"}>
                            <thead className={"thead-light"}>
                            <tr>
                                <th scope={"col"}>Categories</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.categories.map((category, index) =>
                                <tr key={index}>
                                    <td>{category}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories;
