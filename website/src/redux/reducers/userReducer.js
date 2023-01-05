import { userSlice, signInAsync, signUpAsync } from '../userSlice'

export const reducers = {
    updateStatus: (state) => {
        state.status = state.status === 'idle' ? 'loading' : 'idle';
    },
    updateErrorMessage: (state, action) => {
        let error = Object.values(action.payload)
        state.errorMessage = error ? error[0] : null
        state.id = null
    },
    updateToken: (state, action) => {
        state.token = action.payload.token
    },
    updateUserAuth: (state) => {
        state.userAuth = !state.userAuth
    },
    updateUser: (state, action) => {
        state.id = action.payload.id ? action.payload.id : null
        state.email = action.payload.email ? action.payload.email : null
        state.first_name = action.payload.first_name ? action.payload.first_name : null
        state.last_name = action.payload.last_name ? action.payload.last_name : null
        state.username = action.payload.username ? action.payload.username : null
    },
    logOutUser: (state) => {
        state.userAuth = false
        state.id = null
        state.email = null
        state.first_name = null
        state.last_name = null
        state.username = null
        state.errorMessage = null
        state.token = null
    }
}

export const extraReducers = (builder) => {
    builder
        .addCase(signInAsync.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(signInAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            if (action.payload.token) {
                userSlice.caseReducers.updateToken(state, action)
                userSlice.caseReducers.updateUserAuth(state)
            } else {
                userSlice.caseReducers.updateErrorMessage(state, action)
            }            
        })
        .addCase(signUpAsync.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(signUpAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            if (action.payload.id) {
                userSlice.caseReducers.updateUser(state, action)
            } else {
                userSlice.caseReducers.updateErrorMessage(state, action)
            }
        });
}
