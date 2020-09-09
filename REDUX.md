# Redux

- DEPENDENCIES
    - redux
    - react-redux
    - redux-logger
    - redux-persist
    - reselect

- Store

    Location that store all data of your Redux

- Reducers

    Store all information about a subject

- Actions

    Make actions to change values inside the Reducers

- Dependencies
    - redux
    - redux-logger
    - react-redux

- REDUX HOOKS
    - index.js

        ```jsx
        import { Provider } from 'react-redux'
        import { createStore } from 'redux'

        import Reducers from './redux/store'

        const store = createStore(Reducers);

        ReactDOM.render(
        	<React.StrictMode>
        		<Provider store={store}>
        			<App />
        		</Provider>
        	<React.StrictMode>,
          document.getElementById('root')
        )
        ```

    - redux/
        - store.js

            ```jsx
            import { createStore } from 'redux'

            import { reducers } from './reducers'

            const store = createStore(reducers)

            export { store }
            ```

        - reducers/
            - index.js

                ```jsx
                import { combineReducers } from 'redux'

                import { reducers as counterReducers } from './counter'

                const reducers = combineReducers({
                	counterReducers
                })

                export { reducers } 
                ```

            - counter.js

                ```jsx
                import { actionTypes } from '../constants/counter'

                const INITIAL_STATE = {
                	counter: 0,
                }

                const reducers = ( state = INITIAL_STATE, action ) => {
                	switch( action.type ) {
                		case actionTypes.COUNTER_DECREMENT:
                			return {
                				...state,
                				counter: state.counter - 1,
                			}

                		case actionTypes.COUNTER_INCREMENT:
                			return {
                				...state, 
                				counter: state.counter + 1,
                			}

                		default: 
                			return state
                	}
                }

                export { reducers } 
                ```

        - actions/
            - counter.js

                ```jsx
                import { actionTypes } from '../constants/counter-types.js'

                const actions = {
                	decrement: () => ({
                		type: actionTypes.COUNTER_DECREMENT
                	}),
                	increment: () => ({
                		type: actionTypes.COUNTER_INCREMENT
                	})
                }

                export const { actions }
                ```

        - constants/
            - counter-types.js

                ```jsx
                const actionTypes = {
                	COUNTER_DECREMENT: 'COUNTER_DECREMENT',
                	COUNTER_INCREMENT: 'COUNTER_INCREMENT
                }

                export { actionTypes } 
                ```

        - selector/
            - counter.js

                ```jsx
                const selectors = {
                	getCounter: state => state.counterReducers.counter
                }

                export { selectors } 
                ```

    - components/
        - Counter.js

            ```jsx
            import React from 'react'
            import { useDispatch, useSelector } from 'react-redux'

            import { actions } from '../redux/actions/counter'
            import { selectors } from '../redux/selectors/counter'

            const Counter = () => {
            	// const counter = useSelector( state => state.counterReducers.counter)
            	const counter = useSelector( selectors.getCounter )
            	const dispatch = useDispatch()

            	const handleDecrement = () => dispatch(actions.decrement())
            	const handleIncrement = () => dispatch(actions.increment())	

            	return(
            		<>
            			<h1> Counter: { counter } </h1>
            			<ul>
            				<li><button onClick={ handleDecrement }>Decrement</button></li>
            				<li><button onClick={ handleIncrement }>Increment</button></li>	
            			</ul>
            		</>
            	)
            }
            ```

