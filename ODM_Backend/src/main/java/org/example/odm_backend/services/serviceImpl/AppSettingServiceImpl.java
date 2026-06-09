package org.example.odm_backend.services.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.entities.AppSetting;
import org.example.odm_backend.entities.User;
import org.example.odm_backend.enums.Role;
import org.example.odm_backend.exceptions.NotFoundException;
import org.example.odm_backend.exceptions.ValidationException;
import org.example.odm_backend.repositories.AppSettingRepository;
import org.example.odm_backend.security.config.SecurityUtils;
import org.example.odm_backend.services.serviceInterface.AppSettingService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppSettingServiceImpl implements AppSettingService {

    private final AppSettingRepository repository;
    private final SecurityUtils securityUtils;


    @Override
    public AppSetting save(AppSetting setting) {

        User currentUser = securityUtils.getCurrentUserEntity();

        if (currentUser.getRole() != Role.SECRETARY) {
            throw new ValidationException("Accès refusé");
        }

        AppSetting existing = repository.findAll()
                .stream()
                .findFirst()
                .orElse(null);

        if (existing == null) {
            return repository.save(setting);
        }

        existing.setCompanyName(setting.getCompanyName());
        existing.setAppName(setting.getAppName());
        existing.setAddress(setting.getAddress());
        existing.setPhone(setting.getPhone());
        existing.setFax(setting.getFax());
        existing.setEmail(setting.getEmail());
        existing.setWebsite(setting.getWebsite());
        existing.setLogoName(setting.getLogoName());
        existing.setTextFooter(setting.getTextFooter());

        return repository.save(existing);
    }

    @Override
    public AppSetting get() {

        return repository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Settings non configurés"));
    }

    @Override
    public void delete(Long id) {
        User currentUser = securityUtils.getCurrentUserEntity();
        if(currentUser.getRole() != Role.SECRETARY){
            throw new ValidationException("Accès refusé");
        }
        repository.deleteById(id);
    }
}
