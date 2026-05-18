package org.example.odm_backend.services.serviceInterface;

import org.example.odm_backend.dtos.UserDTO.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    UserResponseDTO create(UserRequestDTO dto);
    UserResponseDTO update(Long id, UserRequestDTO dto);
    void delete(Long id);
    UserResponseDTO getById(Long id);
    // List<UserResponseDTO> getAll();
    Page<UserResponseDTO> search(UserFilterDTO filter, Pageable pageable);
    LocalAuthResponseDTO login(LocalAuthRequestDTO dto);
}
