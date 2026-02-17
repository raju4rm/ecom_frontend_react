import React,{ useCallback, useEffect, useState, useRef }  from 'react'

import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbComponent from '../layout2/BreadCrumbComponent';
import TextBox from '../layout2/formInput/TextBox';
import SelectBox from '../layout2/formInput/SelectBox';
import { setAdd } from '../../store/testLayout2/action';
import { useNavigate, Link } from 'react-router-dom';

export default function Add(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const module = 'Test'; 
    const states = useSelector((state) => state.testLayout2);  
    const {loading,errors,success} = states
    const [validationErrors, setValidationErrors]   = useState({ serverErrors: null, formErrors: false })
    const [formData, setFormData] = useState({
            input_box: '',
            select_box: ''
        });
    const {input_box, select_box} = formData;
    // console.log('1st '+test);
    const [test, setTest] = useState(true);
    const refcount = useRef(true);

    console.log('2nd '+test);

    function toggleTest(){
        setTest(!test);
        refcount.current = !refcount.current;
        console.log('inside'+test,refcount);
    }
    console.log('3rd '+test);
    useEffect(() => {
        console.log('4th '+test);
    }, [test]);
    console.log('5th '+test);
    
    


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


    // On change update value
    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    

    const options = [
        { value: '', label: 'Select Status' },
        { value: 'y', label: 'Active' },
        { value: 'n', label: 'In-Active' },
    ];


    //Call get api
    const handleSubmit = async (e) => { 
        e.preventDefault();
        const error =   !input_box || !select_box;
        if (error) {
            setValidationErrors((prevState) => ({ ...prevState, formErrors: true }));
            // console.log(1);
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
        }
    }, [errors,success]);
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
                                <a href=";" className="btn btn-light-brand" data-bs-toggle="offcanvas" data-bs-target="#proposalSent" style={{display: test ? 'block' : 'none'}}>
                                    <i className="feather-layers me-2"></i>
                                    <span>Save & Send</span>
                                </a>
                                <a onClick={toggleTest} className="btn btn-primary successAlertMessage">
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
                                <form 
                                    noValidate="novalidate"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="card-body">
                                        <div className="mb-4">
                                            <TextBox 
                                                labelValue='Test Input Box'
                                                idValue='input_box_id'
                                                classValue='input_box_class'
                                                nameValue='input_box' 
                                                isRequired={true}
                                                errorsValue={validationErrors}
                                                formDataValue={formData}
                                                onChangeValue={handleChange}
                                                placeholderValue='Test Input Box Placeholder'
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <SelectBox
                                                labelValue='Test Select Box'
                                                optionsValue={options}
                                                idValue="test_select_id"
                                                classValue="test_select_class"
                                                nameValue="select_box"
                                                isRequired={true}
                                                defaultOptionValue="a"
                                                placeholderValue="Test Select Box Placeholder"
                                                isSearchable={true}
                                                isDisabled={false}
                                                formDataValue={formData}
                                                errorsValue={validationErrors}
                                                onChangeValue={handleChange}
                                                resetValue={false}
                                            />
                                        </div>
                                        <div class="d-flex justify-content-end gap-2 mt-3">
                                            <button id="back" class="btn btn-md bg-soft-danger text-danger">Back</button>
                                            <button id="save" class="btn btn-md btn-primary" >Save</button>
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

