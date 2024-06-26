import './App.css';
import mail from './images/MailIcon.svg';
import lockIcon from './images/LockIcon.svg';
import viewIcon from './images/ViewIcon.svg';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import toast, { Toaster } from 'react-hot-toast';
import RightPartLogin from './components/RightPartLogin/RightPartLogin';
import ForgotPasswordModal from './components/ForgotPasswordModal/ForgotPasswordModal';
import { login, signUp } from './services/Auth';

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [authData, setAuthData] = useState({ email: '', password: '' });
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  console.log(authData);
  function togleShowPassword() {
    setShowPassword(!showPassword);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleToggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  const handleAction = async () => {
    if (isRegisterMode) {
      try {
        setIsRegistering(true);
        const response = await signUp(authData.email, authData.password);
        toast.success(`Registration successful! ${response.toast}`);
        setIsRegistering(false);
      } catch (error) {
        toast.error('Registration failed. Please try again.');
        setIsRegistering(false);
      }
    } else {
      try {
        setIsRegistering(true);
        await login(authData.email, authData.password);
        toast.success('Login successful!');
        setIsRegistering(false);
      } catch (error) {
        toast.error('Registration failed. Please try again.');
        setIsRegistering(false);
      }
    }
  };

  return (
    <div className="App">
      <form
        onSubmit={console.log('submitForm')}
        className="LoginRegisterSection">
        <div className="leftPart">
          <RightPartLogin />
        </div>
        <div className="rightPart">
          <div>
            <h1 className="titleSection">
              {isRegisterMode ? 'Sign up' : 'Log in'}
            </h1>
          </div>
          <div className="inputContainer">
            <div className="inputEmail">
              <img src={mail} alt="mailIcon" className="mailIcon" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={authData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="inputPassword">
              <div className="leftPasswordPart">
                <img src={lockIcon} alt="lockIcon" className="mailIcon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  value={authData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="rightPasswordPart">
                <img
                  src={viewIcon}
                  onClick={() => togleShowPassword()}
                  alt="viewIcon"
                  className="mailIcon"
                />
              </div>
            </div>
            <div className="forgotPassword">
              <p
                className="forgotPasswordText"
                onClick={() => setIsForgotPasswordOpen(true)}>
                Forgot password?
              </p>
            </div>
          </div>
          <div className="buttonSection">
            <button
              type="button"
              className="logInButton"
              onClick={handleAction}>
              {isRegisterMode ? 'Register' : 'Log in'}
            </button>
            <Toaster />
            <div className="separator">
              <hr className="line" />
              <span className="text">Or</span>
              <hr className="line" />
            </div>
            <div className="loginGoogle_Facebook">
              {/* <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              /> */}
            </div>
            <div className="registerSection">
              <p className="haveAcount">
                {isRegisterMode
                  ? 'Already have an account?'
                  : 'Have no account yet?'}
              </p>
              <button
                className="registerButton"
                onClick={() => handleToggleMode()}
                disabled={isRegistering}>
                {isRegisterMode ? 'Login' : 'Register'}
              </button>
            </div>
          </div>
        </div>
      </form>
      {isForgotPasswordOpen && (
        <ForgotPasswordModal onClose={() => setIsForgotPasswordOpen(false)} />
      )}
    </div>
  );
}

export default App;
