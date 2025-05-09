const baseUrls = {
  EU: "http://localhost:8080",
  US: "http://localhost:8081",
  ASIA: "http://localhost:8082",
};

export const api = async <T>(
  endpoint: string,
  region: "EU" | "US" | "ASIA",
  options: RequestInit = {}
): Promise<T> => {
  const res = await fetch(`${baseUrls[region]}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "API error");
  }

  return res.json();
};
