package org.example.odm_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.common.ApiResponse;
import org.example.odm_backend.dtos.UserDTO.*;
import org.example.odm_backend.entities.User;
import org.example.odm_backend.exceptions.ValidationException;
import org.example.odm_backend.repositories.UserRepository;
import org.example.odm_backend.security.config.SecurityUtils;
import org.example.odm_backend.services.serviceInterface.FileStorageService;
import org.example.odm_backend.services.serviceInterface.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final SecurityUtils securityUtils;
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponseDTO>> updateUserProfile(@PathVariable Long id, @RequestBody UserRequestDTO dto) {
        UserResponseDTO result = userService.updateUserProfile(id, dto);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Profil mis à jour",
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
    public ResponseEntity<ApiResponse<Page<UserResponseDTO>>> getUserFilter(@RequestParam(required = false) String search, Pageable pageable) {
        Page<UserResponseDTO> page =  userService.search(search, pageable);
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
                        "Utilisateur mis à jour",
                        result,
                        null
                )
        );
    }

    @PostMapping("/signature")
    public ResponseEntity<?> uploadSignature(@RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {throw new ValidationException("Fichier signature vide");}
        User user = securityUtils.getCurrentUserEntity();
        String path = fileStorageService.save(file, "signatures");
        user.setSignatureName(path);
        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Signature uploadée avec succès",
                        "path", path
                )
        );
    }
}