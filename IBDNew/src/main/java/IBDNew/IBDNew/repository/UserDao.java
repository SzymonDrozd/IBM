package IBDNew.IBDNew.repository;

import org.springframework.data.jpa.repository.JpaRepository; 
import org.springframework.stereotype.Repository;

import IBDNew.IBDNew.model.User;

import javax.transaction.Transactional;

@Transactional
@Repository("userRepository")
public interface UserDao extends JpaRepository<User,Long> {
    User findOneByEmail(String email);
    User findOneById(Long id);
}
