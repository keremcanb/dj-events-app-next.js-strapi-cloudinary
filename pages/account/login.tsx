import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Layout, Button } from '@/components/index';

const LoginPage = () => {
  const [values, setValues] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const { email, password } = values;
  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    login(values);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  return (
    <Layout title="User Login - DJ Events">
      <div className="max-w-md m-auto p-10 shadow-lg">
        <h1 className="inline-flex">
          <FaUser className="mr-2" /> Login
        </h1>
        <ToastContainer position="top-center" />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={handleChange} required />
          </div>
          <div className="mt-5">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={handleChange} required />
          </div>
          <Button color="blue" text="Login" />
        </form>
        <p className="text-center">
          Don't have an account? <Link href="/account/register">Register Here</Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
