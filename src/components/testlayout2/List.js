import React,{ useCallback, useEffect, useState }  from 'react'

import BreadCrumbComponent from '../layout2/BreadCrumbComponent';


export default function List(){
    
    const module = 'Test'; 
  
    /* start breadCrumb value */
    const BreadCrumbValue = [
        {
            label: 'Role',
            link: '/role'
        },
        {
            label: 'Role list',
            link: '/role'
        },
        {
            label: 'Create',
        },
    ]
    /* end breadCrumb value */


    
    return ( 
        <>
           {/* <main className="nxl-container"> */}
            <div className="nxl-content">
                <div className="page-header">
                    <BreadCrumbComponent BreadCrumbValue={BreadCrumbValue} module={module} />
                    <div className="page-header-right ms-auto">
                        <div className="page-header-right-items">
                            <div className="d-flex d-md-none">
                                <a href="" className="page-header-right-close-toggle">
                                    <i className="feather-arrow-left me-2"></i>
                                    <span>Back</span>
                                </a>
                            </div>
                            <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                                <a href=";" className="btn btn-light-brand" data-bs-toggle="offcanvas" data-bs-target="#proposalSent">
                                    <i className="feather-layers me-2"></i>
                                    <span>Save & Send</span>
                                </a>
                                <a href=";" className="btn btn-primary successAlertMessage">
                                    <i className="feather-save me-2"></i>
                                    <span>Save</span>
                                </a>
                            </div>
                        </div>
                        <div className="d-md-none d-flex align-items-center">
                            <a href="" className="page-header-right-open-toggle">
                                <i className="feather-align-right fs-20"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="main-content">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="card stretch stretch-full">
                                    ww
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

