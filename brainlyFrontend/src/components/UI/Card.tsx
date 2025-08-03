import { useEffect } from "react";
import { PlusIcon } from "../../icons/PlusIcons";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

const Card = ({ title, link, type }: CardProps) => {
  useEffect(() => {
    if (type === "twitter") {
      if (!window.twttr) {
        const existingScript = document.querySelector<HTMLScriptElement>(
          'script[src="https://platform.twitter.com/widgets.js"]'
        );

        if (!existingScript) {
          const script = document.createElement("script");
          script.src = "https://platform.twitter.com/widgets.js";
          script.async = true;
          document.body.appendChild(script);
        }
      } else {
        window.twttr.widgets.load();
      }
    }
  }, [type, link]);

  const getYoutubeEmbedUrl = (url: string) => {
    try {
      const videoId = new URL(url).searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch {
      return url;
    }
  };

  const getTwitterLink = (url: string) =>
    url.includes("x.com") ? url.replace("x.com", "twitter.com") : url;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border border-slate-200 max-w-72 min-h-60 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-purple-600">
            <PlusIcon size="md" />
          </span>
          <span className="font-semibold text-gray-800 text-sm truncate">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <button className="hover:text-purple-600 transition-colors">
            <PlusIcon size="md" />
          </button>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600 transition-colors"
          >
            <PlusIcon size="md" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="py-2">
        {type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded"
            src={getYoutubeEmbedUrl(link)}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={getTwitterLink(link)}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default Card;
