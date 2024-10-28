import React,{ useCallback, useEffect, useState ,useRef }  from 'react'
import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nano/theme.css';
import 'primeicons/primeicons.css';
import { Tooltip } from 'primereact/tooltip';

import { Tag } from 'primereact/tag';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

import { getList, searchItem } from '../../../store/category/action'
import { useDispatch, useSelector } from 'react-redux';
import PaginatorComponent from '../../PaginatorComponent';
import BreadCrumbComponent from '../../BreadCrumbComponent';
import SelectBoxComponent from '../../SelectBoxComponent';
import TextBoxFloating from '../../TextBoxFloating';
import { Toast } from 'primereact/toast';
import {clearState} from '../../../store/category/slice'

export default function List(){
    const module = 'Category';
    const [validationErrors, setValidationErrors]   = useState({ serverErrors: null, formErrors: false })
    const [formData, setFormData]                   = useState({name:"", slug:"", is_active:""}); 
    const {name, slug, is_active} = formData;
    const toast = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [reset, setReset] = useState(false);
    const [loadingButton, setLoadingButton] = useState('');


    
    // On change update value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handleSelectChange = (selectedOption, fieldName) => {
        let value;
        if(selectedOption){
            setIsFocused(true);
            value=selectedOption.value;
        }else{
            setIsFocused(false);
            value='';
        }
        setFormData({
            ...formData,
            [fieldName.name]:  value ,
        });
    };
    //Call get api

    

    
    /* start filter */
    const [isCollapsFilter,setIsCollapsFilter]= useState(true);
    const toggleFilter = () => {
        setIsCollapsFilter(!isCollapsFilter);
    }

    // loading button start
    const resetFilter = () => {
        setFormData({name:"", slug:"", is_active:''}); 
        setReset(true)
        getItemList()
        setLoadingButton('reset');        
    };

    //loading button end 

    const handleSubmit = async (e) => { 
        e.preventDefault();
        await dispatch(searchItem(formData))
        setValidationErrors((prevState) => ({ ...prevState, formErrors: false }));
        setLoadingButton('filter');

    };
    /* end filter */

    /* start breadCrumb value */
    const BreadCrumbValue = [
        {
            label: 'Master Setup',
        },
        {
            label: 'Category',
        },
        {
            label: 'List',
        },
    ]
    
    /* end breadCrumb value */

    // select start

    const options = [
        { value: '', label: 'Select Status' },
        { value: 'y', label: 'Active' },
        { value: 'n', label: 'In-Active' },
    ];

    // select end

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
   

    const states = useSelector((state) => state.category);
    const { limitPerPage, pageNo } = useSelector((state) => state.pagination);

    const getItemList = () => {
        dispatch(getList({  limitPerPage, pageNo }))
    }
    useEffect(() => {
        getItemList()
    }, [limitPerPage, pageNo]);
    
    const { success, summary, severity, message,items,totalCount,loading } = states
    
    useEffect(() => {
        if (items) { setData(items) }
        if (totalCount) { setTotalRecords(totalCount) }
        if (message) { 
            toast.current.show({ severity: severity, summary: summary, detail: message, life: 3000 }); 
            dispatch(clearState());
        }
        
    }, [success, items, totalCount]);
       

    /* status label start */
    const statusBodyTemplate = (items) => {
        return <Tag value={getStatusText(items.is_active)} severity={getSeverity(items)}></Tag>;
    }

    const getStatusText = (status) => {
        switch (status) {
            case 'y':
                return 'Active';
            case 'n':
                return 'In-Active';
            default:
                return '';
        }
    };
    const getSeverity = (items) => {
        switch (items.is_active) {
            case 'y':
                return 'success';
            case 'n':
                return 'danger';
            default:
                return null;
        }
    };
    /* status label end */


    const actionBodyTemplate = (items) => {
        return (
            <>
            <Link to={`/master/category/edit/${items.master_category_id}`} className="p-button role_edit" tooltip="Save" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }}> <span className="pi pi-pencil"></span> </Link> &nbsp;
            
            </>
        );
    };
    

    
    return ( 
        <>
            <div className="content-wrapper">
                <Toast ref={toast} />
            
                <BreadCrumbComponent BreadCrumbValue={BreadCrumbValue} module={module}/>

                {/* start filter  */}
                <section className="content">
                    <div className={`card card-default custom-card-default ${isCollapsFilter?'collapsed-card':''}`}>
                        <div className="card-header">
                            <p className='card-title'>
                                <strong>
                                    Filter {module}
                                </strong>
                            </p>
                            <div className="card-tools">
                                <Button text icon={` ${isCollapsFilter? 'pi pi-plus' : 'pi pi-minus' }`} onClick={toggleFilter} /> 
                            </div>
                        </div>
                        <form 
                            noValidate="novalidate"
                            onSubmit={handleSubmit}
                        > 
                            <div className="card-body">
                                
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <TextBoxFloating 
                                            typeValue="text"
                                            labelValue='Name'
                                            idValue='name'
                                            classValue=''
                                            nameValue='name' 
                                            requiredValue={false}
                                            errorsValue={validationErrors}
                                            formDataValue={formData}
                                            onChangeValue={handleChange}
                                            placeholderValue=''
                                            value={name}
                                        />
                                    </div>
                                    
                                    <div className="form-group col-md-4">
                                        <SelectBoxComponent 
                                            optionsValue={options} 
                                            labelValue='Status' 
                                            isMulti={false} 
                                            isLoading={true} 
                                            idValue='is_active'
                                            classValue=''
                                            nameValue='is_active' 
                                            requiredValue={false}
                                            value={is_active}
                                            defaultOptionValue={options.find(item => formData.is_active === item.value) }
                                            onChangeValue={handleSelectChange}
                                            errorsValue={validationErrors}
                                            formDataValue={formData}
                                            isFocusedValue={isFocused}
                                            resetValue={reset}
                                        />
                                    </div>
                                </div>
                                
                            </div>
                            <div className="card-footer" style={{textAlign:'right'}}>
                                <Button 
                                    label="Reset" 
                                    severity="secondary" 
                                    rounded 
                                    icon="pi pi-undo" 
                                    loading={loadingButton === 'reset' && loading} 
                                    onClick={resetFilter} 
                                    
                                /> 
                                &nbsp;
                                <Button 
                                    type="submit" 
                                    label="Filter" 
                                    rounded 
                                    icon="pi pi-filter-fill" 
                                    loading={loadingButton === 'filter' && loading} 
                                /> 
                                
                            </div>
                        </form>
                    </div>
                </section>
                {/* end filter  */}

                {/* start main section */}
                <section className="content">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-12'>
                                <div className='card custom-card'>
                                    <div className="card-header">
                                        <p className='card-title'>
                                            <strong>
                                                {module}
                                            </strong>
                                        </p>
                                        <Link to="/master/category/add" className="p-button p-component p-button-rounded p-button-success" style={{float:'right'}} > <span className="pi pi-plus"></span> Add New</Link>
                                    </div>

                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-sm-12'>
                                                <DataTable value={data}  sortMode="multiple"  tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="400px"
                                                    stripedRows>
                                                    <Column body={actionBodyTemplate} header="Actions" />
                                                    <Column header="Status" body={statusBodyTemplate}></Column>

                                                    <Column sortable field="name" header="Name" style={{ width: '25%' }}></Column>
                                                    <Column field="description" header="Description" style={{ width: '25%' }}></Column>

                    
                                                </DataTable>
                                                <Tooltip target=".role_edit" mouseTrack mouseTrackLeft={10} />
                                                <PaginatorComponent totalRecords={totalRecords} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </section>
                {/* end main section */}
            </div>
        </>
    )
}

