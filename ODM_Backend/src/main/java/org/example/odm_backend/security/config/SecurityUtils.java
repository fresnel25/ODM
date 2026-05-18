package org.example.odm_backend.security.config;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    public CustomUserDetails getCurrentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !(auth.getPrincipal() instanceof CustomUserDetails)) {
            throw new SecurityException("Utilisateur non authentifié");
        }

        return (CustomUserDetails) auth.getPrincipal();
    }

    public Long getCurrentUserId() {
        return getCurrentUser().getId();
    }
}
