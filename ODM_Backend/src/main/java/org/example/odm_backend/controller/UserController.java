package org.example.odm_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.common.ApiResponse;
import org.example.odm_backend.dtos.UserDTO.*;
import org.example.odm_backend.services.serviceInterface.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponseDTO>> updateUserProfile(@PathVariable Long id, @RequestBody UserRequestDTO dto) {
        UserResponseDTO result = userService.updateUserProfile(id, dto);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Utilisateur mis à jour",
                        result,
                        null
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Utilisateur supprimé",
                        null,
                        null
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponseDTO>> getById(@PathVariable Long id) {
        UserResponseDTO result = userService.getById(id);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Utilisateur Récupéré",
                        result,
                        null
                )
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<UserResponseDTO>>> getUserFilter(UserFilterDTO filter, Pageable pageable) {
        Page<UserResponseDTO> page =  userService.search(filter, pageable);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Liste Utilisateurs",
                        page,
                        null
                )
        );
    }

    @PutMapping("/{id}/admin")
    public ResponseEntity<ApiResponse<UserResponseDTO>> updateUserByAdmin(@PathVariable Long id, @RequestBody UserUpdateRequestDTO dto) {
        UserResponseDTO result = userService.updateUserByAdmin(id, dto);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Utilisateur mis à jour par administrateur",
                        result,
                        null
                )
        );
    }
}