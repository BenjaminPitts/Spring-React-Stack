package com.generalassembly.contacts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
@RestController
public class ContactsApplication {
	@Autowired
	private FlashcardRepository flashcardsRepository;

	public static void main(String[] args) {
		SpringApplication.run(ContactsApplication.class, args);
	}

	@GetMapping("/flashcards")
	public Iterable<Flashcard> index() {
		return flashcardsRepository.findAll();
	}

	@PostMapping("/flashcards")
	public Iterable<Flashcard> create (@RequestBody Flashcard flashcardsData) {
		flashcardsRepository.save(flashcardsData);
		return flashcardsRepository.findAll();
	}

	@DeleteMapping("/flashcards/{id}")
	public Iterable<Flashcard> delete(@PathVariable int id) {
		flashcardsRepository.deleteById(id);
		return flashcardsRepository.findAll();
	}

	@PutMapping("/flashcards/{id}")
	public Iterable<Flashcard> update(@PathVariable int id, @RequestBody Flashcard flashcardsData) {
		flashcardsData.setId(id);
		flashcardsRepository.save(flashcardsData);
		return flashcardsRepository.findAll();
	}

}
