import React,{ useCallback, useEffect, useState  }  from 'react'
import {  Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { notifications } from '@mantine/notifications';     
import '@mantine/notifications/styles.css';


import { getList, searchItem } from '../../../store/category/action'
import BreadCrumbComponent from '../../layout2/BreadCrumbComponent';
import {clearState} from '../../../store/role/slice'
import AppDataTable from '../../layout2/formInput/AppDataTable';
import TextBox from '../../layout2/formInput/TextBox';
import AppFilter from '../../layout2/formInput/AppFilter';
import SelectBox from '../../layout2/formInput/SelectBox';



export default function List(){
    const module = 'Category';
    /* start breadCrumb value */
    const BreadCrumbValue = [
        {
            label: 'Master',
        },
        {
            label: 'Category',
        },
        {
            label: 'List',
        },
    ]
    /* end breadCrumb value */

    /* datatable data start */
    const columns = [
        {
            accessor: 'actions',
            title: 'Action',
            width: '10%',
            render: (row) => (
                <Link  key={row.master_category_id}  to={`/role/edit/${row.master_category_id}`}>
                    <i className="feather-edit me-1"></i> 
                </Link>
            ),
        },
        { accessor: 'name', title: 'Name', width: '30%' },
        { accessor: 'name', title: 'Parent', width: '30%' },
        { accessor: 'icon', title: 'Icon', width: '30%' },
        { accessor: 'image', title: 'Image', width: '30%' },
        { accessor: 'sort_order', title: 'Sort Order', width: '30%' },
        {
            accessor: 'is_active',
            title: 'Status',
            width: '30%',
            render: (row) => (
                row.is_active === 'y' ? (
                <span  key={row.id} className='badge bg-soft-success text-success '>Active</span>
                ) : (
                <span  key={row.id} className='badge bg-soft-danger text-danger '>In-Active</span>
                )
            ),
        }
    ];
    /* datatable data end */

    /* all data at 1st visit start */
    const states = useSelector((state) => state.category);
    const { success, summary, severity, message,items,totalCount,loading,error } = states
    const { limitPerPage, pageNo } = useSelector((state) => state.pagination);
    const dispatch = useDispatch();
    const getItemList = () =>{
        if (isFilterApplied) {
            dispatch(searchItem({ ...formData, limitPerPage, pageNo }));
        } else {
            dispatch(getList({ limitPerPage, pageNo }));
        }
    }
    useEffect(() => {
        getItemList()
        console.log(items);
    },[limitPerPage, pageNo])
    /* all data at 1st visit end */

    /* form data store start */
    const [formData, setFormData] = useState({name: "",is_active:"",limitPerPage:limitPerPage, pageNo:pageNo, errors: null });  
    const handleChange = useCallback((name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }, []);
    /* form data store end */

    /* filter & reset submit start */
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const handleSubmit = async (e) => { 
        setIsFilterApplied(true);
        await dispatch(searchItem(formData))
    };

    const resetFilter = () => {
        setIsFilterApplied(false);
        setFormData({ name: "", is_active: "" }); 
        getItemList()
    };
    /* filter & reset submit start */

    /* status dropdown option start */
    const options = [
        { value: '', label: 'All Status' },
        { value: 'y', label: 'Active' },
        { value: 'n', label: 'In-Active' },
    ];
    /* status dropdown option end */

    /* toaster start */
    useEffect(()=>{
        if(severity){
            notifications.show({
                color: severity=='error' ? 'red' : 'green' ,
                title: summary,
                message: message,
            });
            dispatch(clearState())
        }
    },[success,error])
    /* toaster end */

    return ( 
        <>
            <div className="nxl-content">
                <div className="page-header">
                    <BreadCrumbComponent BreadCrumbValue={BreadCrumbValue} module={module} />
                    
                    <AppFilter handleSubmitValue={handleSubmit} resetFilterValue={resetFilter} loadingValue={loading}
>
                        <div className="dropdown-item">
                            <TextBox 
                                labelValue='Role Name'
                                idValue='name'
                                classValue='name'
                                nameValue='name'
                                isRequired={false}
                                formDataValue={formData}
                                onChangeValue={handleChange}
                                placeholderValue='Role Name'
                            />
                        </div>
                        <div className="dropdown-item">
                            <SelectBox
                                labelValue='Status'
                                optionsValue={options}
                                idValue="is_active"
                                classValue="is_active"
                                nameValue="is_active"
                                isRequired={false}
                                defaultOptionValue=""
                                placeholderValue="Status"
                                isSearchable={true}
                                isDisabled={false}
                                formDataValue={formData}
                                onChangeValue={handleChange}
                                resetValue={false}
                            />
                        </div>                        
                    </AppFilter>
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

