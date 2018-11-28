package IBDNew.IBDNew.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import IBDNew.IBDNew.mail.ActivateMailSender;
import IBDNew.IBDNew.model.User;
import IBDNew.IBDNew.passwordhash.PasswordHash;
import IBDNew.IBDNew.service.UserService;

@RestController
public class RegistrationController {

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.POST, value = "/register")
	public boolean registerAddNewUser(@RequestBody User user) {
		User userExists = userService.getUserByEmail(user.getEmail());
		if (userExists != null) {
			return false;
		} else {
			userService.save(user);
			ActivateMailSender.sendActivationMail(user);
			return true;
		}
	}

	@RequestMapping(method = RequestMethod.GET, value = "/activation/{hash}")
	public String activation(@PathVariable String hash) {
		String elem[] = hash.split("\\.");
		User newUser = userService.getUserById(Long.parseLong(elem[0]));
		if (PasswordHash.get_SHA_512_SecurePassword(newUser.getEmail(), "ibd").equals(elem[1])) {
			newUser.setActivate(true);
			userService.update(newUser);
			return "Activated";
		} else {
			return "Failed";
		}

	}

}
