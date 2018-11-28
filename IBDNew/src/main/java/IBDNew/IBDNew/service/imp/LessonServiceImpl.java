package IBDNew.IBDNew.service.imp;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import IBDNew.IBDNew.model.Lesson;
import IBDNew.IBDNew.repository.LessonDao;
import IBDNew.IBDNew.service.LessonService;

@Service("lessonServiceImpl")
@Transactional
public class LessonServiceImpl implements LessonService {
	LessonDao lessonDao;

	@Autowired
	public LessonServiceImpl(LessonDao lessonDao) {
		this.lessonDao = lessonDao;
	}

	@Override
	public Lesson save(Lesson lesson) {
		return lessonDao.save(lesson);

	}

	@Override
	public Lesson update(Lesson lesson) {
		return lessonDao.save(lesson);

	}

	@Override
	public Lesson getLessonById(Long id) {
		Lesson lesson = lessonDao.findOneById(id);

		if (lesson == null) {
			return null;
		}
		return lesson;
	}

	@Override
	public List<Lesson> getLessonByStudentId(Long id) {
		List<Lesson> list = lessonDao.findByStudentId(id);
		if (list == null) {
			return null;
		}
		return list;
	}

	@Override
	public List<Lesson> getLessonByAuthorId(Long id) {
		List<Lesson> list = lessonDao.findByAuthorId(id);
		if (list == null) {
			return null;
		}
		return list;
	}

	@Override
	public List<Lesson> getLessons() {
		return lessonDao.findAll();
	}

}
