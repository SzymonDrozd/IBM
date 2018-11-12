package IBD.IBD.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import IBD.IBD.repository.UserDao;
import IBD.IBD.service.UserService;
import IBD.IBD.model.User;

@Service("userServiceImpl")
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

    UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setPassword(passwordEncoder.encode(user.getConfirmPassword()));
        return userDao.save(user);
    }

    @Override
    public User update(User user) {
    	return userDao.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userDao.findOneByEmail(email);
    }

    @Override
    public User getUserById(Long id) {
    	User user =  userDao.findOneById(id);

    	if (user == null) {
    		throw new UsernameNotFoundException(Long.toString(id));
    	}

    	return user;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userDao.findOneByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(email);
        }
        return user;
    }

}
