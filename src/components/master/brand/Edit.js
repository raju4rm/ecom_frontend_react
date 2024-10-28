import React,{ useCallback, useEffect, useState }  from 'react'
import { Button } from 'primereact/button';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nano/theme.css';
import 'primeicons/primeicons.css';

import { getEdit, setEdit } from '../../../store/brand/action'
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbComponent from '../../BreadCrumbComponent';
import TextBoxFloating from '../../TextBoxFloating';
import TextareaFloating from '../../TextareaFloating';

import { useNavigate, Link, useParams } from 'react-router-dom';
import SelectBoxComponent from '../../SelectBoxComponent';


export default function Edit(props){
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const module = 'Edit Brand';
    const [validationErrors, setValidationErrors]   = useState({ serverErrors: null, formErrors: false })
    const [formData, setFormData]                   = useState({name:"", description:"", is_active:""}); 
    const {name,description,is_active} = formData;
    const states                                    = useSelector((state) => state.brand); 
    const {loading,errors,success,item} = states 
    const [isFocused, setIsFocused] = useState(false);
    const [reset, setReset] = useState(false);

    // On change update value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    //Call get api
    const handleSubmit = async (e) => { 
        e.preventDefault();
        const error =   !name || !is_active;
        if (error) {
            setValidationErrors((prevState) => ({ ...prevState, formErrors: true }));
        } else {
            await dispatch(setEdit(formData))
            setValidationErrors((prevState) => ({ ...prevState, formErrors: false }));
        } 
    };

    // loading button start
    const [buttonLoading, setLoading] = useState(false);
    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    //loading button end 

    /* start breadCrumb value */
    const BreadCrumbValue = [
        {
            label: 'Master Setup',
        },
        {
            label: 'Brand',
        },
        {
            label: 'Edit',
        },
    ]
    
    /* end breadCrumb value */

    //Set server errors
    useEffect(() => {  
        setValidationErrors((prevState) => ({ ...prevState, serverErrors: errors }));
        if(success){ 
            setValidationErrors({ serverErrors: null, formErrors: false })
            const decodedRedirectUrl= decodeURIComponent('/master/brand');
            navigate(decodedRedirectUrl)
        }
    }, [errors,success]);  
    

    //Call get api
    useEffect(() => {  
        if(id){ 
            dispatch(getEdit(id)); 
        }  
    }, []);

    useEffect(() => { 
        if(item) { setFormData({
            name: item.name !== undefined ? item.name : "", 
            is_active: item.is_active !== undefined ? item.is_active : "",
            master_brand_id: item.master_brand_id !== undefined ? item.master_brand_id : null,
            description: item.description !== undefined ? item.description : null,

        }); }  
        if(errors) { setFormData((prevState) => ({ ...prevState, seterror:errors }));  }  
    }, [errors,success,item]);

    // select start

    const options = [
        { value: '', label: 'Select Status' },
        { value: 'y', label: 'Active' },
        { value: 'n', label: 'In-Active' },
    ];

    // select end
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
    return ( 
        <>
            <div className="content-wrapper">

                <BreadCrumbComponent BreadCrumbValue={BreadCrumbValue} module={module}/>

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
                                                    <TextareaFloating 
                                                        rowValue={5}
                                                        columnValue={10}
                                                        labelValue='Description'
                                                        idValue='description'
                                                        classValue=''
                                                        nameValue='description' 
                                                        requiredValue={true}
                                                        errorsValue={validationErrors}
                                                        formDataValue={formData}
                                                        onChangeValue={handleChange}
                                                        placeholderValue=''
                                                        value={description}
                                                        
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
                                                        requiredValue={true}
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
                                            <Link to="/role" className="p-button p-component p-button-rounded p-button-warning" > <span className="pi pi-arrow-left"></span> Back</Link>
                                            &nbsp;
                                            <Button type="submit" label="Submit" severity="success" rounded icon="pi pi-check" loading={buttonLoading} /> 
                                            
                                        </div>
                                    </form>
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

