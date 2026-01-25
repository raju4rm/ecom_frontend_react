import React from 'react'
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link } from 'react-router-dom';
import config from '../../utils/config';

function BreadCrumbComponent({BreadCrumbValue,module}) {
    document.title = module+' | '+config.siteName
    
    console.log(BreadCrumbValue);

    return (
        <>
            <div className="page-header-left d-flex align-items-center">
                <div className="page-header-title">
                    <h5 className="m-b-10">{module}</h5>
                </div>
                <ul className="breadcrumb">
                    {BreadCrumbValue.map((value,index) =>
                        (
                            <li className="breadcrumb-item" key={index}>
                                {value.link ? (
                                    <Link to={value.link}>{value.label}</Link>
                                ) : (
                                    value.label
                                )}
                            </li>
                        )
                    )}
                </ul>
            </div>
        </>
    )
}

export default BreadCrumbComponent