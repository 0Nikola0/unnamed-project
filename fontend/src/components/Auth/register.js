import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../custom-axios/axios';


const Register = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getAuthToken() != null && getAuthToken() != "null") {
            navigate("/");
        }
    }, [navigate]);


    const [formData, updateFormData] = React.useState({
        username: "",
        firstName: "",
        lastName: "",
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
        const firstName = formData.firstName;
        const lastName = formData.lastName;
        const password = formData.password;

        await props.onRegister(firstName, lastName, username, password) ? navigate("/") : navigate("/register");
    }

    return (
        <div className='container'>
            <div className='row mt-5 pt-5'>
                <h1 className='text-center fw-bold ms-5 ps-5'>Регистрација</h1>
                <div className='col-4'></div>
                <div className='col-5'>
                    <div className="row mt-5 ms-5" style={{ minWidth: "80vw" }}>
                        <div className="col-md-5">
                            <form onSubmit={onFormSubmit}>
                                <div className="form-group mt-3">
                                    <label htmlFor="first name">Име</label>
                                    <input type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        placeholder="Име"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="last name">Презиме</label>
                                    <input type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        required
                                        placeholder="Презиме"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="username">Корисничко име</label>
                                    <input type="text"
                                        className="form-control"
                                        id="name"
                                        name="username"
                                        required
                                        placeholder="Корисничко име"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="password">Лозинка</label>
                                    <input type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <button id="submit" type="submit" className="btn btn-primary mt-3">Регистрирај се</button>
                                <Link title={"Logout"} className={"mt-3 ms-3 btn btn-success"} to={"/login"}>
                                    Оди кон најава
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;