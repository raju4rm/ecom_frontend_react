import React, { useCallback, useEffect, useRef, useState, useContext } from 'react' 
import {siteName} from '../../utils/config'
import { Link } from 'react-router-dom';
import TextBox from '../layout2/formInput/TextBox';
import NumberBox from '../layout2/formInput/NumberBox';
import PasswordBox from '../layout2/formInput/PasswordBox';
import { ColumnGroup } from 'primereact/columngroup';
import { useDispatch, useSelector } from 'react-redux'; 
import {setAdd} from '../../store/signin/action'
import { clearState } from '../../store/signin/slice';
import { useNavigate } from 'react-router-dom';
import { Text } from '@mantine/core';

const Signup = () => {
    const navigate = useNavigate();
    
    const dispatch                  = useDispatch();
    const toast                     = useRef(null); 

    const [validationErr, setValidationErr]    = useState({ serverErrors: null, formErrors: false, otherErrors: null })
    const [formData, setFormData]   = useState({name:"", username:"", email: "",password: "",phone_no: "", errors: null });  
    const {name, username, email, password, phone_no }   = formData;  
    const { loading, summary, severity, message, errors ,success} = useSelector((state) => state.signin); 
    const [isSuccess, setIsSuccess] = useState(false);

    // On change update value
    const handleChange = useCallback((name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isPasswordValid =
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /\d/.test(password) &&
            /[@$!%*?&]/.test(password);

        const error = !email || !name || !username || !password || !phone_no || !isPasswordValid;
        if (error) {
            const otherError={
                password: "Password does not meet the criteria"
            };
            setValidationErr((prevState) => ({ ...prevState, formErrors: true, otherErrors: otherError }));
        }
        else {
            await dispatch(setAdd(formData))
            // await dispatch(reset())
            setValidationErr((prevState) => ({ ...prevState, formErrors: false }));
        }
    };

    

    useEffect(() => {   
        if (errors) {
            console.log('error', errors);
            setValidationErr((prevState) => ({ ...prevState, serverErrors: errors }));
        }
        if (success) {
            setIsSuccess(true);
            dispatch(clearState())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ success, errors]);


    const rules = [
        { label: "Includes at least 8 characters", test: (v) => v.length >= 8 },
        { label: "Includes uppercase letter", test: (v) => /[A-Z]/.test(v) },
        { label: "Includes lowercase letter", test: (v) => /[a-z]/.test(v) },
        { label: "Includes number", test: (v) => /\d/.test(v) },
        { label: "Includes special symbol", test: (v) => /[@$!%*?&]/.test(v) },
    ];

    
    return (
    <>
        <main className="auth-creative-wrapper">
            <div className="auth-creative-inner">
                <div className="creative-card-wrapper">
                    <div className="card my-4 overflow-hidden" style={{zIndex: 1}}>
                        <div className="row flex-1 g-0">
                            <div className="col-lg-6 h-100 my-auto order-1 order-lg-0">
                                <div className="wd-50 bg-white p-2 rounded-circle shadow-lg position-absolute translate-middle top-50 start-50 d-none d-lg-block">
                                    <img src="assets/images/logo-abbr.png" alt="" className="img-fluid"></img>
                                </div>
                                {isSuccess ?(
                                    <div className="creative-card-body card-body p-sm-5">
                                        <h2 className="fs-20 fw-bolder mb-4">Account Created Successful</h2>
                                        <h4 className="fs-13 fw-bold mb-2"> 
                                            <Link to="/login" className="fs-11 text-primary">Click here</Link> to login
                                        </h4>
                                    </div>
                                ):(
                                    <div className="creative-card-body card-body p-sm-5">
                                        <h2 className="fs-20 fw-bolder mb-4">Signup</h2>
                                        <h4 className="fs-13 fw-bold mb-2">Create a new account</h4>
                                        <p className="fs-12 fw-medium text-muted">Fill in the form below to create a new account. All fields are required.</p>
                                        <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
                                            <div className="mb-4">
                                                <TextBox 
                                                    labelValue=''
                                                    idValue='name'
                                                    classValue='name'
                                                    nameValue='name'
                                                    isRequired={true}
                                                    errorsValue={validationErr}
                                                    formDataValue={formData}
                                                    onChangeValue={handleChange}
                                                    placeholderValue='Full Name'
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <TextBox 
                                                    labelValue=''
                                                    idValue='email'
                                                    classValue='email'
                                                    nameValue='email'
                                                    isRequired={true}
                                                    errorsValue={validationErr}
                                                    formDataValue={formData}
                                                    onChangeValue={handleChange}
                                                    placeholderValue='Email'
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <TextBox 
                                                    labelValue=''
                                                    idValue='username'
                                                    classValue='username'
                                                    nameValue='username'
                                                    isRequired={true}
                                                    errorsValue={validationErr}
                                                    formDataValue={formData}
                                                    onChangeValue={handleChange}
                                                    placeholderValue='Username'
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <NumberBox 
                                                    labelValue=''
                                                    idValue='phone_no'
                                                    classValue='phone_no'
                                                    nameValue='phone_no'
                                                    isRequired={true}
                                                    errorsValue={validationErr}
                                                    formDataValue={formData}
                                                    onChangeValue={handleChange}
                                                    placeholderValue='Phone No'
                                                    minValue={0}
                                                    maxValue={9999999999}
                                                    hideControlsValue={true}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <PasswordBox 
                                                    labelValue=''
                                                    idValue='password'
                                                    classValue='password'
                                                    nameValue='password'
                                                    isRequired={true}
                                                    errorsValue={validationErr}
                                                    formDataValue={formData}
                                                    onChangeValue={handleChange}
                                                    placeholderValue='Password'
                                                    otherErrorsValue={validationErr.otherErrors}
                                                />
                                            </div>
                                            {password && (
                                                <div style={{ marginTop: 10 }}>
                                                    {rules.map((rule, index) => (
                                                    <Text
                                                        key={index}
                                                        size="sm"
                                                        color={rule.test(password) ? "green" : "red"}
                                                    >
                                                        {rule.test(password) ? "✓" : "✗"} {rule.label}
                                                    </Text>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            <div className="mt-5">
                                                <button type="submit" className="btn btn-lg btn-primary w-100" disabled={loading}>
                                                    {loading ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                                Loading...
                                                            </>
                                                        ) : (
                                                            "Signup"
                                                        )}
                                                </button>
                                            </div>
                                        </form>
                                        <div className="w-100 mt-5 text-center mx-auto">
                                            <div className="mb-4 border-bottom position-relative"><span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">or</span></div>
                                            <div className="d-flex align-items-center justify-content-center gap-2">
                                                <a href="" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Login with Facebook">
                                                    <i className="feather-facebook"></i>
                                                </a>
                                                <a href="" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Login with Twitter">
                                                    <i className="feather-twitter"></i>
                                                </a>
                                                <a href="" className="btn btn-light-brand flex-fill" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Login with Github">
                                                    <i className="feather-github text"></i>
                                                </a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-6 bg-primary order-0 order-lg-1">
                                <div className="h-100 d-flex align-items-center justify-content-center">
                                    <img src="assets/images/auth/auth-user.png" alt="" className="img-fluid"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default Signup