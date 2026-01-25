import React,{ useCallback, useEffect, useState }  from 'react'

import { getList } from '../../store/role/action'
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbComponent from '../layout2/BreadCrumbComponent';
import TextBox from '../layout2/formInput/TextBox';
import SelectBox from '../layout2/formInput/SelectBox';
import { setAdd } from '../../store/role/action';
import { useNavigate, Link } from 'react-router-dom';


export default function Add(){
    const module = 'Test';    
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

    const [formData, setFormData] = useState({
        input_box: '',
        select_box: ''
    });
    
    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const [validationErrors, setValidationErrors]   = useState({ serverErrors: null, formErrors: false })
    
    console.log(formData);

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
                    <div className="page-header-right ms-auto">
                        <div className="page-header-right-items">
                            <div className="d-flex d-md-none">
                                <a href="" className="page-header-right-close-toggle">
                                    <i className="feather-arrow-left me-2"></i>
                                    <span>Back</span>
                                </a>
                            </div>
                            <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
                                <a href=";" className="btn btn-light-brand" data-bs-toggle="offcanvas" data-bs-target="#proposalSent">
                                    <i className="feather-layers me-2"></i>
                                    <span>Save & Send</span>
                                </a>
                                <a href=";" className="btn btn-primary successAlertMessage">
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
                                <div className="card-body">
                                    <div className="mb-4">
                                        <TextBox 
                                            labelValue='Test Input Box'
                                            idValue='input_box_id'
                                            classValue='input_box_class'
                                            nameValue='input_box' 
                                            requiredValue={true}
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
                                            requiredValue={true}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

