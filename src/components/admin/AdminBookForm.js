import React from 'react';
import { withFormik, Field, setNestedObjectValues } from 'formik';
import FormBuilder from './FormBuilder';
import AdminBookPage from '../../pages/admin/AdminBookPage';


const BookFormBuilder = withFormik({
    displayName: 'AdminBookForm',

    mapPropsToValues: () => ({
        name: '',
        price: '',
        img: '',
        description: ''
    }),

    validate: values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Name Required';
        }

        if (!values.category) {
            errors.category = 'Category Required';
        }

        return errors;
    },

    handleSubmit: (values, { setSubmitting, validateForm, setValues }) => {
        validateForm();
        
        let formData = new FormData();
        for(let field in values){
            formData.append(field, values[field]);
        }
        setValues({
            name: '',
            price: '',
            img: '',
            description: ''
        });
        // fetch('http://nodejs-book-api.herokuapp.com/book', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(res => res.json())
        // .then(json => {
        //     setSubmitting(false);
        //     setValues({});
        //     console.log('POST SUCCESS', json);
        // });
    },

    validateOnChange: false,
    validateOnBlur: false
})(FormBuilder);


class AdminBookForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            formBuilderData: [
                {
                    label: 'Name',
                    fieldName: 'name',
                    component: 'text'
                },
                {
                    label: 'Price',
                    fieldName: 'price',
                    component: 'number'
                },
                {
                    label: 'Category',
                    fieldName: 'category',
                    component: 'select'
                },
                {
                    label: 'Author',
                    fieldName: 'author',
                    component: 'select'
                },
                {
                    label: 'Brand',
                    fieldName: 'brand',
                    component: 'select'
                },
                {
                    label: 'Image',
                    fieldName: 'img',
                    component: 'file'
                },
                {
                    label: 'Description',
                    fieldName: 'description',
                    component: 'textarea'
                }
            ]
        };
    }

    componentDidMount() {
        const cPromise = fetch('http://nodejs-book-api.herokuapp.com/category')
            .then(res => res.json());
        const aPromise = fetch('http://nodejs-book-api.herokuapp.com/author')
            .then(res => res.json());
        const bPromise = fetch('http://nodejs-book-api.herokuapp.com/brand')
            .then(res => res.json());

        Promise.all([cPromise, aPromise, bPromise])
            .then(data => {
                this.setState(state => {
                    let formBuilderData = [...state.formBuilderData];
                    formBuilderData = formBuilderData.map(item => {
                        if(item.fieldName === 'category'){
                            item.data = this._getChildCategory(data[0]);
                        }
                        if(item.fieldName === 'author'){
                            item.data = data[1];
                        }
                        if(item.fieldName === 'brand'){
                            item.data = data[2];
                        }

                        return item;
                    });

                    return {...state, formBuilderData};
                });
            });
    }

    _getChildCategory(data) {
        let parents = [];

        data.forEach(item => {
            if (item.parent_id) {
                parents.push(item.parent_id);
            }
        });

        const children = data.filter(item => {
            return !parents.includes(item._id);
        });

        return children;
    }

    render(){
        return(
            <BookFormBuilder 
                formBuilderData={this.state.formBuilderData}
            />
        );
    }
}


export default AdminBookForm;