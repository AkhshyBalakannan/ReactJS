export const reducers = {
    updateStatus: (state) => {
        state.status = state.status === 'idle' ? 'loading' : 'idle';
    },
    addMyCart: (state, action) => {
        state.myCart.push(action.payload)
    },
    addWishList: (state, action) => {
        state.wishList.push(action.payload)
    },
    removeMyCart: (state, action) => {
        let items = state.myCart.map(item => item.id)
        let itemId = action.payload.id

        const index = items.indexOf(itemId)
        if (index > -1) {
            state.myCart.splice(index, 1)
        }
    },
    removeWishList: (state, action) => {
        let items = state.wishList.map(item => item.id)
        let itemId = action.payload.id

        const index = items.indexOf(itemId)
        if (index > -1) {
            state.wishList.splice(index, 1)
        }
    }
}

export const extraReducers = (builder) => {
    builder
        .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
        })
        .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
        });
}
