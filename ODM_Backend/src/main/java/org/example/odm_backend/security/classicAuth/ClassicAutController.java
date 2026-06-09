package org.example.odm_backend.security.classicAuth;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.common.ApiResponse;
import org.example.odm_backend.dtos.UserDTO.*;
import org.example.odm_backend.entities.User;
import org.example.odm_backend.mappers.UserMapper;
import org.example.odm_backend.repositories.UserRepository;
import org.example.odm_backend.security.config.CustomUserDetails;
import org.example.odm_backend.security.config.SecurityUtils;
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
    private final SecurityUtils securityUtils;
    private final UserMapper userMapper;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponseDTO>> create(@RequestBody UserRequestDTO dto) {
        UserResponseDTO result = userService.create(dto);
        return ResponseEntity.status(201).body(
                new ApiResponse<>(
                        true,
                        "Utilisateur créé avec succès",
                        result,
                        null
                )
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<ClassicAuthResponseDTO>> login(@RequestBody ClassicAuthRequestDTO dto) {

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
                .body(new ApiResponse<>(
                        true,
                        "Connecté avec succès",
                        response,
                        null
                ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> refresh(@CookieValue(value = "refreshToken", required = false) String token) {

        if (token == null) {
            return ResponseEntity.status(401).body(
                    new ApiResponse<>(
                            false,
                            "Refresh token manquant",
                            null,
                            null
                    )
            );
        }

        RefreshToken oldToken = refreshTokenService.verifyToken(token);

        // revoke ancien token
        oldToken.setRevoked(true);
        refreshTokenRepository.save(oldToken);

        // nouveau refresh token
        RefreshToken newToken =
                refreshTokenService.createRefreshToken(oldToken.getUser());

        // nouvel access token
        String accessToken = jwtService.generateToken(oldToken.getUser());

        // nouveau cookie
        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", newToken.getToken())
                .httpOnly(true)
                .secure(false) // true en prod HTTPS
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Lax")
                .build();

        AuthResponseDTO authResponse = new AuthResponseDTO(accessToken, null);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(
                        new ApiResponse<>(
                                true,
                                "Token rafraîchi avec succès",
                                authResponse,
                                null
                        )
                );
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@CookieValue(value = "refreshToken", required = false) String token) {

        if (token != null) {
            refreshTokenService.revokeToken(token);
        }

        // suppression cookie navigateur
        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        ApiResponse<Void> response = new ApiResponse<>(
                true,
                "Déconnexion réussie",
                null,
                null
        );

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                .body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponseDTO>> me() {

        CustomUserDetails current = securityUtils.getCurrentUser();

        UserResponseDTO result = userMapper.toResponse(current.getUser());

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Utilisateur connecté",
                        result,
                        null
                )
        );
    }
}
