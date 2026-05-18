package org.example.odm_backend.security.casAuth;

import lombok.RequiredArgsConstructor;
import org.apereo.cas.client.validation.*;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CasTicketValidator {

    private final CasProperties properties;

    public String validate(String ticket) {
        TicketValidator ticketValidator = new Cas30ServiceTicketValidator(properties.getServerUrl());

        try {
            Assertion assertion = ticketValidator.validate(ticket, properties.getServiceUrl());
            return assertion.getPrincipal().getName();
        } catch (TicketValidationException e) {
            throw new RuntimeException("Ticket CAS invalide");
        }
    }
}