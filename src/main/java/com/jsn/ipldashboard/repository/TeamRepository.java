package com.jsn.ipldashboard.repository;

import com.jsn.ipldashboard.model.Team;

import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Long>{ //Repository to get Team information
    
    Team findByTeamName(String teamName);
}
