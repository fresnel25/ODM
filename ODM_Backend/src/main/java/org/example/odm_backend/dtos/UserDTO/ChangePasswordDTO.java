package org.example.odm_backend.dtos.UserDTO;

public record ChangePasswordDTO(
        String oldPassword,
        String newPassword
) {}