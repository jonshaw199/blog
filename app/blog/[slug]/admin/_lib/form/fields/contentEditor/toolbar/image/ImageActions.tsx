import Button from "@/_lib/button/Button";
import Library from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/Library";
import { uploadImage } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/utils";
import { useState } from "react";

export default function ImageActionsModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [showLibrary, setShowLibrary] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <div>
          <div className="flex justify-evenly flex-grow">
            <Button onClick={uploadImage}>Upload</Button>
            <Button onClick={() => setShowLibrary((show) => !show)}>
              Library
            </Button>
            <Button onClick={() => onClose()}>Cancel</Button>
          </div>
        </div>
        {showLibrary && (
          <div>
            <hr className="my-3" />
            <Library />
          </div>
        )}
      </div>
    </div>
  );
}
