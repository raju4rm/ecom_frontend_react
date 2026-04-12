import React,{ useCallback, useEffect, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '@mantine/notifications/styles.css';
import { useNavigate, Link } from 'react-router-dom';
import { FileInput } from '@mantine/core';

import BreadCrumbComponent from '../../layout2/BreadCrumbComponent';
import TextBox from '../../layout2/formInput/TextBox';
import SelectBox from '../../layout2/formInput/SelectBox';
import { setAdd } from '../../../store/category/action';
import FileInputBox from '../../layout2/formInput/FileInputBox'
import axios from '../../../utils/axios';

export default function Add(){
    const module = 'Add Category';
    /* start breadCrumb value */
    const BreadCrumbValue = [
        {
            label: 'Master',
        },
        {
            label: 'Category',
        },
        {
            label: 'Add',
        },
    ]
    /* end breadCrumb value */
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [validationErrors, setValidationErrors]   = useState({ serverErrors: null, formErrors: false })
    const [formData, setFormData]                   = useState({name:"",parent_id:"",icon: null,image: null,sort_order:""}); 
    const {name, parent_id, icon, image, sort_order} = formData;
    const states                                    = useSelector((state) => state.category); 
    const {loading,errors,success,error,errorCode} = states 
    const [parentOption,setParentOption] = useState([{ value: '', label: 'Select Parent Category' }])

    // On change update value
    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    
    // handle file separately
    const handleFileChange = (name, file) => {
        setFormData(prev => ({
            ...prev,
            [name]: file
        }));
    };

    //Call get api
    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (!name || !sort_order || !icon ) {
            setValidationErrors((prevState) => ({ ...prevState, formErrors: true }));
        } else {
            const data = new FormData();
            data.append("name", name);
            data.append("parent_id", parent_id);
            data.append("sort_order", sort_order);

            if (icon) {
                data.append("icon", icon);
            }

            if (image) {
                data.append("image", image);
            }


            // console.log(data,formData);
            await dispatch(setAdd(data)); //
            setValidationErrors((prevState) => ({ ...prevState, formErrors: false }));
        } 
    };

    //Set server errors
    useEffect(() => {  
        console.log(error,success);
        if(success){ 
            setValidationErrors({ serverErrors: null, formErrors: false })
            const decodedRedirectUrl= decodeURIComponent('/master/category');
            navigate(decodedRedirectUrl)
            // dispatch(clearState())
        }
        if(error){ 
            setValidationErrors((prevState) => ({ ...prevState, serverErrors: errors }));
            const decodedRedirectUrl= decodeURIComponent('/master/category');
            if(errorCode!=422){
                navigate(decodedRedirectUrl)
            }
        }
    }, [error,success,errors]);  
    
    const getParentOption = async () => {
        try {
            const result = await axios.get('admin/master/category/all');
            console.log(result);
            const formatted = [
                { value: '', label: 'Select Parent Category' },
                ...result.data.data.map(item => ({
                    value: String(item.master_category_id),
                    label: item.name
                }))
            ];
            setParentOption(formatted);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getParentOption()
    },[])


    const options = parentOption;
    const sort_order_options = [
        { value: '', label: 'Select Sort Order' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
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
                                                labelValue='Category Name'
                                                idValue='name'
                                                classValue='name'
                                                nameValue='name' 
                                                isRequired={true}
                                                errorsValue={validationErrors}
                                                formDataValue={formData}
                                                onChangeValue={handleChange}
                                                placeholderValue='Category Name'
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <SelectBox
                                                labelValue='Parent Category'
                                                optionsValue={options}
                                                idValue="parent_id"
                                                classValue="parent_id"
                                                nameValue="parent_id"
                                                isRequired={false}
                                                placeholderValue="Status"
                                                isSearchable={true}
                                                isDisabled={false}
                                                formDataValue={formData}
                                                errorsValue={validationErrors}
                                                onChangeValue={handleChange}
                                                resetValue={false}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <FileInputBox
                                                labelValue='Icon'
                                                idValue="icon"
                                                classValue="icon"
                                                nameValue="icon"
                                                isRequired={true}
                                                placeholderValue="Icon"
                                                errorsValue={validationErrors}
                                                onChangeValue={handleFileChange}
                                                formDataValue={formData}
                                                allowedTypeValue={["image/jpeg", "image/png", "image/jpg"]}
                                                allowedSizeValue={2 * 1024 * 1024} 
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <FileInputBox
                                                labelValue='Image'
                                                idValue="image"
                                                classValue="image"
                                                nameValue="image"
                                                isRequired={false}
                                                placeholderValue="Image"
                                                errorsValue={validationErrors}
                                                onChangeValue={handleFileChange}
                                                formDataValue={formData}
                                                allowedTypeValue={["image/jpeg", "image/png", "image/jpg"]}
                                                allowedSizeValue={2 * 1024 * 1024} 
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <SelectBox
                                                labelValue='Sort Order'
                                                optionsValue={sort_order_options}
                                                idValue="sort_order"
                                                classValue="sort_order"
                                                nameValue="sort_order"
                                                isRequired={true}
                                                placeholderValue="Sort Order"
                                                isSearchable={true}
                                                isDisabled={false}
                                                formDataValue={formData}
                                                errorsValue={validationErrors}
                                                onChangeValue={handleChange}
                                                resetValue={false}
                                            />
                                        </div>
                                        
                                        <div className="d-flex justify-content-end gap-2 mt-3">
                                            <Link to="/master/category" id="back" className="btn btn-md bg-soft-danger text-danger" ><i className="feather-arrow-left me-2"></i> Back</Link>
                                            <button id="save" className="btn btn-md btn-primary" disabled={loading}>
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