- CODE
    - Insert this code into the REACT FILE index.js

    ```jsx
    import { Provider } from 'react-redux'
    import { createStore } from 'redux'

    import Reducers from '../reducers'

    const store = createStore(Reducers);

    ReactDOM.render(
    	<React.StrictMode>
    		<Provider store={store}>
    			<App />
    		</Provider>
    	<React.StrictMode>,
      document.getElementById('root')
    )
    ```

    - Create a new folder
        - src/reducers/
            - UserReducer.js

                ```jsx
                const initialState = {
                	name: '',
                }

                const UserReducer = ( state = initialState, action) => {
                	switch(action.type) {
                		case 'SET_NAME': 
                			return { ...state, name: action.payload.name };
                			break;
                	}	

                	return state
                }

                export default UserReducer;
                ```

            - index.js

                ```jsx
                import { combineReducers } from 'redux'
                import UserReducer from './UserReducer'

                export default combineReducers ({
                	user: UserReducer;
                })
                ```

    - Connect
        - How to connect

        ```jsx
        import React from 'react'
        import { connect } from 'react-redux'

        const handleClick = () => {
        	props.setName('Fulano');
        }

        function <Component>(props) {
        	return (
        		<>
        			Name: {props.name}

        			<button onClick={handleClick} >Click</button>
        		</>
        	)
        }

        // Read states from REDUX
        const mapStateToProps = (state) => {
        	return {
        		name: state.user.name
        	}
        }

        // set new value to REDUX
        const mapDispatchToProps = (dispatch) => {
        	return (
        		setName: ( newName ) => {
        			type: 'SET_NAME',
        			payload: { name: newName }
        		}
        	) 
        }

        export default connect( mapStateToProps, mapDispatchToProps )( <Component> )
        ```

        - New method with HOOKS

            ```jsx
            import React from 'react'
            import { useSelector, useDispatch } from 'react-redux'

            function <Component>(props) {
            	const dispatch = useDispatch()

            	const name = useSelector(state => state.user.name)

            	const handleClick = () => {
            		dispatch ({
            			type: 'SET_NAME',
            			payload: { name: 'Fulano' }
            		})
            	}
            		
            	return (
            		<>
            			Name: {props.name}

            			<button onClick={handleClick} >Click</button>
            		</>
            	)
            }

            export default <Component>;
            ```

    - Persist Data
        - yarn add redux-persist
        - go to the src/index.js

        ```jsx
        import React from 'react'
        import ReactDOM from 'react-dom'
        import { Provider } from 'react-redux'
        import { persistGate } from 'redux-persist/integration/react'

        import App from './App'
        import { store, persistor } from './store'

        ReactDOM.render(
        	<React.StrictMode>
        		<Provider store={store}>
        			<PersistGate loading={null} persistor={persistor}>
        				<App />
        			</PersistGate>
        		</Provider>
        	<React.StrictMode>,
          document.getElementById('root')
        )
        ```

        - Create a new file
            - src/store.js

                ```jsx
                import React from 'react'
                import { createStore } from 'redux'
                import { persistStore, persistReducer } from 'redux-persist'
                import storage from 'redux-persist/lib/storage'

                import Reducers from './reducers'

                const persistConfig = {
                	key: 'root',
                	storage,
                	whitelist: [ 'user' ]
                }

                const persistReducer  = persistReducer( persistConfig, Reducers );

                const store = createStore( persistReducer )
                const persistor = persistStore( store ) 

                export { store, persistor }
                ```

- My Redux
    - Folder ./src
        - index.js

            ```jsx
            import React from 'react';
            import ReactDOM from 'react-dom';
            import App from './App';

            import { Provider } from 'react-redux';

            import store from './redux/store';

            ReactDOM.render(
              <React.StrictMode>
                <Provider store={store}>
                  <App />
                </Provider>
              </React.StrictMode>,
              document.getElementById('root')
            );
            ```

        - app.js

            ```jsx
            import React, { useState, useEffect } from 'react';
            import { auth, createUserProfileDocument } from './firebase/firebase-utils';

            import { useDispatch } from 'react-redux';

            import Routes from './routes';

            import GlobalStyle from './styles/global';

            function App() {
              const dispatch = useDispatch();

              const isLogged = async () => {
                await auth.onAuthStateChanged(async (authUser) => {
                  if (authUser) {
                    const userRef = await createUserProfileDocument(authUser);

                    userRef.onSnapshot((snapShot) => {
                      dispatch({
                        type: 'SET_CURRENT_USER',
                        payload: {
                          user: {
                            id: snapShot.id,
                            ...snapShot.data(),
                          },
                        },
                      });
                    });
                  }

                  dispatch({ type: 'SET_CURRENT_USER', authUser });
                });
              };

              useEffect(() => {
                isLogged();

                return () => {
                  isLogged();
                };
              }, []);

              return (
                <>
                  <GlobalStyle />
                  <Routes />
                </>
              );
            }

            export default App;
            ```

        - redux
            - store.js

                ```jsx
                import { createStore, applyMiddleware } from 'redux';
                import logger from 'redux-logger';

                import rootReducer from './root-reducer';

                const store = createStore(rootReducer, applyMiddleware(logger));

                export default store;
                ```

            - root-reducer.js

                ```jsx
                import { combineReducers } from 'redux';

                import userReducer from './user/user-reducer';

                export default combineReducers({
                  user: userReducer,
                });
                ```

            - user/
                - user-reducer.js

                    ```jsx
                    const INITIAL_STATE = {
                      currentUser: null,
                    };

                    const userReducer = (state = INITIAL_STATE, action) => {
                      switch (action.type) {
                        case 'SET_CURRENT_USER':
                          return {
                            ...state,
                            currentUser: action.payload,
                          };

                        default:
                          return state;
                      }
                    };

                    export default userReducer;
                    ```

                - user-actions.js

                    ```jsx
                    export const setCurrentUser = (user) => ({
                      type: 'SET_CURRENT_USER',
                      payload: user,
                    });
                    ```