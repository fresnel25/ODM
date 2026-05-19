package org.example.odm_backend.security.token.refreshToken;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.odm_backend.entities.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    @Value("${app.refresh-expiration}")
    private Long refreshExpiration;

    private final RefreshTokenRepository repository;

    @Transactional
    public RefreshToken createRefreshToken(User user) {

        repository.deleteByUser(user);
        repository.flush();

        RefreshToken token = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(refreshExpiration))
                .revoked(false)
                .build();

        return repository.save(token);
    }

    public RefreshToken verifyToken(String token) {

        RefreshToken refreshToken = repository.findByToken(token)
                .orElseThrow(() ->
                        new RuntimeException("Refresh token introuvable"));

        if (refreshToken.isRevoked()) {
            throw new RuntimeException("Refresh token révoqué");
        }

        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            throw new RuntimeException("Refresh token expiré");
        }

        return refreshToken;
    }

    public void revokeToken(String token) {

        repository.findByToken(token)
                .ifPresent(t -> {
                    t.setRevoked(true);
                    repository.save(t);
                });
    }
}
