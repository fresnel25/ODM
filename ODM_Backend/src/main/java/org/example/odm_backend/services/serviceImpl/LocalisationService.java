package org.example.odm_backend.services.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LocalisationService {

    private final RestTemplate restTemplate;

    @Cacheable(value = "osm-search", key = "#query")
    public List<Map<String, Object>> search(String query) {

        try {
            URI uri = UriComponentsBuilder
                    .fromHttpUrl("https://nominatim.openstreetmap.org/search")
                    .queryParam("q", query)
                    .queryParam("format", "json")
                    .queryParam("addressdetails", 1)
                    .queryParam("limit", 5)
                    .build()
                    .encode()
                    .toUri();

            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "ODM-App/1.0 (contact: admin@odm.local)");
            headers.set("Accept-Language", "fr");

            HttpEntity<Void> entity = new HttpEntity<>(headers);

            ResponseEntity<List> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    entity,
                    List.class
            );

            return response.getBody() != null ? response.getBody() : List.of();

        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }
}