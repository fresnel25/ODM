package org.example.odm_backend.security.classicAuth;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.UserDTO.*;
import org.example.odm_backend.entities.User;
import org.example.odm_backend.repositories.UserRepository;
import org.example.odm_backend.security.token.jwtToken.JwtService;
import org.example.odm_backend.security.token.refreshToken.RefreshToken;
import org.example.odm_backend.security.token.refreshToken.RefreshTokenRepository;
import org.example.odm_backend.security.token.refreshToken.RefreshTokenService;
import org.example.odm_backend.services.serviceInterface.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class ClassicAutController {

    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public UserResponseDTO create(@RequestBody UserRequestDTO dto) {
        return userService.create(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<ClassicAuthResponseDTO> login(@RequestBody ClassicAuthRequestDTO dto) {

        ClassicAuthResponseDTO response = userService.login(dto);

        User user = userRepository.findById(response.userId())
                .orElseThrow();

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken.getToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refresh(@CookieValue(value = "refreshToken", required = false) String token) {

        if (token == null) {return ResponseEntity.status(401).build();}
        RefreshToken oldToken = refreshTokenService.verifyToken(token);

        // revoke old token
        oldToken.setRevoked(true);
        refreshTokenRepository.save(oldToken);

        // create new refresh token
        RefreshToken newToken = refreshTokenService.createRefreshToken(oldToken.getUser());

        // generate new access token
        String accessToken = jwtService.generateToken(oldToken.getUser());

        // cookie refresh token
        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", newToken.getToken())
                .httpOnly(true)
                .secure(false) // true en production (HTTPS)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(new AuthResponseDTO(accessToken, null)); // refresh token pas exposé
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue("refreshToken") String token) {
        refreshTokenService.revokeToken(token);
        return ResponseEntity.ok().build();
    }
}
