import { useCallback, useRef, useState } from "react";
import { Button, Stack } from "@sanity/ui";
import {
  insert,
  setIfMissing,
  useClient,
  type ArrayOfObjectsInputProps,
} from "sanity";

const BATCH_SIZE = 5;
const API_VERSION = "2024-10-01";

function uniqueKey() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function BatchImageInput(props: ArrayOfObjectsInputProps) {
  const { onChange } = props;
  const client = useClient({ apiVersion: API_VERSION });
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const files = Array.from(fileList);

      onChange(setIfMissing([]));
      setStatus(`Uploading 0 / ${files.length}…`);

      let uploaded = 0;
      try {
        for (let i = 0; i < files.length; i += BATCH_SIZE) {
          const slice = files.slice(i, i + BATCH_SIZE);
          const assets = await Promise.all(
            slice.map((file) =>
              client.assets.upload("image", file, { filename: file.name }),
            ),
          );
          const items = assets.map((asset) => ({
            _type: "image",
            _key: uniqueKey(),
            asset: { _type: "reference", _ref: asset._id },
          }));
          onChange(insert(items, "after", [-1]));
          uploaded += slice.length;
          setStatus(`Uploading ${uploaded} / ${files.length}…`);
        }
      } finally {
        setStatus(null);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [client, onChange],
  );

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        style={{ display: "none" }}
        onChange={(event) => handleFiles(event.currentTarget.files)}
      />
      <Button
        mode="ghost"
        text={status ?? "Upload multiple images"}
        disabled={Boolean(status)}
        onClick={() => inputRef.current?.click()}
      />
    </Stack>
  );
}
