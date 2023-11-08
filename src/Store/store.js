import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../Slices/UserDataSlice'
import loggedUser from '../Slices/LoggedUser'

export const store = configureStore({
    reducer:{
        users:userSlice,
        loggedUsers:loggedUser
    }
})



