import { useRef, useState } from "react";
import { CloseIcon } from "../../icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";


export const CreateComponentModel = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  onAddContent?: () => void;
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("youtube");
  const [loading, setLoading] = useState(false);

  async function addContent() {
    const title = titleRef.current?.value.trim() || "";
    const link = linkRef.current?.value.trim() || "";

    if (!title || !link) {
      alert("Title and link are required!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { link, title, type },
        {
          headers: {
            Authorization: `Bearer ${token || ""}`,
          },
        }
      );
      onClose();
    } catch (err) {
      console.error(err);
      alert(err || "Failed to add content!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-900 opacity-60"
            onClick={onClose}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 z-10">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={onClose}
                className="p-1 hover:bg-slate-100 rounded-full transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-3">
              <Input ref={titleRef} placeholder="Title" onChange={() => {}} />
              <Input ref={linkRef} placeholder="Link" onChange={() => {}} />

              {/* Type Buttons */}
              <div className="flex justify-center gap-2 mt-2">
                <Button
                  variant={type === "youtube" ? "primary" : "secondary"}
                  text="Youtube"
                  size="sm"
                  onClick={() => setType("youtube")}
                />
                <Button
                  variant={type === "twitter" ? "primary" : "secondary"}
                  text="Twitter"
                  size="sm"
                  onClick={() => setType("twitter")}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <Button
                  onClick={addContent}
                  variant="primary"
                  text={loading ? "Submitting..." : "Submit"}
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
