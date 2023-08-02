import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import imageSaga from './image.saga';
import inputsSaga from './inputs.saga';
import triggersSaga from './triggers.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    imageSaga(), // image saga is now registered
    inputsSaga(), // inputs saga is now registered 
    triggersSaga(), // triggers saga is now registered
  ]);
}
