export const api = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const res = await fetch(`http://localhost:8080${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    const message = error.message || error.text || "API error";
    throw new Error(message);
  }

  return res.json();
};
