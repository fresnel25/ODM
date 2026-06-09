package org.example.odm_backend.security.casAuth;

import lombok.RequiredArgsConstructor;
import org.apereo.cas.client.validation.*;
import org.example.odm_backend.dtos.UserDTO.CasAuthRequestDTO;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CasTicketValidator {

    private final CasProperties properties;

    public CasAuthRequestDTO validate(String ticket) {

        TicketValidator ticketValidator =
                new Cas30ServiceTicketValidator(properties.getServerUrl());

        try {

            Assertion assertion = ticketValidator.validate(ticket, properties.getServiceUrl());

            var principal = assertion.getPrincipal();

            String loginCas = principal.getName();

            String email = (String) principal.getAttributes().getOrDefault("mail", null);

            String firstName = (String) principal.getAttributes().getOrDefault("givenName", null);

            String lastName = (String) principal.getAttributes().getOrDefault("sn", null);

            return new CasAuthRequestDTO(
                    loginCas,
                    email,
                    firstName,
                    lastName
            );

        } catch (TicketValidationException e) {
            throw new RuntimeException("Ticket CAS invalide");
        }
    }
}