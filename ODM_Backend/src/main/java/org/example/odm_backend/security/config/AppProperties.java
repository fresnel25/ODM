package org.example.odm_backend.security.config;

import lombok.*;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "app")
@Component
@Getter
@Setter
public class AppProperties {


    private Frontend frontend;
    private Backend backend = new Backend();
    private Mail mail = new Mail();
    private Security security;



    @Getter
    @Setter
    public static class Frontend {
        private String url;
    }

    @Getter
    @Setter
    public static class Backend {
        private String url;
    }


    @Getter
    @Setter
    public static class Mail {
        private String from;
        private String fromName;
        private boolean enabled;
    }

    @Getter
    @Setter
    public static class Security {
        private String secretKey;
        private Long expirationTime;
        private Long refreshExpiration;
    }


}