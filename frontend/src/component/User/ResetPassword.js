import React, { Fragment, useState, useEffect } from 'react';
import './ResetPassword.css';
import Loader from '../layout/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

const ResetPassword = () => {

    const dispatch = useDispatch();
    const { error, success, loading } = useSelector(state => state.forgotPassword);
    const alert = useAlert();
    const navigate = useNavigate();
    const {token} = useParams();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Reset Successful");
            navigate('/login');
        }
    }, [dispatch, error, alert, success, navigate]);

    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    <Fragment>
                        <MetaData title="Reset Password" />
                        <div className='resetPasswordContainer'>
                            <div className='resetPasswordBox'>
                                <h2 className='resetPasswordHeading'>Change Password</h2>
                                <form className='resetPasswordForm' onSubmit={resetPasswordSubmit}>
                                    <div>
                                        <LockOpenIcon />
                                        <input
                                            type='password'
                                            placeholder='New Password'
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <LockIcon />
                                        <input
                                            type='password'
                                            placeholder='Confirm Password'
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <input type='submit' value="Update" className='resetPasswordBtn' />
                                </form>
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default ResetPassword