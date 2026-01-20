export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  //ONLY set JSON header when NOT FormData
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`http://localhost:8080${url}`, {
    ...options,
    headers,
  });

  //TOKEN EXPIRED / INVALID
  if (response.status === 401 || response.status === 403) {
    console.warn("JWT expired or invalid. Logging out...");

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
    throw new Error("Session expired");
  }

  return response;
}
