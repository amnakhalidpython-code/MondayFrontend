import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth, googleProvider, microsoftProvider, signInWithPopup } from '../../utils/firebase';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleNext = () => {
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        // In a real app, this would check if email exists, then prompt for password
        // For this flow, we'll simulate a login or redirect to signup if new
        console.log('Login attempt with:', email);
        navigate('/dashboard', { state: { email } }); // Hypothetical password step
    };

    const handleOAuthLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Save to context/session
            await login({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            });

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-16 font-sans">

            {/* Logo */}
            <div className="mb-12">
                <img
                    src="https://cdn.monday.com/images/logos/monday_logo_short.png"
                    alt="monday.com"
                    className="h-8"
                />
            </div>

            {/* Main Container */}
            <div className="w-full max-w-[400px] px-6">

                {/* Heading */}
                <h1 className="text-[32px] font-normal text-[#323338] text-center mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Log in to your account
                </h1>

                {/* Email Input */}
                <div className="mb-6">
                    <label className="block text-sm text-[#323338] mb-2 text-center">
                        Enter your work email address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                        placeholder="Example@company.com"
                        className={`w-full px-4 py-2.5 border rounded text-[#323338] text-[15px] focus:outline-none focus:border-[#0073ea] transition-colors ${error ? 'border-red-500' : 'border-[#c3c6d4]'
                            }`}
                    />
                    {error && <p className="text-red-500 text-xs mt-1 text-center">{error}</p>}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="w-full bg-[#4353ff] hover:bg-[#3442d6] text-white py-2.5 rounded text-[16px] font-normal flex items-center justify-center gap-2 transition-colors mb-8"
                >
                    Next
                    <ArrowRight size={18} />
                </button>

                {/* Separator */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-[#d0d4e4] flex-1"></div>
                    <span className="text-[#676879] text-sm">Or Sign in with</span>
                    <div className="h-px bg-[#d0d4e4] flex-1"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => handleOAuthLogin(googleProvider)}
                        className="flex-1 flex items-center justify-center gap-2 border border-[#c3c6d4] rounded py-2 hover:bg-gray-50 transition-colors"
                    >
                        <img src="https://cdn.monday.com/images/logo_google_v2.svg" alt="Google" className="w-4 h-4" />
                        <span className="text-[#323338] text-sm">Google</span>
                    </button>

                    <button
                        onClick={() => handleOAuthLogin(microsoftProvider)}
                        className="flex-1 flex items-center justify-center gap-2 border border-[#c3c6d4] rounded py-2 hover:bg-gray-50 transition-colors"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-4 h-4" />
                        <span className="text-[#323338] text-sm">Microsoft</span>
                    </button>
                </div>

                {/* Footer Links */}
                <div className="text-center space-y-2">
                    <p className="text-sm text-[#323338]">
                        Don't have an account yet? <a href="/one" className="text-[#0073ea] hover:underline">Sign up</a>
                    </p>
                    <p className="text-sm text-[#323338]">
                        Can't log in? <a href="#" className="text-[#0073ea] hover:underline">Visit our help center</a>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;