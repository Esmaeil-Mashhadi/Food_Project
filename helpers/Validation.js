function validate (data){

    
    const validationResult = {

    }
    

    if(!data.email){
        validationResult.emailMessage = "waiting to fill email input"
        delete  data.emailStatus
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
        validationResult.emailMessage = "Good! but not valid yet"
        delete  data.emailStatus
       
    } else{
        data.emailStatus = "valid" 
    }

     
    if(!data.password){ 
        delete data.passwordStatus
        validationResult.passwordMessage = "set a Password"
    }else if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/.test(data.password)){
        validationResult.passwordMessage = "at Least one uppercase , one special Character and 8 character"
        delete data.passwordStatus

    } else {
         data.passwordStatus = "valid"
    }

    
    if(!data.confirmPassword){

        validationResult.confirmMessage = "Confirm The Password"
        delete data.confirmStatus
        
    } else if(data.confirmPassword !== data.password){
        delete data.confirmStatus
        validationResult.confirmMessage = "Not the same yet"
    } else{
        data.confirmStatus = "valid"
    }

    if(!data.check){
        validationResult.check = "Please Accept our terms and conditions"
    } else{
        data.check = true
    }

  return {validationResult}
   
}

export default validate