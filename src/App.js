import React, { Component } from 'react';
import './App.css';
import 'rxjs';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/admin/AdminPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminBookPage from './pages/admin/AdminBookPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLogoutPage from './pages/admin/AdminLogoutPage';


class App extends Component {
	render(){
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/' exact component={HomePage} />
					<Route path='/user/login' exact component={AdminLoginPage} />
					<Route path='/user/logout' exact component={AdminLogoutPage} />
					<Route path='/admin'>
						<AdminPage>
							<Route path='/admin/dashboard' component={AdminDashboardPage} />
							<Route path='/admin/book' component={AdminBookPage} />
						</AdminPage>
					</Route>
				</Switch>
			</BrowserRouter>
		);
	}
}


export default App;
