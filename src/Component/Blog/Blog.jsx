import React, { useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import axios from 'axios';
function Blog(props) {

    let [Data, setData] = useState([

    ])
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/blogs/").then((res) => setData(res.data))
    },[])



    const [list, setList] = useState("");


    const [pageNumber, setPageNumber] = useState(0);

    const DataPerPage = 4;
    const pagesVisited = pageNumber * DataPerPage;

    const pageCount = Math.ceil(Data.length / DataPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };




    let open_modal = ({ title, desciption, image }) => {

        console.log(title, desciption, image);
        Swal.fire({
            title: `${title}`,
            text: `${desciption}`,
            imageUrl: `${image}`,
            imageWidth: 500,
            imageHeight: 400,
            imageAlt: 'Custom image',
            confirmButtonText:'X',
            confirmButtonColor: '#00D9A5',

        })
    }

    return (



        <div>
            <div className="page-section">
                <div className="container">
                    <h2 className='text-center bg-light p-3'>Blogs</h2>
                    <div className="row">

                        <div className="sidebar col-md-6 my-2">
                            <div className="sidebar-block">
                                <h3 className="sidebar-title">Search</h3>
                                <form action="#" className="search-form">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Type a keyword To Search" onChange={(event) => {
                                            setList(event.target.value);
                                        }} />
                                        <span className="icon mai-search" />
                                    </div>
                                </form>
                            </div>



                            <div className="sidebar-block">
                                <h3 className="sidebar-title">Paragraph</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut, sunt placeat nam vero culpa sapiente consectetur similique, inventore eos fugit cupiditate numquam!</p>
                            </div>
                        </div>




                        <div className='col-md-6 col-sm-12' style={{ "display": "flex", "flexWrap": "wrap", "justifyContent": "center" , "minHeight":"490px"}}>
                            {Data.slice(pagesVisited, pagesVisited + DataPerPage).filter((item) => {
                                if (list === "") {
                                    return item;
                                }
                                else if (item.title.toLowerCase()
                                    .includes(list.toLowerCase())) {
                                    return item
                                }

                            }).map((item) => (

                                <div className=" col-md-5 col-sm-7 py-2 mx-3" style={{ "width": "260px" }}>
                                    <div className="card-blog">
                                        <div className="header">
                                            <div className="post-category">
                                                <span href="#">{item.desciption.slice(0, 5)}</span>
                                            </div>
                                            <span  className="post-thumb" style={{ cursor: "pointer" }}  onClick={() => open_modal(item)}>
                                                <img src={item.image} />
                                            </span>
                                        </div>
                                        <div className="body">
                                            <h5 className="post-title" style={{ cursor: "context-menu" }}  >{item.title}</h5>

                                        </div>
                                    </div>
                                </div>

                            ))
                            }

                        </div>



                    </div> {/* .row */}
                </div> {/* .container */}


                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />

            </div> {/* .page-section */}
        </div>

    );
}

export default Blog;