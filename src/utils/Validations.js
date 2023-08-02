export const isValidEmail = (stringEmail) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(stringEmail);
}

export const isValidPassword = (stringPassword) =>{
    let reg = /^(?=.*?[A-Za-z0-9#!@$%^&*()+=])\S{6,20}$/;
    return reg.test(stringPassword);
}

export const isValidUsername = (stringUsername) => {
    let reg = /^[a-zA-Z0-9]{4,10}$/;
    return reg.test(stringUsername);
}