import axios from 'axios';
import {loadStore, notificationStore, tokenStore} from '../main';


const errorHandler = async (error) => {
    if (error.response.status === 403) {
        tokenStore.resetToken();
    }
    notificationStore.$patch({
        type: 'error',
        message: error.response.data.error
    });
    return Promise.reject(error);
}

const enableLoading = () => {
    loadStore.$patch({
        loading: true
    });
}

const disableLoading = () => {
    loadStore.$patch({
        loading: false
    });
}

const executeRequest = async (requestFunction) => {
    enableLoading()
    try {
        return await requestFunction();
    } catch (error) {
        return errorHandler(error);
    } finally {
        disableLoading()
    }
}

export const getNoteList = async () => {
    return executeRequest(async () => {
        const response = await axios.get('/api/internal/note/list', {
            headers: {
                'x-auth-token': tokenStore.token
            }
        });
        return response.data;
    });

}

export const authorize = async (username, password) => {
    return executeRequest(async () => {
        const response = await axios.post('/api/authorize', {
            username,
            password
        });
        return response.data;
    })
}


export const deleteNote = async (title) => {
    return executeRequest(async () => {
        await axios.delete('/api/internal/note/delete', {
            headers: {
                'x-auth-token': tokenStore.token
            },
            data: {title}
        });
    })
}

export const saveNote = async (title, content) => {
    return executeRequest(async () => {
        await axios.post('/api/internal/note/save', {
            title, content
        }, {
            headers: {
                'x-auth-token': tokenStore.token
            }
        });
    })
}

export const getContent = async (title) => {
    return executeRequest(async () => {
        const response = await axios.post('/api/internal/note/content', {
                title
            },
            {
                headers: {
                    'x-auth-token': tokenStore.token
                }
            });
        return response.data;
    })
}


