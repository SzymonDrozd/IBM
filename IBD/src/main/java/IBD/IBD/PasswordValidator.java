package IBD.IBD;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import IBD.IBD.model.User;

@Component
public class PasswordValidator implements Validator{
	
    @Override
    public boolean supports(Class clazz) {
        return User.class.isAssignableFrom(clazz);
    }

    public void validate(Object target, Errors errors) {
        User user = (User)target;
        String password = user.getPassword();
        String confPassword = user.getConfirmPassword();

        if(!password.equals(confPassword)){
            errors.rejectValue("password","error.user", "Password not confirmed (mismatch)");
        }
    }

}
