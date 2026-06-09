package org.example.odm_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.services.pdf.MissionPdfService;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pdf")
@RequiredArgsConstructor
public class PdfController {

    private final MissionPdfService missionPdfService;

    @GetMapping("/mission/{id}")
    public ResponseEntity<byte[]> generatePdfMission(@PathVariable Long id) {

        byte[] pdf = missionPdfService.generateMissionPdf(id);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.inline()
                                .filename("mission-" + id + ".pdf")
                                .build()
                                .toString()
                )
                .body(pdf);
    }
}