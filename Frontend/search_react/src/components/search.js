import React, { useState } from "react";

export default function Search() {

    const [data, setData] = useState([])

    function GetBooks(body) {
        var keyword = document.getElementById('keyword')
        async function Put(value) {
            console.log('value---------', value)
            fetch("http://127.0.0.1:8000/search/books/", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({
                    "keyword": value
                })
            })
                .then((res) => res.json())
                .then((response) => {
                    setData(response.data)
                    console.log('res------', response)
                })
                .catch((err) => console.error("Error: ", err))
        }
        Put(keyword.value)
    }

    return (
        <div className='main-container'>
            <div className='search-container'>
                <textarea id="keyword" >

                </textarea><br />
                <button onClick={(e) => { e.preventDefault(); GetBooks() }} type="submit" className="submit">Submit</button>
            </div>
            <div className="result-container">
                {
                    data.map((e) => (
                        <div key={e.amazon_id} className='result'>
                            <img src={e.image_url} width='120px' alt='book-img' className="book-img"></img>
                            <div className="book-details">
                                <h3>{e.book_name}</h3>
                                <div>
                                    <p>{e.price}</p>
                                    <p>{e.author}</p>
                                    <p>Published - {e.published_at}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
