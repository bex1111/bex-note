export const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export const getCookie = (name) => {
    name = name + "=";
    let properties = document.cookie.split(';');
    for (let i = 0; i < properties.length; i++) {
        let property = properties[i];
        while (property.charAt(0) === ' ') {
            property = property.substring(1);
        }
        if (property.indexOf(name) === 0) {
            return property.substring(name.length, property.length);
        }
    }
    return null;
}

export const eraseCookie = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}