package org.example.odm_backend.security.casAuth;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.UserDTO.CasAuthRequestDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/cas")
@RequiredArgsConstructor
public class CasAuthController {

    @Value("${app.frontend-url}")
    private String frontendUrl;

    private final CasAuthenticationService casService;
    private final CasTicketValidator ticketValidator;
    private final CasProperties casProperties;

    @GetMapping("/callback")
    public void callback(@RequestParam String ticket, HttpServletResponse response) throws IOException {

        CasAuthRequestDTO casUser = ticketValidator.validate(ticket);
        String jwt = casService.authenticateCasUser(casUser);
        String redirectUrl = frontendUrl + "/auth/cas?token=" + jwt;

        response.sendRedirect(redirectUrl);
    }

    @GetMapping("/login")
    public void login(HttpServletResponse response) throws IOException {
        String url = casProperties.getServerUrl() + "/login?service=" + URLEncoder.encode(casProperties.getServiceUrl(), StandardCharsets.UTF_8);
        response.sendRedirect(url);
    }
}