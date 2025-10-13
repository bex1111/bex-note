import axios from 'axios';
import {tokenStore} from '../main';


export const getNoteList = async () => {
    const response = await axios.get('http://localhost:1080/api/internal/note/list', {
        headers: {
            'x-auth-token': tokenStore.token
        }
    });
    return response.data;
}

export const authorize = async (username, password) => {
    const response = await axios.post('http://localhost:1080/api/authorization', {
        username,
        password
    });
    return response.data;
}


export const deleteNote = async (title) => {
    const response = await axios.delete('http://localhost:1080/api/internal/note/delete', {
        headers: {
            'x-auth-token': tokenStore.token
        },
        data: { title }
    });
    return response.data;
}

export const saveNote = async (title,content) => {
    const response = await axios.delete('http://localhost:1080/api/internal/note/save', {
        headers: {
            'x-auth-token': tokenStore.token
        },
        data: { title, content }
    });
    return response.data;
}


