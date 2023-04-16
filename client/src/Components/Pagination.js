import React from 'react'
import "./Pagination.css"
const Pagination = ({totalPosts, postsPerPage, currentPage ,setCurrentPage}) => {
    let pages = [];
    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
    pages.push(i)
}

  return (
    <div className='paginationn'>
        {
            pages.map((page, index) => {
                return <button key={index} onClick={() => setCurrentPage(page)} className={page == currentPage ? "active" : ""}>{page}</button>
            })
        }
    </div>
  )
}

export default Pagination