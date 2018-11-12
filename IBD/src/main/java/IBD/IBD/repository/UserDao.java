package IBD.IBD.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

import IBD.IBD.model.User;

@Transactional
@Repository("userRepository")
public interface UserDao extends JpaRepository<User,Long> {
    User findOneByEmail(String email);
    User findOneById(Long id);
}
