package org.example.odm_backend.services.serviceImpl;

import org.example.odm_backend.dtos.EquipeDto.EquipeRequestDTO;
import org.example.odm_backend.dtos.EquipeDto.EquipeResponseDTO;
import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.mappers.EquipeMapper;
import org.example.odm_backend.repositories.EquipeRepository;
import org.example.odm_backend.services.serviceInterface.EquipeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipeServiceImpl implements EquipeService {

    private final EquipeRepository equipeRepository;
    private final EquipeMapper equipeMapper;

    public EquipeServiceImpl(EquipeRepository equipeRepository, EquipeMapper equipeMapper){
        this.equipeRepository = equipeRepository;
        this.equipeMapper = equipeMapper;
    }

    @Override
    public EquipeResponseDTO addEquipe(EquipeRequestDTO dto) {
        Equipe equipe = new Equipe();
        equipe.setNomEquipe(dto.nomEquipe());
        equipe = equipeRepository.save(equipe);

        return equipeMapper.toResponse(equipe);
    }

    @Override
    public EquipeResponseDTO updateEquipe(Long id, EquipeRequestDTO dto) {
        Equipe equipe = equipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipe pas trouvée"));

        if (dto.nomEquipe() != null) {
            equipe.setNomEquipe(dto.nomEquipe());
        }

        equipe = equipeRepository.save(equipe);

        return equipeMapper.toResponse(equipe);
    }

    @Override
    public void deleteEquipe(Long id) {
        equipeRepository.deleteById(id);
    }

    @Override
    public EquipeResponseDTO getById(Long id) {
        Equipe equipe = equipeRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Equipe pas trouvée"));
        return null;
    }

    @Override
    public List<EquipeResponseDTO> getAll() {
        return equipeRepository.findAll()
                .stream()
                .map(equipeMapper::toResponse)
                .toList();
    }
}
