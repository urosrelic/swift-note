import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserAuthCredentials } from '../../utils/types/UserAuthCredentials';
import './Login.css';

const Login = () => {
  const {
    currentUser,
    handleGoogleSignIn,
    handleEmailAndPasswordSignIn,
    handleCreateUser,
    error,
  } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserAuthCredentials>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    handleEmailAndPasswordSignIn(formData);
  };

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    handleCreateUser(formData);
  };

  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className='login-page'>
      <div className='login-title'>SwiftNote</div>
      <Link to='/' className='login-go-back-btn'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='24'
          viewBox='0 -960 960 960'
          width='24'
          fill='#d3e3fd'
        >
          <path d='m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z' />
        </svg>
        <span>Back</span>
      </Link>
      <div className='form-container'>
        {showLogin ? (
          <form
            className='auth-form'
            method='post'
            onSubmit={handleLoginSubmit}
          >
            <input
              type='email'
              name='email'
              value={formData.email}
              placeholder='Email...'
              onChange={handleInputChange}
            ></input>
            <input
              type='password'
              name='password'
              value={formData.password}
              placeholder='Password...'
              onChange={handleInputChange}
            ></input>
            <button className='auth-btn' type='submit'>
              Login
            </button>
            <p>
              Don't have an account?{' '}
              <span onClick={() => setShowLogin(false)}>Register here</span>
            </p>
          </form>
        ) : (
          <form
            className='auth-form'
            method='post'
            onSubmit={handleRegisterSubmit}
          >
            <input
              type='email'
              name='email'
              value={formData.email}
              placeholder='Email...'
              onChange={handleInputChange}
            ></input>
            <input
              type='password'
              name='password'
              value={formData.password}
              placeholder='Password...'
              onChange={handleInputChange}
            ></input>
            <button className='auth-btn' type='submit'>
              Register
            </button>
            <p>
              Already have an account?{' '}
              <span onClick={() => setShowLogin(true)}>Login here</span>
            </p>
          </form>
        )}
        {error && <div className='error-box'>{error}</div>}
        <div className='sign-in-options'>
          <p>Or sign in with</p>
          <div className='auth-providers'>
            <div className='auth-provider-btn' onClick={handleGoogleSignIn}>
              <img src='/google.svg' alt='Google Sign In' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
