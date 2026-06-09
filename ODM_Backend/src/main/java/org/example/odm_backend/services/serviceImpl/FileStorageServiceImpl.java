package org.example.odm_backend.services.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.services.serviceInterface.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageServiceImpl implements FileStorageService {

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @Override
    public String save(MultipartFile file, String folder) {

        try {
            Path folderPath = Paths.get(uploadDir, folder);
            if (!Files.exists(folderPath)) {
                Files.createDirectories(folderPath);
            }
            String extension = getExtension(file.getOriginalFilename());
            String fileName = UUID.randomUUID() + "." + extension;
            Path target = folderPath.resolve(fileName);
            Files.copy(
                    file.getInputStream(),
                    target,
                    StandardCopyOption.REPLACE_EXISTING
            );
            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Erreur sauvegarde fichier", e);
        }
    }

    @Override
    public Resource load(String folder, String filename) {
        try {
            Path file = Paths.get(uploadDir, folder)
                    .resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (!resource.exists()) {
                throw new RuntimeException("Fichier introuvable");
            }
            return resource;
        } catch (MalformedURLException e) {
            throw new RuntimeException("Erreur lecture fichier", e);
        }
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "png";
        }
        return filename.substring(filename.lastIndexOf(".") + 1);
    }
}