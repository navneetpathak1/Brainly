import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      });

      setContents(response.data?.content || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { contents, loading, error, setContents, refetch: fetchContent };
}
