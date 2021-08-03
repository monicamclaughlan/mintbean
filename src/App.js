import AboutUs from './pages/AboutUs';
import './App.css';
import SplashPage from './pages/Splash';
import Main from './pages/Main'
import Footer from './components/Footer'
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom'
import React, {useState} from 'react'

function App(props) {

  const history = useHistory()
  const url = process.env.REACT_APP_BACKENDURL
  const [user, setUser] = useState({name: "", username: "", password: ""})

  const getLogin = (username, password) => {
    fetch(url + '/login' + username + '/' + password)
    .then((response) => response.json())
    .then((data) => {
      setUser(data);
      console.log("setUser DATA", setUser(data))
      if (data.status === 200)
      {
        setUser()
        props.history.push('/home')
      } else if (data.status === 409) {
        alert('username does not exist')
        props.history.push('/create')
      } else if (data.status === 403) {
        alert('username or password is WRONG!')
      }
      

    })
  }

  //handle create for the form
const handleCreate = (newUser) => {
  fetch(url + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser)
  }).then((response) => response.json())
  .then((data) =>  {
    console.log(data.status)
    if(data.status === 200)
    {
    setUser(data.data._id)
    history.push('/')
  
  } else if (data.status === 403) {
    alert('username already exists')
    history.push('/login')
  }

  })
};
  return (
    <div className="App">
      <Switch>
        {/* <Route exact path='/'>
        <Redirect to='/login' />
        </Route>  */}
      <Route exact path='/'>
        <SplashPage user={user} setUser={setUser} getLogin={getLogin} />
      </Route>
      <Route
          path="/login"
        >
          <Login 
            user={user}
            setUser={setUser}
            getLogin={getLogin}
          />
        </Route>
        <Route
          path="/create"
        >
          <CreateAccount 
            user={user}
            setUser={setUser}
            handleCreate={handleCreate}
          />
        </Route>
      <Route path='/play'>
        <Main/>
      </Route>
      <Route path ='/about'>
        <AboutUs />
      </Route>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
