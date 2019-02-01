import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import FormBuilder from './FormBuilder';
import { ADMIN_API_URL } from '../../constants/ApiUrls';


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
        description: (editItem && editItem.description !== 'null') ? editItem.description : ''
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

    handleSubmit: (values, { setSubmitting, validateForm, resetForm, props: { editItem, onSubmitSuccess } }) => {
        validateForm();

        let method;
        let apiEndpoint;
        const id = editItem ? editItem._id : '';
        if (editItem) {
            method = 'PUT';
            // apiEndpoint = `${'http://localhost:3000'}/book/${id}`;
            apiEndpoint = `${ADMIN_API_URL}/book/${id}`;
        }
        else {
            method = 'POST';
            // apiEndpoint = `${'http://localhost:3000'}/book`;
            apiEndpoint = `${ADMIN_API_URL}/book`;
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
            if (onSubmitSuccess) {
                onSubmitSuccess(json);
            }
        })
        .catch(err => console.log(err));
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

        this._handleSubmitSuccess = this._handleSubmitSuccess.bind(this);
    }

    static contextTypes = {
        editItem: PropTypes.object,
        handleEdit: PropTypes.func,
        hideForm: PropTypes.func,
        _addItemToBookList: PropTypes.func,
        _handleSubmitSuccess: PropTypes.func
    };

    componentDidMount() {
        const cPromise = fetch(`${ADMIN_API_URL}/category`)
            .then(res => res.json());
        const aPromise = fetch(`${ADMIN_API_URL}/author`)
            .then(res => res.json());
        const bPromise = fetch(`${ADMIN_API_URL}/brand`)
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

    _handleSubmitSuccess(data) {
        this.context._handleSubmitSuccess && this.context._handleSubmitSuccess(data);
    }

    render() {
        const { editItem } = this.props;

        return (
            <BookFormBuilder
                formBuilderData={this.state.formBuilderData}
                editItem={editItem}
                onSubmitSuccess={this._handleSubmitSuccess}
            />
        );
    }
}


export default AdminBookForm;