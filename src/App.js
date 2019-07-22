import React, {useState} from 'react';

import Header from './components/Header';
import Auth from './components/Auth';
import Todo from './components/Todo';

const app = props => {
  const [page, setPage] = useState('auth')
  console.log(page)

  const switchPage = pageName => {
    setPage(pageName)
  }
  return(
      <div className="App">
        <Header onLoadTodos={switchPage.bind(this, 'todos' )} onLoadAuth={switchPage.bind(this, 'auth' )} />
        {page==='auth' ?  <Auth/>  : <Todo/> }
        <hr/>

      </div>
  );
}


export default app;
