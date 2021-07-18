package com.jsn.ipldashboard.controller;

import com.jsn.ipldashboard.model.Team;
import com.jsn.ipldashboard.repository.MatchRepository;
import com.jsn.ipldashboard.repository.TeamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeamController {
    
    private TeamRepository teamRepository;
    private MatchRepository matchRepository;

    @Autowired
    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) { //This is going to Autowired mentioned Repositories. This is constructor injection but still @Autowired not needed because presence of only constructor.
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    public TeamController(){}

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName){
        Team team = this.teamRepository.findByTeamName(teamName);
        team.setMatches(this.matchRepository.findLatestMatchesByTeam(teamName, 4));
        return team;
    }
    
}
