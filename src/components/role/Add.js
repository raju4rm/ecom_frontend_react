import React,{ useCallback, useEffect, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { notifications } from '@mantine/notifications';     
import '@mantine/notifications/styles.css';
import { useNavigate, Link } from 'react-router-dom';


import BreadCrumbComponent from '../layout2/BreadCrumbComponent';
import TextBox from '../layout2/formInput/TextBox';
import SelectBox from '../layout2/formInput/SelectBox';
import { setAdd } from '../../store/role/action';
import { clearState } from '../../store/role/slice';



export default function Add(){
    const module = 'Add Role';
    /* start breadCrumb value */
    const BreadCrumbValue = [
        {
            label: 'Role',
        },
        {
            label: 'Add Role',
        },
    ]
    /* end breadCrumb value */
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [validationErrors, setValidationErrors]   = useState({ serverErrors: null, formErrors: false })
    const [formData, setFormData]                   = useState({name:"",is_active:""}); 
    const {name, is_active} = formData;
    const states                                    = useSelector((state) => state.role); 
    const {loading,errors,success} = states 

    // On change update value
    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    //Call get api
    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (!name || !is_active) {
            setValidationErrors((prevState) => ({ ...prevState, formErrors: true }));
        } else {
            await dispatch(setAdd(formData))
            setValidationErrors((prevState) => ({ ...prevState, formErrors: false }));
        } 
    };

    //Set server errors
    useEffect(() => {  
        setValidationErrors((prevState) => ({ ...prevState, serverErrors: errors }));
        if(success){ 
            setValidationErrors({ serverErrors: null, formErrors: false })
            const decodedRedirectUrl= decodeURIComponent('/role');
            navigate(decodedRedirectUrl)
            dispatch(clearState())
        }
    }, [errors,success]);  
    

    const options = [
        { value: '', label: 'Select Status' },
        { value: 'y', label: 'Active' },
        { value: 'n', label: 'In-Active' },
    ];
    return ( 
        <>
           {/* <main className="nxl-container"> */}
            <div className="nxl-content">
                <div className="page-header">
                    <BreadCrumbComponent BreadCrumbValue={BreadCrumbValue} module={module} />
                    
                </div>
                <div className="main-content">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="card stretch stretch-full">
                                <form 
                                    noValidate="novalidate"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="card-body">
                                        <div className="mb-4">
                                            <TextBox 
                                                labelValue='Role Name'
                                                idValue='name'
                                                classValue='name'
                                                nameValue='name' 
                                                isRequired={true}
                                                errorsValue={validationErrors}
                                                formDataValue={formData}
                                                onChangeValue={handleChange}
                                                placeholderValue='Role Name'
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <SelectBox
                                                labelValue='Status'
                                                optionsValue={options}
                                                idValue="is_active"
                                                classValue="is_active"
                                                nameValue="is_active"
                                                isRequired={true}
                                                defaultOptionValue="a"
                                                placeholderValue="Status"
                                                isSearchable={true}
                                                isDisabled={false}
                                                formDataValue={formData}
                                                errorsValue={validationErrors}
                                                onChangeValue={handleChange}
                                                resetValue={false}
                                            />
                                        </div>
                                        <div class="d-flex justify-content-end gap-2 mt-3">
                                            <Link to="/role" id="back" class="btn btn-md bg-soft-danger text-danger" ><i className="feather-arrow-left me-2"></i> Back</Link>
                                            <button id="save" class="btn btn-md btn-primary" disabled={loading}>
                                                {loading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                                            Loading...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="feather-save me-2"></i> Save
                                                        </>
                                                    )
                                                }                                                
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

