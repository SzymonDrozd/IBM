package IBD.IBD.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import IBD.IBD.PasswordValidator;
import IBD.IBD.service.UserService;
import IBD.IBD.model.User;

@RequestMapping(value = "/registration")
@Controller
public class RegistrationController {

	@Autowired
	private UserService userService;

	@Autowired
	PasswordValidator passwordValidator;

	@RequestMapping(method = RequestMethod.GET)
	public String register(Model model) {
		model.addAttribute("user", new User());
		return "registration";
	}

	@RequestMapping(method = RequestMethod.POST)
	public String registerAddNewUser(@Valid User user, BindingResult bindingResult) {
		User userExists = userService.getUserByEmail(user.getEmail());
		passwordValidator.validate(user, bindingResult);

		if (userExists != null) {
			bindingResult.rejectValue("email", "error.user",
					"There is already a user registered with the email provided!");
		}

		if (bindingResult.hasErrors()) {
			return ("registration");
		} else {
			userService.save(user);
			return "login";
		}
	}

}
