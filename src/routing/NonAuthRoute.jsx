import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function NonAuthRoute ({ component: Component, ...otherProps }) {

    const { isAuthenticated, isLoading } = useContext(AuthContext)

    return (
        <Route
            {...otherProps}
            render={props => (
                !isLoading
                    ?
                    (
                        !isAuthenticated
                            ?
                            <Component {...props} />
                            :
                            <Redirect to={'/'} />
                    )
                    :
                    <h1>Cargando...</h1>
            )}
        />
    )
}

export default NonAuthRoute;