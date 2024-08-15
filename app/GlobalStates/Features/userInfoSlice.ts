import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ObjectState {
  _id: string,
  username: string,
  email:string
  fullname:string
  avatar:string,
  // Add more keys as needed
}
const initialState: ObjectState = {
  _id: "",
  username: "",
  email:"",
  fullname:"",
  avatar:"",
};

const objectSlice = createSlice({
  name: 'object',
  initialState,
  reducers: {
    set_id: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setFullname: (state, action: PayloadAction<string>) => {
      state.fullname = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    updateObject: (state, action: PayloadAction<Partial<ObjectState>>) => {
      return { ...state, ...action.payload };
    },
    resetObject: () => initialState,
  },
});

export const {setUsername,setFullname,set_id,setAvatar,  updateObject, resetObject } = objectSlice.actions;

export default objectSlice.reducer;