import axios from 'axios';
import {tokenStore} from '../main';


export const getNoteList = async () => {
    const response = await axios.get('/api/internal/note/list', {
        headers: {
            'x-auth-token': tokenStore.token
        }
    });
    return response.data;
}

export const authorize = async (username, password) => {
    const response = await axios.post('/api/authorize', {
        username,
        password
    });
    return response.data;
}


export const deleteNote = async (title) => {
    const response = await axios.delete('/api/internal/note/delete', {
        headers: {
            'x-auth-token': tokenStore.token
        },
        data: {title}
    });
    return response.data;
}

export const saveNote = async (title, content) => {
    const response = await axios.post('/api/internal/note/save', {
        data: {title, content}
    }, {
        headers: {
            'x-auth-token': tokenStore.token
        }
    });
    return response.data;
}

export const getContent = async (title) => {
    const response = await axios.post('/api/internal/note/content', {
            data: {title}
        },
        {
            headers: {
                'x-auth-token': tokenStore.token
            }
        });
    return response.data;
}
