import Button from "@/_lib/button/Button";
import { MediaWithUrl } from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/actions";
import Library from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/Library";
import UploadConfirmation, {
  UploadConfirmationFormValues,
} from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/UploadConfirmation";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function ImageActionsModal({
  onClose,
  onCloseUploadConfirmation,
  onSelectLibraryItem,
  onUpload,
  onUploadConfirmation,
  uploadedMedia,
  isUploading,
}: {
  onClose: () => void;
  onCloseUploadConfirmation: () => void;
  onSelectLibraryItem: (mediaWithUrl: MediaWithUrl) => void;
  onUpload: () => void;
  onUploadConfirmation: (
    uploadConfirmationFormValues: UploadConfirmationFormValues,
  ) => void;
  uploadedMedia: MediaWithUrl | null;
  isUploading: boolean;
}) {
  const [showLibrary, setShowLibrary] = useState(false);

  const handleUpload = () => {
    setShowLibrary(false);
    onUpload();
  };

  const handleLibrary = () => {
    onCloseUploadConfirmation();
    setShowLibrary(true);
  };

  const handleCancel = () => {
    setShowLibrary(false);
    onCloseUploadConfirmation();
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="max-h-full w-full max-w-2xl overflow-auto rounded-[1.75rem] border border-border bg-surface-strong p-6 text-foreground shadow-[0_24px_80px_rgba(15,23,42,0.28)]">
        <div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button disabled={isUploading} onClick={handleLibrary}>
              Library
            </Button>
            <Button disabled={isUploading} onClick={handleUpload}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
            <Button disabled={isUploading} onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
        {showLibrary && (
          <div>
            <hr className="my-4 border-border" />
            <Library onSelect={onSelectLibraryItem} />
          </div>
        )}
        {uploadedMedia && (
          <>
            <hr className="my-4 border-border" />
            <UploadConfirmation
              uploadedMedia={uploadedMedia}
              onSubmit={onUploadConfirmation}
            />
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
