package org.example.odm_backend.services.pdf;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PdfTemplateService {

// Cette classe sert à Transformer : Données Java en HTML

    private final TemplateEngine templateEngine;

    public String render(String template, Map<String, Object> variables) {

        Context context = new Context();

        variables.forEach(context::setVariable);

        return templateEngine.process(
                template,
                context
        );
    }
}