import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.<br/>
    <h4>The Top 25 Forked Repos In the Database:</h4>
    <table>
      <tbody>
        <tr>
          <td>Repository Name</td>
          <td>Number of Forks</td>
        </tr>
          {props.repos.map((repo, index) => {
            return (
              <tr>
                <td key={repo.repoId}><a href={repo.repoUrl}>{repo.name}</a></td>
                <td key={repo.repoUrl}>{repo.forks}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  </div>
)

export default RepoList;