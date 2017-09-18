package com.example.AutomationApp.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Automation {

	private @Id @GeneratedValue Long id;
	private String name;

	private Automation() {}

	public Automation(String name) {
		this.name = name;
	}
}
