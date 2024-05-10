import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';

const Home1 = () => {
    // const headerSlice = useSelector((state) => state.header);
    // const isAuthenticated = useSelector(state => state.login);
    return ( 
        <>
            <div className="content-wrapper">
                <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>General Form</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                        <Link to="/login"  > Contact us </Link> 
    
                        </li>
                        <li className="breadcrumb-item active">General Form</li>
                        </ol>
                    </div>
                    </div>
                </div>
                </section>

                <section className="content">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-md-6">
                        <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Quick Example</h3>
                        </div>
                        <form>
                            <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputFile">File input</label>
                                <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="exampleInputFile"/>
                                    <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <span className="input-group-text">Upload</span>
                                </div>
                                </div>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            </div>
                            <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </div>
        </>
    )
}

export default Home1