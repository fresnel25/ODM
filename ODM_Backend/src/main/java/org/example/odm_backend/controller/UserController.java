package org.example.odm_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.UserDTO.UserFilterDTO;
import org.example.odm_backend.dtos.UserDTO.UserRequestDTO;
import org.example.odm_backend.dtos.UserDTO.UserResponseDTO;
import org.example.odm_backend.services.serviceInterface.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public UserResponseDTO create(@RequestBody UserRequestDTO dto) {
        return userService.create(dto);
    }

    @PutMapping("/{id}")
    public UserResponseDTO update(@PathVariable Long id,
                                  @RequestBody UserRequestDTO dto) {
        return userService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }

    @GetMapping("/{id}")
    public UserResponseDTO getById(@PathVariable Long id) {
        return userService.getById(id);
    }

    @GetMapping
    public Page<UserResponseDTO> getUserFilter(UserFilterDTO filter, Pageable pageable) {
        return userService.search(filter, pageable);
    }
}