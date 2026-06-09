package org.example.odm_backend.services.emailService;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.entities.Mission;
import org.example.odm_backend.entities.User;
import org.example.odm_backend.enums.Role;
import org.example.odm_backend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MissionNotificationService {

    private final EmailService emailService;
    private final UserRepository userRepository;

    public void sendMissionCreatedMail(User user, Mission mission) {

        String subject = "Nouvelle mission créée";

        String content = """
            <h2>Nouvelle mission</h2>
            <p>Une nouvelle mission a été créée :</p>

            <ul>
                <li>Motif : %s</li>
                <li>Lieu : %s</li>
                <li>Date départ : %s</li>
            </ul>

            <p>Merci de vous connecter pour validation.</p>
        """.formatted(
                mission.getMotif().getNomMotif(),
                mission.getLieu(),
                mission.getDateD()
        );

        emailService.sendSimpleMail(user.getEmail(), subject, content);
    }

    public void notifyMissionCreated(Mission mission, User creator) {

        List<User> secretaires = userRepository.findByRole(Role.SECRETARY);

        List<User> admins = userRepository.findByRoleAndEquipe_Id(
                Role.ADMIN,
                creator.getEquipe().getId()
        );

        List<User> recipients = new ArrayList<>();
        recipients.addAll(secretaires);
        recipients.addAll(admins);

        recipients.stream()
                .distinct()
                .forEach(user ->
                        sendMissionCreatedMail(user, mission)
                );
    }

    public void notifyMissionValidated(Mission mission, User admin) {

        String subject = "Mission validée";

        String content = """
        <h2>Mission validée</h2>
        <p>Votre mission a été validée</p>

        <ul>
            <li>Motif : %s</li>
            <li>Lieu : %s</li>
        </ul>
    """.formatted(
                mission.getMotif().getNomMotif(),
                mission.getLieu()
        );

        emailService.sendSimpleMail(
                mission.getUser().getEmail(),
                subject,
                content
        );
    }

    public void notifyDatePecUpdated(Mission mission, User user) {

        String subject = "Mise à jour date PEC";

        String content = """
        <h3>Modification PEC</h3>

        <p>La date PEC a été mise à jour par la secrétaire.</p>

        <ul>
            <li>Mission : %s</li>
            <li>Nouvelle date PEC : %s</li>
        </ul>
    """.formatted(
                mission.getMotif().getNomMotif(),
                mission.getDatePec()
        );

        emailService.sendSimpleMail(
                mission.getUser().getEmail(),
                subject,
                content
        );
    }
}
