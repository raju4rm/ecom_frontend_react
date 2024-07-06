import React,{ useCallback, useEffect, useState }  from 'react'
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nano/theme.css';
import 'primeicons/primeicons.css';


import { getList } from '../../store/role/action'
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumbComponent from '../BreadCrumbComponent';
import TextBoxFloating from '../TextBoxFloating';
import { setAdd } from '../../store/role/action';
import { getPermission, assignPermissionAction } from '../../store/backend/permission/action';
import { useNavigate, Link, useParams } from 'react-router-dom';


export default function Permission(props){
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const module = 'Assign Permission';
    const [validationErrors, setValidationErrors]   = useState({ serverErrors: null, formErrors: false })
    const [formData, setFormData]                   = useState({name:""}); 
    const {name}                                    = formData;
    const states                                    = useSelector((state) => state.role); 
    const permissionStates                          = useSelector((state) => state.permission); 
    const {loading,errors,success}                  = states 
    const {items}                                   = permissionStates
    const [allPermission, setAllPermission]         = useState(null);
    const [selectedPermission, setSelectedPermission]               = useState([]);


    // On change update value
    const handleChange = (e) => {
        let value =e.target.value;
        if (e.checked){
            setSelectedPermission((prevArray) => [...prevArray,value])
        }else{
            setSelectedPermission((prevArray) => prevArray.filter((arrayItem) => arrayItem !== value))
        }
    };

    //Call get api
    const handleSubmit = async (e) => { 
        e.preventDefault();
        const error =   !name;
        if (error) {
            setValidationErrors((prevState) => ({ ...prevState, formErrors: true }));
        } else {
            await dispatch(assignPermissionAction(formData))
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
            label: 'Assign Permission',
        },
    ]
    
    /* end breadCrumb value */

    //get all permission
    useEffect(() => {  
        if(id){ 
            dispatch(getPermission(id));
            //console.log(permissionStates.items); 
        }  
    }, []); 
    
    // permission list toggle start
    useEffect(() => { 
        if(items) { 
           setAllPermission(items)
        }  
        if(errors) { setFormData((prevState) => ({ ...prevState, seterror:errors }));  }  
    }, [errors,success,items]);

    const [collapseState, setCollapseState] = useState({});

    // Toggle the collapse state for a specific section
    const togglePermission = (moduleKey) => {
        setCollapseState(prevState => ({
            ...prevState,
            [moduleKey]: !prevState[moduleKey]
        }));
    }

    useEffect(() => {
        const initialCollapseState = {};
        Object.keys(items).forEach((module, moduleKey) => {
            initialCollapseState[moduleKey] = true; 
        });
        setCollapseState(initialCollapseState);
    }, [items]);
    // permission list toggle end
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
                                    >   {allPermission && (
                                            <>
                                                {Object.keys(allPermission).map((module,moduleKey) => (
                                                    <section className={`content ${moduleKey==0?'mt-2':''}`}>
                                                        <div className={`card card-default custom-card-default ${collapseState[moduleKey] ?'collapsed-card':''}`}>
                                                            <div className="card-header">
                                                                <p className='card-title'>
                                                                    <strong>
                                                                        <u>Module </u>: {module}
                                                                    </strong>
                                                                </p>
                                                                <div className="card-tools">
                                                                    <Button text icon={` ${collapseState[moduleKey] ? 'pi pi-plus' : 'pi pi-minus' }`} onClick={() => togglePermission(moduleKey)} /> 
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    {allPermission[module].map((item,index) => (
                                                                        <div className="form-group col-md-3">
                                                                            {Object.entries(item).map(([key, value], subIndex) => (
                                                                                <div  className="flex align-items-center">


                                                                                <Checkbox inputId={key} name="permission" value={key} onChange={(e) => handleChange(e,key)} checked={selectedPermission.includes(key)} />

                                                                                
                                                                                <label htmlFor={key} className="ml-2" style={{marginBottom:'-1px'}}>{value}</label>

                                                                                
                                                                                </div>

                                                                                
                                                                        ))}

                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                ))}
                                            </>
                                        )}
                                        
                                    
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

