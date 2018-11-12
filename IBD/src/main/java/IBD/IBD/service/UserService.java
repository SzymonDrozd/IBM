package IBD.IBD.service;

import java.util.List;

import IBD.IBD.model.User;

public interface UserService {
    User save(User user);
    User update(User user);
    List<User> getAllUsers();
    User getUserByEmail(String email);
    User getUserById(Long id);

}
