package org.example.odm_backend.security.casAuth;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.entities.User;
import org.example.odm_backend.enums.AuthProvider;
import org.example.odm_backend.enums.Role;
import org.example.odm_backend.repositories.UserRepository;
import org.example.odm_backend.security.JwtService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CasAuthenticationService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public String authenticateCasUser(String email) {
        User user = userRepository.findByEmail(email).orElseGet(() -> createCasUser(email));
        return jwtService.generateToken(user);
    }

    private User createCasUser(String email) {
        User user = new User();
        user.setEmail(email);
        user.setPasswd(null);
        user.setAuthProvider(AuthProvider.CAS);
        user.setRole(Role.USER);
        user.setActif(true);
        return userRepository.save(user);
    }
}