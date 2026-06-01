package org.example.odm_backend.services.serviceInterface;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    String save(MultipartFile file, String folder);

    Resource load(String folder, String filename);

   // void delete(String folder, String filename);
}
