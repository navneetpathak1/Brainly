import { useState } from "react";
import { Button } from "../components/UI/Button";
import { CreateComponentModel } from "../components/UI/CreateComponentModel";
import { PlusIcon } from "../icons/PlusIcons";
import { ShareIcon } from "../icons/ShareIcons";
import Sidebar from "../components/UI/Sidebar";
import { useContent } from "../hooks/useContent";
import Card from "../components/UI/Card";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const { contents, loading, error, refetch } = useContent();

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="p-4 ml-72 min-h-screen bg-[#eeeeef] w-full relative">
        {/* Modal */}
        <CreateComponentModel
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            refetch(); // refresh content after closing modal
          }}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mb-4">
          <Button
            startIcon={<PlusIcon size="md" />}
            variant="primary"
            text="Add content"
            size="md"
            onClick={() => setOpenModal(true)}
          />
          <Button
            onClick={async () => {
              try {
                const token = localStorage.getItem("token"); // ✅ FIX
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  {
                    headers: {
                      Authorization: `Bearer ${token || ""}`,
                    },
                  }
                );

                const shareUrl = `http://localhost:5173/share/${response.data.hash}`; // ✅ FIX
                alert(shareUrl);
              } catch (err) {
                console.error(err);
                alert("Failed to generate share link");
              }
            }}
            startIcon={<ShareIcon size="md" />}
            variant="secondary"
            text="Share"
            size="sm"
          />
        </div>

        {/* Cards */}
        <div className="flex p-4 gap-4 flex-wrap">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading &&
            !error &&
            contents.map(({ type, link, title, _id }) => (
              <Card key={_id} type={type} link={link} title={title} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
