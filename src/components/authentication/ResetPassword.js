import React, { useCallback, useEffect, useRef, useState, useContext } from 'react' 
import {siteName} from '../../utils/config'
import { Link } from 'react-router-dom';
import TextBox from '../layout2/formInput/TextBox';
import PasswordBox from '../layout2/formInput/PasswordBox';
import { ColumnGroup } from 'primereact/columngroup';
import { LoginContext } from '../../context/LoginContext';
import { useDispatch, useSelector } from 'react-redux'; 
import { Toast } from 'primereact/toast';
import {login,reset,resetPassword} from '../../store/login/action'
import { useNavigate } from 'react-router-dom';
import { resetResetPasswordState } from '../../store/login/slice';
import { useParams } from "react-router-dom";


const ResetPassword = () => {
    const navigate = useNavigate();

    const dispatch                  = useDispatch();
    const toast                     = useRef(null); 
    const [validationErr, setValidationErr]    = useState({ serverErrors: null, formErrors: false })
    const [formData, setFormData]              = useState({password: "", cpassword: "", errors: null });  
    const {password, cpassword, errors }                     = formData;  
    const { status,message,isLoading} = useSelector((state) => state.login); 

    const [isResetMailSent, setIsResetMailSent] = useState(false);
    const { token } = useParams();


    // On change update value
    const handleChange = useCallback((name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = !password || !cpassword || password !== cpassword;
        if (error) {
            if (!password || !cpassword) {
                setValidationErr((prevState) => ({ ...prevState, formErrors: true }));
            } else if (password !== cpassword) {
                setValidationErr((prevState) => ({ ...prevState, serverErrors: { cpassword: "Passwords do not match" }, formErrors: true }));
            }
        }
        else {
            const payload = { ...formData, token: token }
            await dispatch(resetPassword(payload))
        }
    };

    useEffect(() => {
        if (status === null) return;

        if (status) {
            console.log("Success:", message);
            setIsResetMailSent(true)
            dispatch(resetResetPasswordState())

        } else {
            console.log("Failed:", message);
            setValidationErr((prevState) => ({ ...prevState, serverErrors: { cpassword: message}, formErrors:true}));
            setIsResetMailSent(false)
            dispatch(resetResetPasswordState())
            
        }
    }, [status, message]);
   
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
                                {isResetMailSent ? (
                                    <div className="creative-card-body card-body p-sm-5">
                                        <h2 className="fs-20 fw-bolder mb-4">Reset Password Successful</h2>
                                        <h4 className="fs-13 fw-bold mb-2"> 
                                            <Link to="/login" className="fs-11 text-primary">Click here</Link> to login
                                        </h4>
                                    </div>
                                ) : (
                                    <div className="creative-card-body card-body p-sm-5">
                                        <h2 className="fs-20 fw-bolder mb-4">Reset Password</h2>
                                        <h4 className="fs-13 fw-bold mb-2">Reset to your new password</h4>
                                        <p className="fs-12 fw-medium text-muted">
                                            Enter your password & confirm password to reset your password.</p>
                                        <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
                                            <div className="mb-4">
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
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <PasswordBox 
                                                    labelValue=''
                                                    idValue='confirmPassword'
                                                    classValue='confirmPassword'
                                                    nameValue='cpassword'
                                                    isRequired={true}
                                                    errorsValue={validationErr}
                                                    formDataValue={formData}
                                                    onChangeValue={handleChange}
                                                    placeholderValue='Confirm Password'
                                                />
                                            </div>
                                            <h4 className="fs-13 fw-bold mb-2"> 
                                                <Link to="/login" className="fs-11 text-primary">Click here</Link> to login
                                            </h4>
                                            <div className="mt-5">
                                                <button type="submit" className="btn btn-lg btn-primary w-100" disabled={isLoading}>
                                                    {isLoading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                                            Loading...
                                                        </>
                                                    ) : (
                                                        "Submit"
                                                    )}
                                                </button>
                                            </div>
                                            
                                        </form>                                
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

export default ResetPassword