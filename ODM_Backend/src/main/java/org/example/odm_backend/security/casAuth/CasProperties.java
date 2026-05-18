package org.example.odm_backend.security.casAuth;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "cas")
public class CasProperties {

    private String serverUrl;
    private String serviceUrl;
}