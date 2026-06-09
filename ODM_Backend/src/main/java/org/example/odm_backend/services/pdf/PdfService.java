package org.example.odm_backend.services.pdf;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.extern.slf4j.Slf4j;
import org.example.odm_backend.exceptions.ValidationException;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Slf4j
@Service
public class PdfService {
    // Cette classe sert à Transformer : HTML en pdf
    public byte[] generatePdf(String html) {

        try (ByteArrayOutputStream output = new ByteArrayOutputStream()) {

            PdfRendererBuilder builder = new PdfRendererBuilder();

            builder.withHtmlContent(html, null);

            builder.toStream(output);

            builder.run();

            return output.toByteArray();

        } catch (Exception e) {

            log.error("Erreur génération PDF", e);

            throw new ValidationException(
                    "Impossible de générer le document PDF"
            );
        }
    }
}