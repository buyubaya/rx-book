import React, { Component } from 'react';
import './App.css';
import 'rxjs';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BookList from './components/BookList';
import AdminPage from './pages/admin/AdminPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminBookPage from './pages/admin/AdminBookPage';


class App extends Component {
	render(){
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/' exact component={BookList} />
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
