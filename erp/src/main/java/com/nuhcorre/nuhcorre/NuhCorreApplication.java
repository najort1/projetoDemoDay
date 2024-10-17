package com.nuhcorre.nuhcorre;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.TimeZone;

@SpringBootApplication
@EnableJpaAuditing
@EnableWebSecurity
@EnableScheduling
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NuhCorreApplication {

	@PostConstruct
	public void started() {
		TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_Paulo"));
	}

	public static void main(String[] args) {
		SpringApplication.run(NuhCorreApplication.class, args);
	}

}