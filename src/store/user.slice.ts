import  { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { LoginResponse } from '../interfaces/auth.interface';
import { RootState } from './store';
 
export const  JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistState {
    jwt: string | null;
}

export interface UserProfile {
    email: string;
    name: string;
    id: number;
    address: string;
    phone: string;
}

export interface UserState {
    jwt: string | null;
    loginErrorMessage?: string;
    registerErrorMessage?: string;
    profile?: UserProfile
}

const initialState: UserState = {
    jwt: loadState<UserPersistState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const login = createAsyncThunk('user/login', 
    async (params: { email: string, password: string }) => {
        try {
            const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
                email: params.email,
                password: params.password
            });
            return data;     
        } catch (err) {
            if(err instanceof AxiosError) {
                throw new Error(err.response?.data?.message);
            }
        }
        
    }
);

export const register = createAsyncThunk('user/register', 
    async (params: { email: string, password: string, name: string}) => {
        try {
            const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
                email: params.email,
                password: params.password,
                name: params.name
            });
            return data;     
        } catch (err) {
            if(err instanceof AxiosError) {
                throw new Error(err.response?.data?.message);
            }
        }
        
    }
);

export const getProfile = createAsyncThunk('user/getProfile', 
    async (_, { getState }) => {
        const state = getState() as RootState;
        try {
            const { data } = await axios.get<UserProfile>(`${PREFIX}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${state.user.jwt}`
                }
            });
            return data;     
        } catch (err) {
            if(err instanceof AxiosError) {
                throw new Error(err.response?.data?.message);
            }
        }
        
    }

);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            console.log(state);
            state.jwt = null;
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined;
        },
        clearRegisterError: (state) => {
            state.registerErrorMessage = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if(!action.payload) { return; }
            state.jwt = action.payload.access_token;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            if(!action.payload) { return; }
            state.jwt = action.payload.access_token;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.registerErrorMessage = action.error.message;
        });
        
    }
});



export default userSlice.reducer;
export const userActions = userSlice.actions;
