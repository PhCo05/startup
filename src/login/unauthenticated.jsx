import React from 'react';

import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <>
        <div className="input-group mb-3">
            <span className="input-group-text">&#9993;</span>
            <input type="email" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Email Address" />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">&#128274;</span>
            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>
        <Button variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>
            Login
        </Button>
        <Button variant='primary' onClick={() => createUser()} disabled={!userName || !password}>
            Create
        </Button>
    </>
  );
}