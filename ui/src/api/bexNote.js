import axios from 'axios';
import {notificationStore, tokenStore} from '../main';


const errorHandler = async (error) => {
    notificationStore.$patch({
        type: 'error',
        message: error.response.data.error
    });
    return Promise.reject(error);
}

export const getNoteList = async () => {
    try {
        const response = await axios.get('/api/internal/note/list', {
            headers: {
                'x-auth-token': tokenStore.token
            }
        });
        return response.data;
    } catch (error) {
        return errorHandler(error);
    }
}

export const authorize = async (username, password) => {
    try {
        const response = await axios.post('/api/authorize', {
            username,
            password
        });
        return response.data;
    } catch (error) {
        return errorHandler(error);
    }
}


export const deleteNote = async (title) => {
    try {
        await axios.delete('/api/internal/note/delete', {
            headers: {
                'x-auth-token': tokenStore.token
            },
            data: {title}
        });
    } catch (error) {
        return errorHandler(error);
    }
}

export const saveNote = async (title, content) => {
    try {
         await axios.post('/api/internal/note/save', {
            title, content
        }, {
            headers: {
                'x-auth-token': tokenStore.token
            }
        });
    } catch (error) {
        return errorHandler(error);
    }
}

export const getContent = async (title) => {
    try {
        const response = await axios.post('/api/internal/note/content', {
                title
            },
            {
                headers: {
                    'x-auth-token': tokenStore.token
                }
            });
        return response.data;
    } catch (error) {
        return errorHandler(error);
    }
}


