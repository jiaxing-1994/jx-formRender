import { generateUrlParams } from "@wk-libs/utils";

export const useDownload = (headers: Record<string, string> = {}) => {
  const downloadFile = async (url: string, fileName?: string) => {
    if (!fileName) {
      fileName = url.split("/")[url.split("/").length - 1];
    }
    const res = await fetch(url, {
      headers,
    });
    if (res.status === 200) {
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(blobUrl);
    } else {
      window.open(`${url}?${generateUrlParams(headers)}`, "__blank");
    }
  };
  return {
    downloadFile,
  };
};
