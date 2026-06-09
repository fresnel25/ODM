package org.example.odm_backend.services.serviceInterface;

import org.example.odm_backend.entities.AppSetting;

public interface AppSettingService {

    AppSetting save(AppSetting setting);

    AppSetting get();

    void delete(Long id);
}
