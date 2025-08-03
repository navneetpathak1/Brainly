import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Card from "../components/UI/Card";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

function ShareBrain() {
  const { shareId } = useParams<{ shareId: string }>();
  const [username, setUsername] = useState("");
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSharedBrain() {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`);
        setUsername(response.data.username || "");
        setContent(response.data.content || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch shared brain data.");
      } finally {
        setLoading(false);
      }
    }

    if (shareId) {
      fetchSharedBrain();
    }
  }, [shareId]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-[#f5f6f8] min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Shared by <span className="text-purple-600">{username}</span>
        </h1>
        <p className="text-gray-500 mt-1">Here is the content they have shared:</p>
      </div>

      {/* Content Cards */}
      <div className="max-w-4xl mx-auto flex flex-wrap gap-4">
        {content.length > 0 ? (
          content.map(({ _id, type, link, title }) => (
            <Card key={_id} type={type} link={link} title={title} />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">No content shared.</p>
        )}
      </div>
    </div>
  );
}

export default ShareBrain;
