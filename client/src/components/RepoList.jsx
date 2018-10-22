import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map(repo => (
      <p>{repo.name}</p>
    ))}
  </div>
)

export default RepoList;