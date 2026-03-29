import React,{ useCallback, useEffect, useState ,useRef }  from 'react'
import { Link } from 'react-router-dom';

import { Group, Text, NumberInput, MantineProvider  } from '@mantine/core';
import { DataTable } from 'mantine-datatable';


import { getList, searchItem } from '../../store/role/action'
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbComponent from '../layout2/BreadCrumbComponent';
import {clearState} from '../../store/role/slice'
import {clearState as clearPermissionState} from '../../store/backend/permission/slice'
import AppDataTable from '../layout2/formInput/AppDataTable';



export default function List(){
   
    /* start breadCrumb value */
     
    const module = 'Role';
    const BreadCrumbValue = [
        {
            label: 'Role',
            link: '/role'
        },
        {
            label: 'Role list',
        }
    ]
    /* end breadCrumb value */

    

    const columns = [
        {
        accessor: 'actions',
        title: 'Action',
        width: '10%',
        render: (row) => (
            <Link to={`/role/edit/${row.id}`}>
                <i className="feather-edit me-1"></i> 
            </Link>
        ),
    },
        { accessor: 'name', title: 'First Name', width: '30%' },
        { accessor: 'slug', title: 'Last Name', width: '30%' },
        { accessor: 'is_active', title: 'Email', width: '30%' },
    ];

    const states = useSelector((state) => state.role);
    const { limitPerPage, pageNo } = useSelector((state) => state.pagination);
    const dispatch = useDispatch();
    const getItemList = () =>{
        dispatch(getList({limitPerPage, pageNo}))
    }

    useEffect(() => {
        getItemList()
    },[limitPerPage, pageNo])
    const { success, summary, severity, message,items,totalCount,loading } = states


    return ( 
        <>
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
                                
                                <Link to='/role/add'  className="btn btn-primary successAlertMessage">
                                    <i className="feather-plus me-2"></i>
                                    <span>Create New</span>
                                </Link>
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
                        <div className="col-xl-12">
                            <div className="card stretch stretch-full">
                                <AppDataTable 
                                    totalRecordsValue={totalCount} 
                                    recordsValue={items}
                                    columnsValue={columns}
                                    heightValue={300}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

