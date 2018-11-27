package IBDNew.IBDNew.service;

import java.util.List;

import IBDNew.IBDNew.model.User; 

public interface UserService {
    User save(User user);
    User update(User user);
    List<User> getAllUsers();
    User getUserByEmail(String email);
    User getUserById(Long id);
    User findUser(User user);

}
