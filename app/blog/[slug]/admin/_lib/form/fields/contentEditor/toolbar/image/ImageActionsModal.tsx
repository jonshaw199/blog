import Button from "@/_lib/button/Button";
import { UploadMediaResult } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/actions";
import Library from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/Library";
import UploadConfirmation from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/UploadConfirmation";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function ImageActionsModal({
  onClose,
  onUpload,
  onUploadConfirmation,
  uploadMediaResult,
}: {
  onClose: () => void;
  onUpload: () => void;
  onUploadConfirmation: () => void;
  uploadMediaResult: UploadMediaResult | null;
}) {
  const [showLibrary, setShowLibrary] = useState(false);

  const handleUpload = () => {
    setShowLibrary(false);
    onUpload();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <div>
          <div className="flex justify-evenly flex-grow">
            <Button onClick={() => setShowLibrary((show) => !show)}>
              Library
            </Button>
            <Button onClick={handleUpload}>Upload</Button>
            <Button onClick={() => onClose()}>Cancel</Button>
          </div>
        </div>
        {showLibrary && (
          <div>
            <hr className="my-3" />
            <Library onSelect={(url) => console.log(`Selected ${url}`)} />
          </div>
        )}
        {uploadMediaResult && (
          <UploadConfirmation uploadMediaResult={uploadMediaResult} />
        )}
      </div>
    </div>,
    document.body,
  );
}
