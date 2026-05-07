package org.example.odm_backend.services.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.UserDTO.UserFilterDTO;
import org.example.odm_backend.dtos.UserDTO.UserRequestDTO;
import org.example.odm_backend.dtos.UserDTO.UserResponseDTO;
import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.entities.User;
import org.example.odm_backend.enums.Role;
import org.example.odm_backend.exceptions.DuplicateResourceException;
import org.example.odm_backend.exceptions.NotFoundException;
import org.example.odm_backend.repositories.EquipeRepository;
import org.example.odm_backend.repositories.UserRepository;
import org.example.odm_backend.services.serviceInterface.UserService;
import org.example.odm_backend.mappers.UserMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final EquipeRepository equipeRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDTO create(UserRequestDTO dto) {

        if (userRepository.existsByEmail(dto.email())) {
            throw new DuplicateResourceException("Email déjà utilisé");
        }

        User user = userMapper.toEntity(dto);

        // password
        user.setPasswd(passwordEncoder.encode(dto.password()));

        // équipe
        if (dto.equipeId() != null) {
            Equipe equipe = equipeRepository.findById(dto.equipeId())
                    .orElseThrow(() -> new NotFoundException("Equipe non trouvée"));
            user.setEquipe(equipe);
        }

        // valeurs par défaut
        user.setActif(true);
        user.setRole(Role.USER);

        user = userRepository.save(user);

        return userMapper.toResponse(user);
    }

    @Override
    public UserResponseDTO update(Long id, UserRequestDTO dto) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User non trouvé"));

        // mapper partiel
        userMapper.updateUserFromDto(dto, user);

        // password (optionnel)
        if (dto.password() != null && !dto.password().isBlank()) {
            user.setPasswd(passwordEncoder.encode(dto.password()));
        }

        // équipe
        if (dto.equipeId() != null) {
            Equipe equipe = equipeRepository.findById(dto.equipeId())
                    .orElseThrow(() -> new NotFoundException("Equipe non trouvée"));
            user.setEquipe(equipe);
        }

        user = userRepository.save(user);

        return userMapper.toResponse(user);
    }

    @Override
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new NotFoundException("User non trouvé");
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserResponseDTO getById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User non trouvé"));

        return userMapper.toResponse(user);
    }

    @Override
    public Page<UserResponseDTO> search(UserFilterDTO filter, Pageable pageable) {
        return userRepository.searchUsers(
                filter.firstName(),
                filter.name(),
                filter.email(),
                filter.personnelType(),
                filter.equipeId(),
                filter.grade(),
                pageable
        ).map(userMapper::toResponse);
    }

}