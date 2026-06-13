import { useState } from "react";
import { Search } from "lucide-react";
import {
  getRepos,
  getRepoFiles,
  getFileContent,
} from "../services/githubService";

const GithubPanel = ({ setCode, setOriginalCode }) => {
  const [githubUsername, setGithubUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [files, setFiles] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [repoSearch, setRepoSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(repoSearch.toLowerCase()),
  );

  const handleFetchRepos = async () => {
    if (!githubUsername.trim()) return;

    try {
      setLoadingRepos(true);

      const data = await getRepos(githubUsername);

      setRepos(data.repos);
    } catch (error) {
      console.log(error);
      alert("Could not fetch repositories");
    } finally {
      setLoadingRepos(false);
    }
  };

  const handleFileClick = async (file) => {
    if (!selectedRepo) return;

    try {
      setSelectedFile(file);

      if (file.type === "dir") {
        const data = await getRepoFiles(
          githubUsername,
          selectedRepo.name,
          file.path,
        );

        setFiles(data.files || []);
        return;
      }

      const res = await getFileContent(
        githubUsername,
        selectedRepo.name,
        file.path,
      );

      const content =
        typeof res?.content?.content === "string" ? res.content.content : "";

      setCode(content);
      setOriginalCode(content);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRepoSelect = async (repo) => {
    if (!repo) return;

    try {
      setSelectedRepo(repo);
      setSelectedFile(null);
      setCode("");
      setOriginalCode("");

      const data = await getRepoFiles(githubUsername, repo.name);

      setFiles(data.files || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6">
      <h2 className="text-xl font-bold mb-4">GitHub Repository Review</h2>
      <div className="flex gap-3">
        <input
          type="text"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
          placeholder="Enter GitHub Username"
          className="flex-1 bg-zinc-800 rounded-lg p-3"
        />

        <button
          onClick={handleFetchRepos}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg"
        >
          {loadingRepos ? "Loading..." : "Fetch"}
        </button>
      </div>
      {repos.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Repositories</h2>

            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-3 text-zinc-400"
              />

              <input
                type="text"
                value={repoSearch}
                onChange={(e) => setRepoSearch(e.target.value)}
                placeholder="Search repository..."
                className="
      pl-10
      bg-zinc-800
      border
      border-zinc-700
      rounded-lg
      px-3
      py-2
      text-sm
      w-72
      focus:outline-none
      focus:border-blue-500
    "
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredRepos.slice(0, 3).map((repo) => (
              <div
                key={repo.id}
                onClick={() => handleRepoSelect(repo)}
                className={`
                rounded-lg
                p-4
                cursor-pointer
                transition-all
            
                ${
                  selectedRepo?.id === repo.id
                    ? "bg-blue-600/20 border border-blue-500"
                    : "bg-zinc-800 hover:bg-zinc-700"
                }
                `}
              >
                <h3 className="font-semibold">📁 {repo.name}</h3>

                <p className="text-zinc-400 text-sm mt-1">
                  {repo.description || "No description"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedRepo && (
        <div className="mt-6 bg-blue-500/10 border border-blue-500 rounded-xl p-4">
          <p className="text-blue-400 font-medium">Selected Repository</p>

          <h3 className="text-xl font-bold mt-1">{selectedRepo.name}</h3>
          {files.length > 0 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mt-6">
              <h2 className="text-xl font-bold mb-4">Repository Files</h2>

              <div className="space-y-2">
                {files.map((file) => (
                  <div
                    key={file.path}
                    onClick={() => handleFileClick(file)}
                    className={`
      p-3
      rounded-lg
      cursor-pointer
      transition-all

      ${
        selectedFile?.path === file.path
          ? "bg-blue-600/20 border border-blue-500"
          : "bg-zinc-800 hover:bg-zinc-700"
      }
    `}
                  >
                    {file.type === "dir" ? "📁" : "📄"} {file.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GithubPanel;
