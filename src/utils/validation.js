export const checkValidData=(email, password)=>{

    isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);  //either return true or false
    isPasswordValid =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/.test(password);
    if(!isEmailValid) return "Email ID is not vaild";
    if(!isPasswordValid) return "Password is not vaild";

    return null;
}