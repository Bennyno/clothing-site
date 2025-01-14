import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useNavigate } from "react-router-dom";
import  { SignInContainer, SignInHeader, ButtonsContainer } from './sign-in-form.styles'
import { useDispatch } from "react-redux";
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
  } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const navigate = useNavigate();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        navigate('/');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error)
            }
        }
        navigate('/');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    };


    return (
        <SignInContainer>
            <SignInHeader>Already have an account?</SignInHeader>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label = "Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label = "Password" type ="password" required onChange={handleChange} name="password" value={password}/>
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
};

export default SignInForm;