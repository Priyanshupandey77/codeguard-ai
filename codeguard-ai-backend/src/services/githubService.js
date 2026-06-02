import axios from "axios";

export const getUserRepos = async (username) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`,
  );
  return response.data;
};

export const getRepoFiles = async (
    owner, repo
) => {
    const response = await axios.get(
         `https://api.github.com/repos/${owner}/${repo}/contents`
    );

    return response.data;
}
