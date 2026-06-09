package org.example.odm_backend.security.config;

import org.example.odm_backend.entities.User;
import org.example.odm_backend.enums.Role;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    public CustomUserDetails getCurrentUser() {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new SecurityException("Utilisateur non authentifié");
        }

        Object principal = auth.getPrincipal();

        if (principal instanceof String) {
            throw new SecurityException("Utilisateur anonyme");
        }

        if (principal instanceof CustomUserDetails userDetails) {
            return userDetails;
        }

        throw new SecurityException("Principal invalide");
    }

    public User getCurrentUserEntity() {
        return getCurrentUser().getUser();
    }

    public Long getCurrentUserId() {
        return getCurrentUser().getId();
    }

    public String getCurrentUserEmail() {
        return getCurrentUser().getUsername();
    }

    public boolean isAdminOrSecretary() {
        Role role = getCurrentUser().getUser().getRole();
        return role == Role.ADMIN || role == Role.SECRETARY;
    }

    public boolean canAccessUser(Long userId) {
        return isOwner(userId) || isAdminOrSecretary();
    }

    public boolean isOwner(Long userId) {
        return getCurrentUserId().equals(userId);
    }
}