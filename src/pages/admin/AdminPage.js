import React from 'react';
import { Route, Link } from 'react-router-dom';


function CustomLink({ to, children, exact }) {
    return (
        <Route
            path={to}
            exact={exact}
            children={({ match }) => (
                <li className={match ? 'is-active' : ''}>
                    <Link to={to}>{children}</Link>
                </li>
            )}
        />
    );
}


class AdminPage extends React.Component {
    render() {
        return (
            <div className='wrap-lg'>
                <div className='admin-header'>
                    <ul className='admin-nav'>
                        <CustomLink to='/' exact>Home</CustomLink>
                        <CustomLink to='/admin/book'>Books</CustomLink>
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
}


export default AdminPage;