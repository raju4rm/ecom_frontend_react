import React, { useCallback, useEffect, useRef, useState, useContext } from 'react' 
import {siteName} from '../../utils/config'
import { Link } from 'react-router-dom';
import TextBox from '../layout2/formInput/TextBox';
import PasswordBox from '../layout2/formInput/PasswordBox';
import { ColumnGroup } from 'primereact/columngroup';
import { LoginContext } from '../../context/LoginContext';
import { useDispatch, useSelector } from 'react-redux'; 
import { Toast } from 'primereact/toast';
import {login,reset} from '../../store/login/action'
import { resetState } from '../../store/login/slice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // const {loading, errors, success, setLogin} = useContext(LoginContext);
    const navigate = useNavigate();

    const dispatch                  = useDispatch();
    const toast                     = useRef(null); 
    const [validationErr, setValidationErr]    = useState({ serverErrors: null, formErrors: false })
    const [formData, setFormData]                   = useState({email: "",password: "", errors: null });  
    const {email, password, errors }             = formData;  
    const { isLoading, isAuthenticated, summary, severity, message, error,setError ,success,accessToken} = useSelector((state) => state.login); 

    // On change update value
    const handleChange = useCallback((name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = !email || !password;
        if (error) {
            setValidationErr((prevState) => ({ ...prevState, formErrors: true }));
        }
        else {
            await dispatch(login(formData))
            // await dispatch(reset())
            setValidationErr((prevState) => ({ ...prevState, formErrors: false }));

        }
    };

    

    useEffect(() => {  

        if (isAuthenticated) {
            const searchParams      = new URLSearchParams(window.location.search);
            const redirect          = searchParams.get('redirect');
            const redirectUrl       = redirect || '/home1';
            const decodedRedirectUrl= decodeURIComponent(redirectUrl);
            setValidationErr(null)            
            dispatch(resetState());

            navigate(decodedRedirectUrl)
        } 
        if (error) {
            // setValidationErr(error)
            setValidationErr((prevState) => ({ ...prevState, serverErrors: error }));

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isAuthenticated, error]);
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
                                <div className="creative-card-body card-body p-sm-5">
                                    <h2 className="fs-20 fw-bolder mb-4">Login</h2>
                                    <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
                                    <p className="fs-12 fw-medium text-muted">Thank you for get back <strong>Nelel</strong> web applications, let's access our the best recommendation for you.</p>
                                    <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
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
                                                placeholderValue='Email or Username'
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
                                            />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="rememberMe"></input>
                                                    <label className="custom-control-label c-pointer" >Remember Me</label>
                                                </div>
                                            </div>
                                            <div>
                                                <Link to="/forgot-password" className="fs-11 text-primary">Forget password?</Link>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <button type="submit" className="btn btn-lg btn-primary w-100" disabled={isLoading}>
                                                {isLoading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                                            Loading...
                                                        </>
                                                    ) : (
                                                        "Login"
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
                                    <div className="mt-5 text-muted">
                                        <span> Don't have an account?</span>
                                        <Link to="/signup" className="fw-bold">Create an Account</Link>
                                    </div>
                                </div>
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

export default Login