import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
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
        <form id='login-form' method='post'>
          <input type='email' placeholder='Email...'></input>
          <input type='password' placeholder='Password...'></input>
          <button className='login-btn' type='submit'>
            Login
          </button>
        </form>
        <div className='sign-in-options'>
          <p>Or sign in with</p>
          <div className='auth-providers'>
            <div className='auth-btn'>
              <img src='/google.svg' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
