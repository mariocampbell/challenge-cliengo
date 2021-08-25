import React from 'react';

import { Switch, Route, NavLink } from "react-router-dom";
import { ToastContainer } from 'react-toastify'

import UserForm from './components/UserForm/UserForm';
import UserList from './components/UserList/UserList';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

import './styles.scss';

function App() {
  return (
    <div className="app layout">
      <aside>
        <header> <div className="logo"/> </header>
        <nav>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active" exact>Users List</NavLink>
            </li>
            <li>
              <NavLink to="/users" activeClassName="active">User</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <section>
        <NavBar />
        <main>
          <header className="page-title">
          </header>
          <Switch>
            <Route exact path="/" component={UserList}/>
            <Route exact path="/users" component={UserForm} />
            <Route exact path="/users/:user_email" component={UserForm} />
          </Switch>
        </main>
        <Footer />
      </section>
      <ToastContainer newestOnTop />
    </div>
  );
}

export default React.memo(App);
