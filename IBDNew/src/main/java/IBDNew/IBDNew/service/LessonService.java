package IBDNew.IBDNew.service;

import IBDNew.IBDNew.model.Lesson;

public interface LessonService {
	Lesson save(Lesson lesson);
	Lesson update(Lesson lesson);
    Lesson getLessonById(Long id);
    Lesson getLessonByStudentId(Long id);
    Lesson getLessonByAuthorId(Long id);




}
