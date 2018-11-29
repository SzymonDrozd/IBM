package IBDNew.IBDNew.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import IBDNew.IBDNew.model.Lesson;
import IBDNew.IBDNew.model.User;
import IBDNew.IBDNew.service.LessonService;

@RestController
public class LessonController {

	@Autowired
	LessonService lessonService;

	@RequestMapping(method = RequestMethod.POST, value = "/addlesson")
	public boolean addLesson(@RequestBody Lesson lesson) {
		Lesson newLesson = lessonService.save(lesson);
		if (newLesson != null)
			return true;
		else
			return false;

	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/getlesson")
	public List<Lesson> getLesson(@RequestBody User user) {
		if(user.getStatus().equals("student")) {
			return lessonService.getLessonByStudentId(user.getId());
		}else {
			return lessonService.getLessonByAuthorId(user.getId());
		}
		
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/getalllessons")
	public List<Lesson> getLesson() {
		return lessonService.getLessons();
		
	}
	@RequestMapping(method = RequestMethod.POST, value = "/updatelesson")
	public void updateLesson(@RequestBody Lesson lesson) {
		lessonService.update(lesson);
		
	}
	


}
