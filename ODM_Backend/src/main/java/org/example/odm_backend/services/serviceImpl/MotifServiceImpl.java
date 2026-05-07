package org.example.odm_backend.services.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.MissionDTO.MotifFilterDTO;
import org.example.odm_backend.dtos.MotifDTO.MotifRequestDTO;
import org.example.odm_backend.dtos.MotifDTO.MotifResponseDTO;
import org.example.odm_backend.entities.Motif;
import org.example.odm_backend.exceptions.DuplicateResourceException;
import org.example.odm_backend.exceptions.NotFoundException;
import org.example.odm_backend.mappers.MotifMapper;
import org.example.odm_backend.repositories.MotifRepository;
import org.example.odm_backend.services.serviceInterface.MotifService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MotifServiceImpl implements MotifService {

    private final MotifRepository motifRepository;
    private final MotifMapper motifMapper;

    @Override
    public MotifResponseDTO addMotif(MotifRequestDTO dto) {

        if(motifRepository.existsByNomMotif(dto.nomMotif())){
            throw new DuplicateResourceException("Ce motif existe déjà");
        }

        Motif motif = new Motif();
        motif.setNomMotif(dto.nomMotif());

        motif = motifRepository.save(motif);

        return motifMapper.toResponse(motif);
    }

    @Override
    public MotifResponseDTO updateMotif(Long id, MotifRequestDTO dto) {
        Motif motif = motifRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Motif non trouvé"));

        if (dto.nomMotif() != null &&
                !dto.nomMotif().equals(motif.getNomMotif())) {

            if (motifRepository.existsByNomMotif(dto.nomMotif())) {
                throw new DuplicateResourceException("Ce motif existe déjà");
            }

            motif.setNomMotif(dto.nomMotif());
        }

        motif = motifRepository.save(motif);

        return motifMapper.toResponse(motif);
    }

    @Override
    public void deleteMotif(Long id) {
        if (!motifRepository.existsById(id)){
            throw new NotFoundException("Motif non trouvé");
        }
        motifRepository.deleteById(id);
    }

    @Override
    public MotifResponseDTO getById(Long id) {
        Motif motif = motifRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Motif non trouvé"));
        return motifMapper.toResponse(motif);
    }

    @Override
    public Page<MotifResponseDTO> search(MotifFilterDTO filter, Pageable pageable) {
        return motifRepository.search(
                filter.nomMotif(), filter.estDansListe(), pageable
        ).map(motifMapper::toResponse);
    }
}
