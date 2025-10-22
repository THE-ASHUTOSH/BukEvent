
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/profile');
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl shadow-purple-900/30 animate-fade-in-up">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Create a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="rounded-md shadow-sm space-y-3">
            <input
              name="name" type="text" required
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
            />
            <input
              name="email" type="email" autoComplete="email" required
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name="password" type="password" autoComplete="new-password" required
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-brand-purple to-brand-pink hover:from-brand-pink hover:to-brand-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </div>
        </form>
         <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
