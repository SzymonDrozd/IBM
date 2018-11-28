package IBDNew.IBDNew.repository;

import IBDNew.IBDNew.model.Lesson;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Transactional
@Repository("lessonRepository")
public interface LessonDao extends JpaRepository<Lesson,Long>{
    Lesson findOneById(Long id);
    List<Lesson> findByAuthorId(Long authorId);
    List<Lesson> findByStudentId(Long studentId);


}
