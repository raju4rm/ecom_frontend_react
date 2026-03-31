import React,{ useCallback, useEffect, useState ,useRef }  from 'react'
import { Link } from 'react-router-dom';

export default function AppFilter({
    children,
    handleSubmitValue,
    resetFilterValue,
    loadingValue
}){
    const filterRef = useRef(null);
    const [isFilter,setIsFilter] = useState(false);
    const toggleFilter = () =>{
        setIsFilter(!isFilter)
    }

    /* small screen filter toggle start */
    const [isMinFilter,setIsMinFilter] = useState(false);
    const toggleMinFilter = () =>{
        setIsMinFilter(!isMinFilter)
    }
    /* small screen filter toggle end */

    /* filter & reset submit start */
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleSubmitValue()
    }

    const resetFilter = () => {
        resetFilterValue()
        setIsFilter(false)
    }
    /* filter & reset submit end */

    /* outside click filter close start */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilter(false);
                setIsMinFilter(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    /* outside click filter close end */
    return (
        <>
            <div className="page-header-right ms-auto">
                <div className={`page-header-right-items ${isMinFilter ? "page-header-right-open" : "page-header-right-close"}`}>
                    <div className="d-flex d-md-none">
                        <a className="page-header-right-close-toggle" onClick={toggleMinFilter}>
                            <i className="feather-arrow-left me-2"></i>
                            <span>Back</span>
                        </a>
                    </div>
                    <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                        <div className="dropdown filter-dropdown" ref={filterRef}   >
                            <a className="btn btn-md btn-light-brand" data-bs-toggle="dropdown" data-bs-offset="0, 10" data-bs-auto-close="outside" onClick={toggleFilter}>
                                <i className="feather-filter me-2"></i>
                                <span>Filter</span>
                            </a>
                            <div className={`dropdown-menu dropdown-menu-end ${isFilter ? "show filter-show" : ""}`} style={{maxHeight:'400px', overflowY: 'auto'}}>
                                <form onSubmit={handleSubmit}>    
                                    {children}
                                    <div className="dropdown-item">
                                        <a className="btn btn-sm btn-warning me-2" onClick={resetFilter}><i className="feather-x me-2"></i>Reset </a>
                                        <button type="submit" className="btn btn-sm btn-primary " >
                                            {loadingValue ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Loading...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="feather-search me-2"></i>Search 
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                        <Link to='/role/add'  className="btn btn-md btn-primary">
                            <i className="feather-plus me-2"></i>
                            <span>Create New</span>
                        </Link>
                        
                    </div>
                    
                </div>
                <div className="d-md-none d-flex align-items-center">
                    <a className="page-header-right-open-toggle" onClick={toggleMinFilter}>
                        <i className="feather-align-right fs-20"></i>
                    </a>
                </div>
            </div>
        </>
    )
}