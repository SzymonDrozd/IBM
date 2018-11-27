package IBDNew.IBDNew.service.imp;

import org.springframework.beans.factory.annotation.Autowired;   
import org.springframework.stereotype.Service;

import IBDNew.IBDNew.model.User;
import IBDNew.IBDNew.repository.UserDao;
import IBDNew.IBDNew.service.UserService;

import javax.transaction.Transactional;
import java.util.List;


@Service("userServiceImpl")
@Transactional
public class UserServiceImpl implements UserService {

    UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public User save(User user) {
        user.setPassword(user.getPassword());
        user.setPassword(user.getConfirmPassword());
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
    		return null;
    	}

    	return user;
    }

	@Override
	public User findUser(User user) {
		User newUser = userDao.findOneByEmail(user.getEmail());
		if(newUser.getPassword().equals(user.getPassword())) {
			return newUser;
		}else
			return null;
	}

//    @Override
//    public UserDetails loadUserByUsername(String email) {
//        User user = userDao.findOneByEmail(email);
//        if (user == null) {
//            throw new UsernameNotFoundException(email);
//        }
//        return user;
//    }

}
