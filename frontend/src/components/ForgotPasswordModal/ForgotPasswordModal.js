import React, { useState } from 'react';
import './ForgotPasswordModal.css';
import mail from '../../images/MailIcon.svg';
import toast from 'react-hot-toast';
import {
  requestPasswordReset,
  confirmPasswordReset,
} from '../../services/Auth.js';

function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [isResetCodeSent, setIsResetCodeSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isResetCodeSent) {
      try {
        await requestPasswordReset(email);
        toast.success('Password reset email sent!');
        setIsResetCodeSent(true);
      } catch (error) {
        toast.error('Failed to send password reset email');
      }
    } else {
      try {
        await confirmPasswordReset(token, new_password);
        toast.success('Password has been reset successfully!');
        onClose();
      } catch (error) {
        toast.error('Failed to reset password');
      }
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          {!isResetCodeSent ? (
            <>
              <div className="inputContainerModal">
                <img src={mail} alt="mailIcon" className="mailIcon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="sendButton">
                Send Reset Code
              </button>
            </>
          ) : (
            <>
              <div className="inputContainerModal">
                <input
                  type="text"
                  placeholder="Enter reset code"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                />
              </div>
              <div className="inputContainerModal">
                <input
                  type="password"
                  placeholder="New Password"
                  value={new_password}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="sendButton">
                Reset Password
              </button>
            </>
          )}
        </form>
        <button onClick={onClose} className="closeButton">
          Close
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
