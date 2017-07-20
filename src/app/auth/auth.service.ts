import * as firebase from 'firebase';

export class AuthService {
    recaptchaVerifier:firebase.auth.RecaptchaVerifier;
    confirmationResult2:any = "";

    reCaptchaVerify(){
        console.log("recaptcha##1");
        this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-up-button', 
        {
          'size': 'invisible',
          'callback': function(response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log("callback");
            }
        
        });
        
        this.recaptchaVerifier.render().then(function() {
          //window.recaptchaWidgetId = widgetId;
          //updateSignInButtonUI();
          console.log("Render##1.1");
        });
        
    return this.recaptchaVerifier;
}
  
    signupUserwithPhone(phone:string, recaptchaVerifier) {
        console.log("signup-PHONE-1");
        //const recaptchaVerifier=this.reCaptchaVerify();
        let self=this;

        firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier)
            .then(
                 function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
                  self.confirmationResult2 = confirmationResult;
                 console.log(confirmationResult)
                   
            })
            .catch(
                error => console.log(error)
            )
    }

    verifySMSCode(code:string){
    this.confirmationResult2.confirm(code).then(function (result) {
      // User signed in successfully.
        var user = result.user;
      // ...
      console.log("Successful Signin");

        }).catch(function (error) {
          // User couldn't sign in (bad verification code?)
          // ...
          error => console.log("User could not signin:"+error)
});
    }

    signupUserwithEmail(email:string, password:string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            )
    }

    signinUser(email:string, password:string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => console.log(response)
            )
            .catch(
                error => console.log(error)
            )
    }
}