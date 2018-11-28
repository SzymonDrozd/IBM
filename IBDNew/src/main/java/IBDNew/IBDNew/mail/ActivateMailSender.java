package IBDNew.IBDNew.mail;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import IBDNew.IBDNew.model.User;
import IBDNew.IBDNew.passwordhash.PasswordHash;

public class ActivateMailSender {
	
	public static void sendActivationMail(User user) {
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.socketFactory.port", "465");
		props.put("mail.smtp.socketFactory.class",
				"javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "465");

		Session session = Session.getDefaultInstance(props,
			new javax.mail.Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication("miszczek5@gmail.com","ratata456");
				}
			});

		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("miszczek5@gmail.com"));
			message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(user.getEmail()));
			message.setSubject("Activation Link");
			String link = "<a href=\"www.abc.com/activation/"+user.getId() + PasswordHash.get_SHA_512_SecurePassword(user.getEmail(), "ibd")+"\">click here</a>";
//			message.setText("Dear Mail Crawler," +
//					"\n\n No spam to my email, please!");
			message.setContent(link,"text/html");

			Transport.send(message);

			System.out.println("Done");

		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
		
	}

}
