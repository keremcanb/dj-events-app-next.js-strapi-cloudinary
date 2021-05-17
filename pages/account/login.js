import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Layout } from '@/components/index';
import styles from '@/styles/AuthForm.module.css';

export default function LoginPage() {
  const [values, setValues] = useState({ email: '', password: '' });
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
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1 className="font-bold text-4xl mb-8">
          <FaUser /> Login
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={handleChange} required />
          </div>
          <input type="submit" value="Login" className="btn-info" />
        </form>
        {/* <p>
          Forgot your password? <Link href="/account/register">Reset Here</Link>
        </p> */}
        <p>
          Don't have an account? <Link href="/account/register">Register Here</Link>
        </p>
      </div>
    </Layout>
  );
}
