import React from 'react';
import { withFormik, Field } from 'formik';


class FormBuilder extends React.Component {
    getFieldComponent(item){
        const { setFieldValue } = this.props;

        switch(item.component){
            case 'text':
                return <Field type='text' name={item.fieldName} className='input' />;
            case 'number':
                return <Field type='number' name={item.fieldName} className='input' />;
            case 'textarea':
                return <Field component='textarea' name={item.fieldName} className='input input-textarea' />;
            case 'file':
                return(
                    <input 
                        name={item.fieldName}
                        type='file'
                        className='input input-file'
                        onChange={(event) => {
                            setFieldValue && setFieldValue(item.fieldName, event.currentTarget.files[0]);
                        }}
                    />
                );
            case 'select':
                return(
                    <Field component='select' name={item.fieldName} className='input input-select'>
                        <option value=''>Select</option>
                        {
                            item.data && item.data.map(x => {
                                return (
                                    <option value={x._id} key={x._id}>{x.name}</option>
                                );
                            })
                        }
                    </Field>
                );
            default:
                return <Field type='text' name={item.fieldName} className='input' />;
        }
    }

    render(){
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            formBuilderData,
            formikData
        } = this.props;

        
        return (
            <div className='admin-form-area'>
                <form onSubmit={handleSubmit}>
                    {
                        formBuilderData && formBuilderData.map(item =>
                            <div className='input-group' key={item.fieldName}>
                                <div className='input-label'>{item.label}</div>
                                {this.getFieldComponent(item)}
                            </div>
                        )
                    }

                    {
                        errors && Object.keys(errors).length > 0 &&
                        <div className='input-errors-area'>
                            {
                                Object.keys(errors).map(k => {
                                    return <div className="input-error" key={k}>{errors[k]}</div>;
                                })
                            }
                        </div>
                    }

                    <button type="submit" className='btn btn-submit'>Submit</button>
                </form>
            </div>
        );
    }
}


export default FormBuilder;