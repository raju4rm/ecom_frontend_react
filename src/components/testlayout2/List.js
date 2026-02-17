import React,{ useCallback, useEffect, useState }  from 'react'
import { DataTable } from 'mantine-datatable';
import dayjs from 'dayjs';
import employees from '../../data/employees.json';
import BreadCrumbComponent from '../layout2/BreadCrumbComponent';
import { useNavigate, Link } from 'react-router-dom';
import AppDataTable from '../layout2/formInput/AppDataTable';
import { getList } from '../../store/testLayout2/action';
import { useDispatch, useSelector } from 'react-redux';


export default function List(){
    const dispatch = useDispatch();
    
    const states = useSelector((state) => state.testLayout2);
    const { limitPerPage, pageNo } = useSelector((state) => state.pagination);
    
    const getItemList = () => {
        dispatch(getList({  limitPerPage, pageNo }))
    }
    useEffect(() => {
        getItemList()

    }, [limitPerPage, pageNo]);
    const module = 'Test'; 
  
    /* start breadCrumb value */
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
    const { success, summary, severity, message,items,totalCount,loading } = states

    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    useEffect(() => {
        if (items) { setData(items) }
        if (totalCount) { setTotalRecords(totalCount) }
        
    }, [success, items, totalCount]);
          
    const columns = [
        { accessor: 'test_layout2_id', title: 'First Name', width: 120 },
        { accessor: 'input_box', title: 'Last Name', width: 120 },
        { accessor: 'select_box', title: 'Email', width: '100%' }
    ];
    
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
                                
                                <Link to="/test-layout-2" className="btn btn-primary successAlertMessage">
                                    <i className="feather-plus me-2"></i>
                                    <span>Add New</span>
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
                                    data={data}
                                    columns={columns}
                                    height={300}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

