package IBDNew.IBDNew.controllers;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

	@CrossOrigin
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

	@CrossOrigin
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

	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, value = "/captcha/{captcha}")
	public boolean captchaTest(@PathVariable String captcha) {
		String secretKey = "6LdcU34UAAAAAIChj31Vgj8LebbZlTtIDTwuW9ZQ";
		String url = "https://www.google.com/recaptcha/api/siteverify";
		HttpURLConnection conn = null;
		try {
			String data = "secret=" + secretKey + "&response=" + captcha;
			byte[] postData = data.getBytes(StandardCharsets.UTF_8);
			int postDataLength = postData.length;
			URL uri = new URL(url);
			conn = (HttpURLConnection) uri.openConnection();
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			conn.setRequestProperty( "Content-Length", Integer.toString( postDataLength ));
			conn.setUseCaches( false );
			try( DataOutputStream wr = new DataOutputStream( conn.getOutputStream())) {
			   wr.write( postData );
			}
			conn.connect();
			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String inputLine;
			StringBuffer response = new StringBuffer();

			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			String res[] = response.toString().trim().split(",");
			String success [] = res[0].trim().split(":");
			in.close();
			if(success[1].contains("true")) {
				return true;
			}
			else
				return false;
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			conn.disconnect();
		}
		return false;
	}

}
