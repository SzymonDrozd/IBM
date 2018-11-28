package IBDNew.IBDNew.service;

import java.util.List;

import IBDNew.IBDNew.model.Lesson;

public interface LessonService {
	Lesson save(Lesson lesson);
	Lesson update(Lesson lesson);
    Lesson getLessonById(Long id);
    List<Lesson> getLessonByStudentId(Long id);
    List<Lesson> getLessonByAuthorId(Long id);
    List<Lesson> getLessons();




}
