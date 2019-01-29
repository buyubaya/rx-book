import React from 'react';
import AdminBookForm from '../../components/admin/AdminBookForm';


class AdminBookPage extends React.Component {
    render(){
        return(
            <div className='admin-page book-page'>
                <h1>HELLO BOOK</h1>
                <AdminBookForm />
            </div>
        );
    }
}


export default AdminBookPage;