package IBDNew.IBDNew.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import IBDNew.IBDNew.model.User;
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
			return true;
		}
	}

}
