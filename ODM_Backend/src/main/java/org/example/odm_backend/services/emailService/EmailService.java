package org.example.odm_backend.services.emailService;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.example.odm_backend.security.config.AppProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final AppProperties appProperties;
    // private final AppSettingService appSettingService;


    public void sendSimpleMail(String to, String subject, String content) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(appProperties.getMail().getFrom(),
                    appProperties.getMail().getFromName());


            // AppSetting settings = appSettingService.get();
            // helper.setFrom(settings.getEmail(), settings.getCompanyName());

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true); // HTML = true

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Erreur envoi mail", e);
        }
    }
}
