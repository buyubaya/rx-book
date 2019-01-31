import React from 'react';
import { withFormik } from 'formik';
import FormBuilder from '../../components/admin/FormBuilder';


const LoginFormBuilder = withFormik({
    displayName: 'AdminLoginForm',
    enableReinitialize: true,

    mapPropsToValues: (props) => ({
        username: '',
        password: ''
    }),

    validate: values => {
        const errors = {};

        if (!values.username) {
            errors.name = 'UsenName Required';
        }

        if (!values.password) {
            errors.category = 'Password Required';
        }

        return errors;
    },

    onReset: (values) => {
        console.log('RESET', values);
    },

    handleSubmit: (values, { setSubmitting, validateForm, resetForm }) => {
        validateForm();
        console.log('SUBMIT', values);
    },

    validateOnChange: false,
    validateOnBlur: false
})(FormBuilder);


class AdminLoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            formBuilderData: [
                {
                    label: 'Username',
                    fieldName: 'username',
                    component: 'text'
                },
                {
                    label: 'Password',
                    fieldName: 'password',
                    component: 'text'
                }
            ]
        };
    }

    render(){
        const { formBuilderData } = this.state;

        return(
            <div className='admin-login-page'>
                <div className='wrap-lg'>
                    <LoginFormBuilder 
                        formBuilderData={formBuilderData}
                    />
                </div>
            </div>
        );
    }
}


export default AdminLoginPage;