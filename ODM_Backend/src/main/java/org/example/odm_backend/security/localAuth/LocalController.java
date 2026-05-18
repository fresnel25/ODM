package org.example.odm_backend.security.localAuth;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.UserDTO.LocalAuthRequestDTO;
import org.example.odm_backend.dtos.UserDTO.LocalAuthResponseDTO;
import org.example.odm_backend.dtos.UserDTO.UserRequestDTO;
import org.example.odm_backend.dtos.UserDTO.UserResponseDTO;
import org.example.odm_backend.services.serviceInterface.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class LocalController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LocalAuthResponseDTO> login(
            @RequestBody LocalAuthRequestDTO dto
    ) {
        return ResponseEntity.ok(userService.login(dto));
    }

    @PostMapping("/register")
    public UserResponseDTO create(@RequestBody UserRequestDTO dto) {
        return userService.create(dto);
    }
}
