package IBDNew.IBDNew.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import IBDNew.IBDNew.model.User;
import IBDNew.IBDNew.service.UserService;

@RestController
public class LoginController {
	
	@Autowired
	private UserService userService;
	@CrossOrigin 
	@RequestMapping(method = RequestMethod.POST, value = "/login")
	public User loginUser(@RequestBody User user) {
		User userLogin = userService.findUser(user);
		userLogin.setPassword("");
		userLogin.setConfirmPassword("");
		return userLogin;
	}
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, value = "/getuser/{userId}")
	public User updateLesson(@PathVariable String userId) {
		User user = userService.getUserById(Long.parseLong(userId));
		user.setPassword("");
		user.setConfirmPassword("");
		return user;
		
	}

}
