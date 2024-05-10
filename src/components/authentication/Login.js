import React, { useCallback, useEffect, useRef, useState  } from 'react' 
import {siteName} from '../../utils/config'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { Toast } from 'primereact/toast';
import {login,reset} from '../../store/login/action'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    document.body.classList.add('login-page');
    document.body.classList.add('hold-transition');
    document.body.style.backgroundImage = `url('login-bg.jpg')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    document.title = 'Login';
    
    const navigate = useNavigate();

    const dispatch                  = useDispatch();
    const toast                     = useRef(null); 
    const [validationErr, setValidationErr]    = useState({ serverErrors: null, formErrors: false })
    const [formData, setFormData]                   = useState({email: "",password: "", errors: null });  
    const {email, password, errors }             = formData;  
    const { isLoading, isAuthenticated, summary, severity, message, seterrors,setError ,success} = useSelector((state) => state.login); 

    // On change update value
    const handleChange = useCallback(({ target: { name, value } }) => {
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = !email || !password;
        if (error) {
            setFormData((prevState) => ({ ...prevState, errors: error }));
        }
        else {
            await dispatch(login(formData))
            await dispatch(reset())
        }
    };

    useEffect(()=>{
        if(success) { toast.current.show({ severity: severity, summary: summary, detail: message, life: 3000 });}
        if(setError) { toast.current.show({ severity: severity, summary: summary, detail: message, life: 3000 });    
            dispatch(reset());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[success,setError])

    useEffect(() => {  
        if (isAuthenticated) {
            const searchParams      = new URLSearchParams(window.location.search);
            const redirect          = searchParams.get('redirect');
            const redirectUrl       = redirect || '/home1';
            const decodedRedirectUrl= decodeURIComponent(redirectUrl);
            setValidationErr(null)
            navigate(decodedRedirectUrl)
            dispatch(reset());
        } 
        if (seterrors) {
            setValidationErr(seterrors)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isAuthenticated, seterrors]);
    return (
    <>
        <div className="login-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                <a href="../../index2.html" className="h1">
                    <b>{siteName}</b>
                </a>
                </div>
                <div className="card-body">
                <p className="login-box-msg">Sign in to start your session</p>
                <Toast ref={toast} />
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            name="email"
                            value={email}
                            required
                            onChange={handleChange}
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                            <span className="fas fa-envelope" />
                            </div>
                        </div>
                        {(validationErr && validationErr.email) ? (
                            <span  class="error invalid-feedback" style={{ display: 'block' }}>{validationErr.email}</span>
                            ):''
                        }
                        {!email && errors && (
                            <span  class="error invalid-feedback" style={{ display: 'block' }}>Email is required.</span>
                            )                     
                        }
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            value={password}
                            required
                            onChange={handleChange}
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                            <span className="fas fa-lock" />
                            </div>
                        </div>
                        {(validationErr && validationErr.password) ? (
                            <span  class="error invalid-feedback" style={{ display: 'block' }}>{validationErr.password}</span>
                            ):''
                        }
                        { 
                            !password && errors && (
                                <span  class="error invalid-feedback" style={{ display: 'block' }}>Password is required.</span>
                            )
                        }
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <div className="icheck-primary">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember Me</label>
                            </div>
                        </div>
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary btn-block">
                            {
                                isLoading?<span>Please wait...
                                <span className="spinner-border spinner-border-sm align-middle ms-2" /></span>:
                                <span className="indicator-label">Sign In</span>
                            }
                            </button>
                        </div>
                    </div>
                </form>
                <div className="social-auth-links text-center mt-2 mb-3">
                    <Link className="btn btn-block btn-primary">
                    <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                    </Link>
                    <Link className="btn btn-block btn-danger">
                    <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                    </Link>
                </div>
                <p className="mb-1">
                    <Link to="/forgot-password">I forgot my password</Link>
                </p>
                
                </div>
            </div>
        </div>

    </>
  )
}

export default Login