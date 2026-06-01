package org.example.odm_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.common.ApiResponse;
import org.example.odm_backend.entities.AppSetting;
import org.example.odm_backend.services.serviceInterface.AppSettingService;
import org.example.odm_backend.services.serviceInterface.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class AppSettingController {

    private final AppSettingService appSettingService;
    private final FileStorageService fileStorageService;

    // ======================
    // CREATE / UPDATE UNIQUE
    // ======================
    @PutMapping
    public ResponseEntity<ApiResponse<AppSetting>> save(@RequestBody AppSetting setting) {

        AppSetting result = appSettingService.save(setting);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Paramètres sauvegardés avec succès",
                        result,
                        null
                )
        );
    }

    // ======================
    // GET SETTINGS
    // ======================
    @GetMapping
    public ResponseEntity<ApiResponse<AppSetting>> get() {

        AppSetting result = appSettingService.get();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Paramètres récupérés avec succès",
                        result,
                        null
                )
        );
    }

    // ======================
    // DELETE
    // ======================
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        appSettingService.delete(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Paramètre supprimé avec succès",
                        null,
                        null
                )
        );
    }

    // ======================
    // UPLOAD LOGO
    // ======================
    @PostMapping(value = "/logo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<String>> uploadLogo(@RequestParam("file") MultipartFile file) {

        String fileName = fileStorageService.save(file, "logos");

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Logo uploadé avec succès",
                        fileName,
                        null
                )
        );
    }

    // ======================
    // SERVE LOGO (FIX PROD)
    // ======================
    @GetMapping("/logo/{filename}")
    public ResponseEntity<Resource> getLogo(@PathVariable String filename) {

        Resource file = fileStorageService.load("logos", filename);

        MediaType mediaType = MediaType.IMAGE_PNG; // fallback safe

        try {
            Path path = Paths.get(file.getFile().getAbsolutePath());
            String detected = Files.probeContentType(path);

            if (detected != null) {
                mediaType = MediaType.parseMediaType(detected);
            }
        } catch (Exception ignored) {}

        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(file);
    }
}