package com.jsn.ipldashboard.controller;

import java.time.LocalDate;
import java.util.List;

import com.jsn.ipldashboard.model.Match;
import com.jsn.ipldashboard.model.Team;
import com.jsn.ipldashboard.repository.MatchRepository;
import com.jsn.ipldashboard.repository.TeamRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin //Allowing other domains to call these apis
public class TeamController {
    
    private TeamRepository teamRepository;
    private MatchRepository matchRepository;

    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) { //This is going to Autowired mentioned Repositories. This is constructor injection but still @Autowired not needed because presence of only constructor.
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName){
        Team team = this.teamRepository.findByTeamName(teamName);
        team.setMatches(this.matchRepository.findLatestMatchesByTeam(teamName, 4));
        return team;
    }

    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatchesForTeam(@PathVariable String teamName, @RequestParam int year){
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year+1, 1, 1);
        return this.matchRepository.getMatchesByTeamBetweenDates(teamName, startDate, endDate);
    }
    
}
