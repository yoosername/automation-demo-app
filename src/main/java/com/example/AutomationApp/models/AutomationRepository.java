package com.example.AutomationApp.models;

import org.springframework.data.repository.CrudRepository;

public interface AutomationRepository extends CrudRepository<Automation, Long> {

	@Override
	void deleteById(Long aLong);

}
