import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../custom-axios/axios';


const Login = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getAuthToken() != null && getAuthToken() != "null") {
            navigate("/");
        }
    }, [navigate]);


    const [formData, updateFormData] = React.useState({
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const username = formData.username;
        const password = formData.password;

        await props.onLogin(username, password) ? navigate("/") : navigate("/login");
    }

    return (
        <div className='container'>
            <div className='row mt-5 pt-5'>
                <h1 className='text-center fw-bold ms-5 ps-5'>Login</h1>
                <div className='col-4'></div>
                <div className='col-5'>
                    <div className="row mt-5 ms-5" style={{ minWidth: "80vw" }}>
                        <div className="col-md-5">
                            <form onSubmit={onFormSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text"
                                        className="form-control"
                                        id="name"
                                        name="username"
                                        required
                                        placeholder="Enter your username"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <button id="submit" type="submit" className="btn btn-primary mt-3">Login</button>
                                <Link title={"Logout"} className={"mt-3 ms-3 btn btn-success"} to={"/register"}>
                                    Go to register instead
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;