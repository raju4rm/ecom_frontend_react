import React,{ useCallback, useEffect, useState }  from 'react'
import { Button } from 'primereact/button';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nano/theme.css';
import 'primeicons/primeicons.css';

import { getList } from '../../store/role/action'
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbComponent from '../BreadCrumbComponent';
import TextBoxFloating from '../TextBoxFloating';
import { setAdd } from '../../store/role/action';
import { useNavigate, Link } from 'react-router-dom';


export default function Permission(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const module = 'Add Permission';
    const [validationErrors, setValidationErrors]   = useState({ serverErrors: null, formErrors: false })
    const [formData, setFormData]                   = useState({name:""}); 
    const {name} = formData;
    const states                                    = useSelector((state) => state.role); 
    const {loading,errors,success} = states 

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
        const error =   !name;
        if (error) {
            setValidationErrors((prevState) => ({ ...prevState, formErrors: true }));
        } else {
            await dispatch(setAdd(formData))
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
            label: 'Role',
            template:[
                {
                    link: '/role',
                    linkLabel: 'Role'
                }
            ]
        },
        {
            label: 'Permission',
        },
        {
            label: 'Add Permission',
        },
    ]
    
    /* end breadCrumb value */

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

