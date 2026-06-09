package org.example.odm_backend.services.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.UserDTO.*;
import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.entities.User;
import org.example.odm_backend.enums.AuthProvider;
import org.example.odm_backend.enums.Role;
import org.example.odm_backend.exceptions.DuplicateResourceException;
import org.example.odm_backend.exceptions.NotFoundException;
import org.example.odm_backend.exceptions.ValidationException;
import org.example.odm_backend.repositories.EquipeRepository;
import org.example.odm_backend.repositories.UserRepository;
import org.example.odm_backend.security.config.CustomUserDetails;
import org.example.odm_backend.security.config.SecurityUtils;
import org.example.odm_backend.security.token.jwtToken.JwtService;
import org.example.odm_backend.security.token.refreshToken.RefreshToken;
import org.example.odm_backend.security.token.refreshToken.RefreshTokenService;
import org.example.odm_backend.services.serviceInterface.UserService;
import org.example.odm_backend.mappers.UserMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final EquipeRepository equipeRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final SecurityUtils securityUtils;

    @Override
    public UserResponseDTO create(UserRequestDTO dto) {

        if (userRepository.existsByEmail(dto.email())) {
            throw new DuplicateResourceException("Email déjà utilisé");
        }
        if (dto.password() == null || dto.password().isBlank()) {
            throw new ValidationException("Mot de passe obligatoire");
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
        user.setAuthProvider(AuthProvider.LOCAL);

        user = userRepository.save(user);

        return userMapper.toResponse(user);
    }

    @Override
    public UserResponseDTO updateUserProfile(Long id, UserRequestDTO dto) {

        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User non trouvé"));

        if (!securityUtils.canAccessUser(id)) {
            throw new AccessDeniedException("Accès refusé");
        }
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

        if (!securityUtils.canAccessUser(id)) {
            throw new AccessDeniedException("Accès refusé");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User non trouvé"));

        refreshTokenService.deleteTokensByUser(user);
        userRepository.delete(user);
    }

    @Override
    public UserResponseDTO getById(Long id) {

        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Utilisateur introuvable"));

        if (!securityUtils.canAccessUser(id)) {
            throw new AccessDeniedException("Accès refusé");
        }

        return userMapper.toResponse(user);
    }

    @Override
    public Page<UserResponseDTO> search(String search, Pageable pageable) {

        if (!securityUtils.isAdminOrSecretary()) {
            throw new AccessDeniedException("Accès refusé");
        }
        return userRepository.searchUsers(search, pageable).map(userMapper::toResponse);
    }

    public ClassicAuthResponseDTO login(ClassicAuthRequestDTO dto) {

        User user = userRepository.findByEmail(dto.email()).orElseThrow(() -> new BadCredentialsException(" Email ou mot de passe incorrect"));

        // Empêcher login LOCAL sur compte CAS
        if (user.getAuthProvider() == AuthProvider.CAS) { throw new BadCredentialsException(" Utilisez le login CAS");}

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.email(), dto.password()));

        String token = jwtService.generateToken(user);
        refreshTokenService.createRefreshToken(user);

        return new ClassicAuthResponseDTO(
                token,
                user.getId(),
                user.getEmail(),
                user.getRole().name(),
                user.getActif()
        );
    }

    public UserResponseDTO updateUserByAdmin(Long id, UserUpdateRequestDTO dto) {

        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("Utilisateur introuvable"));

        if (!securityUtils.isAdminOrSecretary()) {
            throw new AccessDeniedException("Accès refusé");
        }

        userMapper.updateUserAdminFromDto(dto, user);

        // gestion spéciale équipe
        if (dto.equipeId() != null) {
            Equipe equipe = equipeRepository.findById(dto.equipeId())
                    .orElseThrow(() -> new NotFoundException("Equipe introuvable"));
            user.setEquipe(equipe);
        }

        user = userRepository.save(user);

        return userMapper.toResponse(user);
    }
}