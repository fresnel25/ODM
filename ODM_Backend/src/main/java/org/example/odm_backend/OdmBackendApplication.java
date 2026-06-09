package org.example.odm_backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.Arrays;

@SpringBootApplication
@EnableJpaAuditing
public class OdmBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(OdmBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner debugEnv(Environment env) {
        return args -> {
            System.out.println("ACTIVE PROFILES = " + Arrays.toString(env.getActiveProfiles()));
        };
    }

    @Bean
    CommandLineRunner debugMail(Environment env) {
        return args -> {
            System.out.println("MAIL HOST = " + env.getProperty("spring.mail.host"));
        };
    }

}
