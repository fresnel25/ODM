package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.AppSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppSettingRepository extends JpaRepository<AppSetting, Long> {
}
