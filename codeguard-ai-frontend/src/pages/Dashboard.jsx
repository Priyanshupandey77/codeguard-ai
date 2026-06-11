import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { reviewCode } from "../services/reviewService";
import DashboardLayout from "../layouts/DashboardLayout";
import ScoreCard from "../components/ScoreCard";
import ReviewSection from "../components/ReviewSection";
import { Bot } from "lucide-react";
import { getHistory } from "../services/historyService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getRepos } from "../services/githubService";
import { getRepoFiles } from "../services/githubService";
import { getFileContent } from "../services/githubService";
import { Search } from "lucide-react";

const Dashboard = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const { user } = useContext(AuthContext);
  const [githubUsername, setGithubUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [repoSearch, setRepoSearch] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleReview = async () => {
    try {
      setLoading(true);

      const result = await reviewCode(code);

      setReview(result.review.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [stats, setStats] = useState({
    reviews: 0,
    averageScore: 0,
    issues: 0,
  });
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getHistory();

      const reviews = data.reviews;

      const averageScore =
        reviews.reduce((sum, review) => sum + review.score, 0) /
        (reviews.length || 1);

      const totalIssues = reviews.reduce(
        (count, review) =>
          count +
          review.result.bugs.length +
          review.result.performance.length +
          review.result.security.length +
          review.result.cleanCode.length,
        0,
      );

      setStats({
        reviews: reviews.length,
        averageScore: averageScore.toFixed(1),
        issues: totalIssues,
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(repoSearch.toLowerCase()),
  );

  const handleRepoSelect = async (repo) => {
    if (!repo) return;

    try {
      setSelectedRepo(repo);
      setSelectedFile(null);
      setCode(""); // 🔥 important reset

      const data = await getRepoFiles(githubUsername, repo.name);

      setFiles(data.files || []);
    } catch (error) {
      console.log(error);
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
      typeof res?.content?.content === "string"
        ? res.content.content
        : "";

    setCode(content);
  } catch (err) {
    console.log(err);
  }
};
  console.log("CODE:", code);
  console.log("TYPE:", typeof code);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold">Welcome back, {user?.name}</h1>

        <p className="text-zinc-400 mt-2 mb-1">
          Review your code with AI-powered insights.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Reviews</p>

            <h2 className="text-3xl font-bold">{stats.reviews}</h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Avg Score</p>

            <h2 className="text-3xl font-bold">{stats.averageScore}</h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Issues Found</p>

            <h2 className="text-3xl font-bold">{stats.issues}</h2>
          </div>
        </div>

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

        <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 border-b-0 rounded-t-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>

          <div className="text-sm text-zinc-400">JavaScript</div>

          <div className="text-sm text-zinc-500">
            {typeof code === "string" ? code.split("\n").length : 0} Lines
          </div>
        </div>

        <div className="overflow-hidden rounded-b-2xl border border-zinc-800">
          <Editor
            height="500px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={typeof code === "string" ? code : ""}
            onChange={(v) => setCode(v || "")}
          />
        </div>

        <button
          onClick={handleReview}
          disabled={loading}
          className="
            mt-6
            flex
            items-center
            gap-2
           bg-blue-600
           hover:bg-blue-700
            hover:scale-105
            transition-all
            px-6
            py-3
            rounded-xl
            font-medium
            shadow-lg
            shadow-blue-500/20
          "
        >
          <Bot size={18} />

          {loading ? "Analyzing..." : "AI Review Code"}
        </button>

        {!review && (
          <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-10">
            <h2 className="text-2xl font-bold mb-4">🚀 Ready to review code</h2>

            <p className="text-zinc-400 mb-6">
              Paste your code into the editor and get instant AI-powered
              feedback.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-800 rounded-xl p-4">🐛 Bug Detection</div>

              <div className="bg-zinc-800 rounded-xl p-4">
                🔒 Security Review
              </div>

              <div className="bg-zinc-800 rounded-xl p-4">
                ⚡ Performance Analysis
              </div>

              <div className="bg-zinc-800 rounded-xl p-4">
                🧹 Clean Code Suggestions
              </div>
            </div>
          </div>
        )}

        {review && (
          <div className="mt-8 space-y-6">
            <div className="bg-zinc-900 p-4 rounded-lg">
              <h2 className="text-xl font-bold">
                <div className="grid lg:grid-cols-4 gap-6 mt-8">
                  <div className="lg:col-span-1">
                    <ScoreCard score={review.score} />
                  </div>

                  <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-3">Summary</h2>

                    <p className="text-zinc-400">{review.summary}</p>
                  </div>
                </div>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <ReviewSection title="Bugs" icon="🐛" items={review.bugs} />

              <ReviewSection
                title="Performance"
                icon="⚡"
                items={review.performance}
              />

              <ReviewSection
                title="Security"
                icon="🔒"
                items={review.security}
              />

              <ReviewSection
                title="Clean Code"
                icon="🧹"
                items={review.cleanCode}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
