package org.example.odm_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class OdmBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(OdmBackendApplication.class, args);
    }

}
