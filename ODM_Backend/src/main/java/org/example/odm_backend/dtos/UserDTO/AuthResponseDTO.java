package org.example.odm_backend.dtos.UserDTO;

public record AuthResponseDTO(
        String accessToken,
        String refreshToken
) {
}
