import { createSlice } from "@reduxjs/toolkit"
const initVal = {
    userName: ""
}
const userSlice = createSlice({
    name:"userName",
    initialState:initVal,
    reducers: {
        save: (state, action) => {
            state.userName=action.payload
        },
        clear: (state) => {
            state.userName = ""
        }
    }
})
export const {save, clear } = userSlice.actions
export default userSlice.reducer


