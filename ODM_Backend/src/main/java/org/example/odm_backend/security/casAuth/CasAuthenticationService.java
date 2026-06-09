package org.example.odm_backend.security.casAuth;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.UserDTO.CasAuthRequestDTO;
import org.example.odm_backend.entities.User;
import org.example.odm_backend.enums.AuthProvider;
import org.example.odm_backend.enums.Role;
import org.example.odm_backend.repositories.UserRepository;
import org.example.odm_backend.security.token.jwtToken.JwtService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CasAuthenticationService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public String authenticateCasUser(CasAuthRequestDTO casUser) {
        User user = userRepository.findByEmail(casUser.email()).orElseGet(() -> createCasUser(casUser));
        return jwtService.generateToken(user);
    }

// Créer automatiquement un utilisateur lors de sa première connexion CAS.
private User createCasUser(CasAuthRequestDTO casUser) {

    User user = new User();
    user.setEmail(casUser.email());
    user.setFirstName(casUser.firstName());
    user.setName(casUser.lastName());
    user.setPasswd(null);
    user.setRole(Role.USER);
    user.setAuthProvider(AuthProvider.CAS);
    user.setActif(true);
    return userRepository.save(user);
}
}