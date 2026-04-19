export const buildURL = (baseUrl: string, params: Record<string, unknown>) => {
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    const valueStr = String(value).trim();
    if (value == null || valueStr === "") {
      return;
    }

    url.searchParams.append(key, valueStr);
  });

  return url;
};
