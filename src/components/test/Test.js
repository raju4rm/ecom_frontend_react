import React,{ useCallback, useEffect, useState }  from 'react'
import { Button } from 'primereact/button';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nano/theme.css';
import 'primeicons/primeicons.css';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

import { getList } from '../../store/role/action'
import { useDispatch, useSelector } from 'react-redux';
import PaginatorComponent from '../PaginatorComponent';
import BreadCrumbComponent from '../BreadCrumbComponent';
import SelectBoxComponent from '../SelectBoxComponent';
import TextBoxFloating from '../TextBoxFloating';

const Test = () => {
    const module = 'Test';
    const [validationErrors, setValidationErrors]   = useState({ serverErrors: null, formErrors: false })
    const [formData, setFormData]                   = useState({name:"", username:"", test:""}); 
    const {name, username, test} = formData;
    
     
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
            value=selectedOption.value;
        }else{
            value='';
        }
        setFormData({
          ...formData,
          [fieldName.name]:  value ,
        });
      };
    //Call get api

    const handleSubmit = async (e) => { 
        console.log(formData)  
        e.preventDefault();
        const error =  !username || !name;
        if (error) {
            setValidationErrors((prevState) => ({ ...prevState, formErrors: true }));
            console.log(validationErrors)
        } else {
            //await dispatch(setAdd(formData))
            setValidationErrors((prevState) => ({ ...prevState, formErrors: false }));
        } 
    };

    
    /* start filter */
    const [isCollapsFilter,setIsCollapsFilter]= useState(true);
    const toggleFilter = () => {
        setIsCollapsFilter(!isCollapsFilter);
    }

    // loading button start
    const [loading, setLoading] = useState(false);
    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    //loading button end 

    /* end filter */

    /* start breadCrumb value */
    const BreadCrumbValue = [
        {
            label: 'Role',
        },
        {
            label: 'Permission',
        },
        {
            label: 'Permission',
            template:[
                {
                    link: 'test',
                    linkLabel: 'Create'
                }
            ]
        },
    ]
    
    /* end breadCrumb value */

    // select start

    const options = [
        { value: 1, label: 'Chocolate' },
        { value: 2, label: 'Strawberry' },
        { value: 3, label: 'Vanilla' },
    ];

    // select end

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
   

    const states = useSelector((state) => state.role);
    const { limitPerPage, pageNo } = useSelector((state) => state.pagination);

    const getItemList = () => {
        dispatch(getList({  limitPerPage, pageNo }))
    }

    useEffect(() => {
        getItemList()
    }, [limitPerPage, pageNo]);

    const { success, summary, severity, message,items,totalCount } = states
    useEffect(() => {
        if (items) { setData(items) }
        if (totalCount) { setTotalRecords(totalCount) }
        
    }, [success, items, totalCount]);
       
    return ( 
        <>
            <div className="content-wrapper">

                <BreadCrumbComponent BreadCrumbValue={BreadCrumbValue} module={module}/>

                {/* start filter  */}
                <section className="content">
                    <div className={`card card-default custom-card-default ${isCollapsFilter?'collapsed-card':''}`}>
                        <div className="card-header">
                            <p className='card-title'>
                                <strong>
                                    Filter Roles
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
                                            requiredValue={true}
                                            errorsValue={validationErrors}
                                            formDataValue={formData}
                                            onChangeValue={handleChange}
                                            placeholderValue=''
                                            value={name}
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <TextBoxFloating 
                                            typeValue="text"
                                            labelValue='Username'
                                            idValue='username'
                                            classValue=''
                                            nameValue='username' 
                                            requiredValue={true}
                                            errorsValue={validationErrors}
                                            formDataValue={formData}
                                            onChangeValue={() => handleChange('test')}
                                            placeholderValue=''
                                            value={username}
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <SelectBoxComponent 
                                            options={options} 
                                            labelValue='test test' 
                                            isMulti={false} 
                                            isLoading={true} 
                                            idValue='test'
                                            classValue=''
                                            nameValue='test' 
                                            requiredValue={true}
                                            value={test}
                                            defaultOption={options.find(item => 2 === item.value) }
                                            onChangeValue={handleSelectChange}
                                            errorsValue={validationErrors}
                                            formDataValue={formData}
                                        />
                                    </div>
                                </div>
                                
                            </div>
                            <div className="card-footer" style={{textAlign:'right'}}>
                                <Button label="Reset" severity="warning" rounded icon="pi pi-times" loading={loading} onClick={load} /> 
                                &nbsp;
                                <Button type="submit" label="Submit" severity="success" rounded icon="pi pi-check" loading={loading} /> 
                                
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
                                                Roles
                                            </strong>
                                        </p>
                                        
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-sm-12'>
                                                <DataTable value={data}  sortMode="multiple"  tableStyle={{ minWidth: '50rem' }} scrollable scrollHeight="400px"
                                                    stripedRows>
                                                    <Column sortable field="name" header="Name" style={{ width: '25%' }}></Column>
                                                    <Column field="role_id" header="Country" style={{ width: '25%' }}></Column>
                                                    
                                                   
                                                </DataTable>

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

export default Test