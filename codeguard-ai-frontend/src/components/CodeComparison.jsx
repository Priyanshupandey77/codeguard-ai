import Editor from "@monaco-editor/react";

const CodeComparison = ({
  originalCode,
  refactoredCode,
  onReplace,
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        refactoredCode
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Before vs After
        </h2>

        <span
          className="
            bg-green-500/20
            text-green-400
            px-3
            py-1
            rounded-full
            text-xs
            font-medium
          "
        >
          AI Improved
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Original */}
        <div>
          <h3 className="font-semibold text-zinc-400 mb-3">
            Original Code
          </h3>

          <div className="border border-zinc-800 rounded-xl overflow-hidden">
            <Editor
              height="350px"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={originalCode}
              options={{
                readOnly: true,
                minimap: {
                  enabled: false,
                },
                scrollBeyondLastLine: false,
                fontSize: 14,
              }}
            />
          </div>
        </div>

        {/* Refactored */}
        <div>
          <h3 className="font-semibold text-green-400 mb-3">
            Refactored Code
          </h3>

          <div className="border border-green-500/20 rounded-xl overflow-hidden">
            <Editor
              height="350px"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={refactoredCode}
              options={{
                readOnly: true,
                minimap: {
                  enabled: false,
                },
                scrollBeyondLastLine: false,
                fontSize: 14,
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={handleCopy}
          className="
            bg-zinc-700
            hover:bg-zinc-600
            px-4
            py-2
            rounded-lg
            transition-all
          "
        >
          Copy Code
        </button>

        <button
          onClick={onReplace}
          className="
            bg-green-600
            hover:bg-green-700
            px-5
            py-2
            rounded-lg
            font-medium
            transition-all
          "
        >
          Replace Editor
        </button>
      </div>
    </div>
  );
};

export default CodeComparison;