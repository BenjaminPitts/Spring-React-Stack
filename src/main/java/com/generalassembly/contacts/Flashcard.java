package com.generalassembly.contacts;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Flashcard {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;

  private String question;

  private String tips;

  private String answer;

  private String examples;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getQuestion() {
    return question;
  }

  public void setQuestion(String question) {
    this.question = question;
  }

  public String getTips() {
    return tips;
  }

  public void setTips(String tips) {
    this.tips = tips;
  }

  public String getAnswer() {
    return answer;
  }

  public void setAnswer(String answer) {
    this.answer = answer;
  }

  public String getExamples() {
    return examples;
  }

  public void setExamples(String examples) {
    this.examples = examples;
  }
}
