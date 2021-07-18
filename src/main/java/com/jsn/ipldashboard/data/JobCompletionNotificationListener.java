package com.jsn.ipldashboard.data;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;

import com.jsn.ipldashboard.model.Team;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

  private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

  private final JdbcTemplate jdbcTemplate;

  private final EntityManager entityManager; // It is JPA way of interacting with database

  @Autowired
  public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate, EntityManager entityManager) {
    this.jdbcTemplate = jdbcTemplate;
    this.entityManager = entityManager;
  }

  @Override
  @Transactional
  public void afterJob(JobExecution jobExecution) {
    if(jobExecution.getStatus() == BatchStatus.COMPLETED) { //Runs when job is complete
      log.info("!!! JOB FINISHED! Time to verify the results");
      
      Map<String, Team> teamData = new HashMap<>();
      entityManager.createQuery("select distinct m.team1, count(*) from Match m group by m.team1", Object[].class) //Getting Object array having team name as String & count of matches as Number
      .getResultList()
      .stream()
      .map(e -> new Team((String)e[0], (long)e[1]))  //Creating team instances
      .forEach(team -> teamData.put(team.getTeamName(), team));
      
      entityManager.createQuery("select distinct m.team2, count(*) from Match m group by m.team2", Object[].class) 
      .getResultList()
      .stream()
      .forEach(e -> {
        Team team = teamData.get((String)e[0]);
        team.setTotalMatches(team.getTotalMatches() + (long)e[1]);
      });

      entityManager.createQuery("select m.matchWinner, count(*) from Match m group by m.matchWinner", Object[].class)
      .getResultList()
      .stream()
      .forEach(e -> {
        Team team = teamData.get((String)e[0]);
        if(team != null) team.setTotalWins((long)e[1]);
      });

      teamData.values().forEach(team -> entityManager.persist(team));
      teamData.values().forEach(team -> System.out.println(team));
    }
  }
}
