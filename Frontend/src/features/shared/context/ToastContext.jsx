import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../../auth/auth.slice';
import '../components/Toast.css';

const ToastContext = createContext(null);

export function formatUserFriendlyToast(rawMessage, type = 'success') {
  if (!rawMessage || typeof rawMessage !== 'string') {
    return {
      title: type === 'success' ? 'Success' : 'Error',
      message: type === 'success' ? 'Action completed successfully.' : 'An error occurred. Please try again.'
    };
  }

  const lower = rawMessage.toLowerCase();

  // Success cases
  if (type === 'success') {
    if (lower.includes('login') || lower.includes('welcome')) {
      return {
        title: 'Welcome Back!',
        message: 'Login successful. Welcome to Cerebro War.'
      };
    }
    if (lower.includes('account created') || lower.includes('registered')) {
      return {
        title: 'Registration Successful!',
        message: 'Your account has been created. Please check your email to verify.'
      };
    }
    if (lower.includes('verification mail sent') || lower.includes('resend')) {
      return {
        title: 'Verification Sent!',
        message: 'A new verification link has been sent to your email.'
      };
    }
    if (lower.includes('password reset mail') || lower.includes('reset mail')) {
      return {
        title: 'Reset Link Transmitted!',
        message: 'Instructions to reset your password have been sent to your email.'
      };
    }
    if (lower.includes('password updated') || lower.includes('password reset successfully')) {
      return {
        title: 'Password Updated!',
        message: 'Your access code has been updated successfully. You can now log in.'
      };
    }
    return {
      title: 'Success',
      message: rawMessage
    };
  }

  // Error cases
  if (type === 'error') {
    if (lower.includes('unauthorized') || lower.includes('invalid credentials') || lower.includes('incorrect password')) {
      return {
        title: 'Invalid Credentials',
        message: 'The email/username or password you entered is incorrect. Please try again.'
      };
    }
    if (lower.includes('user is not found') || lower.includes('user not found') || lower.includes('not found')) {
      return {
        title: 'Account Not Found',
        message: 'No account exists with this email or username. Please check your spelling or register.'
      };
    }
    if (lower.includes('user is not verified') || lower.includes('not verified')) {
      return {
        title: 'Email Not Verified',
        message: 'Please verify your email address to unlock arena access.'
      };
    }
    if (lower.includes('passwords do not match')) {
      return {
        title: 'Password Mismatch',
        message: 'The entered passwords do not match. Please verify them.'
      };
    }
    if (lower.includes("cannot use '@' in username")) {
      return {
        title: 'Invalid Username',
        message: "Usernames cannot include the '@' symbol. Please choose another username."
      };
    }
    if (lower.includes('already exists') || lower.includes('duplicate')) {
      return {
        title: 'Account Exists',
        message: 'An account with this email or username is already registered. Please log in.'
      };
    }
    if (lower.includes('contact') && lower.includes('invalid')) {
      return {
        title: 'Invalid Phone Number',
        message: 'Please provide a valid phone number with your country dial code.'
      };
    }
    if (lower.includes('token') && (lower.includes('invalid') || lower.includes('expired') || lower.includes('failed'))) {
      return {
        title: 'Link Expired',
        message: 'This verification or reset link is expired or invalid. Please request a new one.'
      };
    }
    if (lower.includes('network') || lower.includes('failed to fetch')) {
      return {
        title: 'Network Issue',
        message: 'Unable to connect to the server. Please check your internet connection.'
      };
    }
    if (lower.includes('google_failed') || lower.includes('google authentication failed')) {
      return {
        title: 'Google Sign-In Failed',
        message: 'Google authentication was not completed. Please try signing in again.'
      };
    }

    const cleaned = rawMessage
      .replace(/^Error:\s*/i, '')
      .replace(/^Error occured\s*/i, '')
      .replace(/^AxiosError:\s*/i, '')
      .replace(/Request failed with status code \d+/i, 'Invalid request or credentials')
      .trim();

    return {
      title: 'Invalid Credentials',
      message: cleaned || 'Please check your information and try again.'
    };
  }

  // Info cases
  if (type === 'info') {
    if (lower.includes('logout') || lower.includes('logged out')) {
      return {
        title: 'Logged Out',
        message: 'You have been safely signed out. See you next time in the arena!'
      };
    }
    return {
      title: 'Notice',
      message: rawMessage
    };
  }

  return {
    title: 'Warning',
    message: rawMessage
  };
}

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth?.error);

  const showToast = useCallback((rawMessage, type = 'success', duration = 3800, customTitle = null) => {
    if (!rawMessage) return;
    const formatted = formatUserFriendlyToast(rawMessage, type);
    const title = customTitle || formatted.title;
    const message = formatted.message;
    const id = Date.now();

    setToast({ title, message, type, id });

    if (duration > 0) {
      setTimeout(() => {
        setToast((current) => (current?.id === id ? null : current));
      }, duration);
    }
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Automatically listen to Redux auth errors across all pages
  useEffect(() => {
    if (authError && typeof authError === 'string') {
      showToast(authError, 'error');
      dispatch(clearError());
    }
  }, [authError, showToast, dispatch]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && (
        <div className={`top-right-toast top-right-toast-${toast.type}`} role="alert">
          <div className="toast-left">
            <div className="toast-check-icon">
              {toast.type === 'success' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M8.5 12.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {toast.type === 'error' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round" />
                  <line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round" />
                </svg>
              )}
              {toast.type === 'info' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="8" x2="12" y2="8.01" strokeLinecap="round" />
                  <line x1="12" y1="11" x2="12" y2="16" strokeLinecap="round" />
                </svg>
              )}
              {toast.type === 'warning' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeWidth="2" />
                  <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" />
                  <line x1="12" y1="17" x2="12" y2="17.01" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <div className="toast-content">
              {toast.title && <span className="toast-title">{toast.title}</span>}
              <span className="toast-message-text">{toast.message}</span>
            </div>
          </div>
          <button className="toast-close-btn" onClick={hideToast} aria-label="Close notification">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
