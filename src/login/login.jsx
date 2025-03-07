import React from 'react';

import { Authenticated } from './authenticated';
import { Unauthenticated } from './unauthenticated';
import { AuthState } from './authState';


export function Login({userName, authState, onAuthChange}) {

  return (
    <main className="container-fluid text-center" id="home">
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome to CalCount</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}