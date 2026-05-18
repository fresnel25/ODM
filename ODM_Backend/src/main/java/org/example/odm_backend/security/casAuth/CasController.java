package org.example.odm_backend.security.casAuth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/cas")
@RequiredArgsConstructor
public class CasController {

    private final CasAuthenticationService casService;
    private final CasTicketValidator ticketValidator;
    private final CasProperties casProperties;

    @GetMapping("/callback")
    public ResponseEntity<?> callback(@RequestParam String ticket) {
        String email = ticketValidator.validate(ticket);
        String jwt = casService.authenticateCasUser(email);

        return ResponseEntity.ok( Map.of("token", jwt));
    }

    @GetMapping("/login")
    public ResponseEntity<?> login() {
        String redirectUrl = casProperties.getServerUrl() + "/login?service=" + URLEncoder.encode(casProperties.getServiceUrl(), StandardCharsets.UTF_8);
        return ResponseEntity.ok(redirectUrl);
    }
}