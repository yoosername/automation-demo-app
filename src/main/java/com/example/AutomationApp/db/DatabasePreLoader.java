package com.example.AutomationApp.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.AutomationApp.models.Automation;
import com.example.AutomationApp.models.AutomationRepository;

@Component
public class DatabasePreLoader implements CommandLineRunner {

	private final AutomationRepository repository;

	@Autowired
	public DatabasePreLoader(AutomationRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new Automation("If this then that"));
		this.repository.save(new Automation("If that then this"));
		this.repository.save(new Automation("If something happens then do something"));
		this.repository.save(new Automation("If data looks like x then email everyone!"));
	}
}
