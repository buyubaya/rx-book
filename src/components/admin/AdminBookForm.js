import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import FormBuilder from './FormBuilder';


const BookFormBuilder = withFormik({
    displayName: 'AdminBookForm',
    enableReinitialize: true,

    mapPropsToValues: ({ editItem }) => ({
        name: editItem ? editItem.name : '',
        price: editItem ? editItem.price : '',
        img: '',
        category: editItem ? editItem.category._id : '',
        author: editItem ? editItem.author._id : '',
        brand: editItem ? editItem.brand._id : '',
        description: editItem ? editItem.description : '',
        mode: editItem ? 'EDIT' : 'ADD',
        _id: editItem ? editItem._id : ''
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

    onReset: (values) => {
        console.log('RESET', values);
    },

    handleSubmit: (values, { setSubmitting, validateForm, resetForm }) => {
        validateForm();

        let method;
        let apiEndpoint;
        if(values.mode === 'EDIT'){
            method = 'PUT';
            apiEndpoint = `http://nodejs-book-api.herokuapp.com/book/${values._id}`;
        }
        if(values.mode === 'ADD'){
            method = 'POST';
            apiEndpoint = 'http://nodejs-book-api.herokuapp.com/book';
        }

        let formData = new FormData();
        for (let field in values) {
            formData.append(field, values[field]);
        }
        
        fetch(apiEndpoint, {
            method,
            body: formData
        })
        .then(res => res.json())
        .then(json => {
            setSubmitting(false);
            resetForm();
            console.log('SUBMIT SUCCESS', json);
        });
        
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

    static contextTypes = {
        editItem: PropTypes.object,
        handleEdit: PropTypes.func
    };

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
                        if (item.fieldName === 'category') {
                            item.data = this._getChildCategory(data[0]);
                        }
                        if (item.fieldName === 'author') {
                            item.data = data[1];
                        }
                        if (item.fieldName === 'brand') {
                            item.data = data[2];
                        }

                        return item;
                    });

                    return { ...state, formBuilderData };
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

    componentWillReceiveProps(props) {
        console.log('NEW', props.editItem);
    }

    render() {
        const { editItem } = this.props;

        return (
            <BookFormBuilder
                formBuilderData={this.state.formBuilderData}
                editItem={editItem}
            />
        );
    }
}


export default AdminBookForm;