package IBDNew.IBDNew.repository;

import IBDNew.IBDNew.model.Lesson;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Transactional
@Repository("lessonRepository")
public interface LessonDao extends JpaRepository<Lesson,Long>{
    Lesson findOneById(Long id);
    Lesson findOneByAuthorId(Long authorId);
    Lesson findOneByStudentId(Long studentId);


}
