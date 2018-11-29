package IBDNew.IBDNew.passwordhash;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class PasswordHash {
	
	public static String get_SHA_512_SecurePassword(String passwordToHash, String   salt){
		String generatedPassword = null;
		    try {
		         MessageDigest md = MessageDigest.getInstance("SHA-512");
		         byte[] bytes = md.digest(passwordToHash.getBytes(StandardCharsets.UTF_8));
		         StringBuilder sb = new StringBuilder();
		         for(int i=0; i< bytes.length ;i++){
		            sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
		         }
		         generatedPassword = sb.toString();
		        } 
		       catch (NoSuchAlgorithmException e){
		        e.printStackTrace();
		       }
		    return generatedPassword;
		}

}
