import React,{ useCallback, useEffect, useState ,useRef }  from 'react'
import { Link } from 'react-router-dom';

import { Group, Text, NumberInput, MantineProvider  } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import employees from '../../data/employees.json';
import dayjs from 'dayjs';



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
            link: '/role'
        },
        {
            label: 'Create',
        },
    ]
    /* end breadCrumb value */


    const columns = [
        { accessor: 'firstName', title: 'First Name', width: 100 },
        { accessor: 'lastName', title: 'Last Name', width: 100 },
        { accessor: 'email', title: 'Email', width: '100%' },
    ];
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
                                
                                <a  className="btn btn-primary successAlertMessage">
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
                        <div className="col-xl-12">
                            <div className="card stretch stretch-full">
                                <AppDataTable 
                                    data={employees} 
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

