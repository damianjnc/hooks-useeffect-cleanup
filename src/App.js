import React, {useState} from 'react';

import Header from './components/Header';
import Auth from './components/Auth';
import Todo from './components/Todo';
import AuthContext from './auth-context';

const app = props => {
    const [page, setPage] = useState('auth')
    const [authStatus, setAuthStatus] = useState(false)

    const switchPage = pageName => {
        setPage(pageName)
    }
    // const saved = switchPage.bind(this, 'todos')
    // console.log(saved)
    const login = () => {
        setAuthStatus(true)
    }
    return (
        <div className="App">
            <AuthContext.Provider value={{status:authStatus, login:login}}>
                <Header onLoadTodos={switchPage.bind(this, 'todos')} onLoadAuth={switchPage.bind(this, 'auth')}/>
                {page === 'auth' ? <Auth/> : <Todo/>}
                <hr/>
            </AuthContext.Provider>
        </div>
    );
}


export default app;
