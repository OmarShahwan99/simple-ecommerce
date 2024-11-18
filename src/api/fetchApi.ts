const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

type ErrorResponse = {
  message: string;
  [key: string]: any;
};

const fetchApi = async <T = any>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const fullUrl = `${baseURL}${url}`;

  const headers = new Headers(
    options?.headers || { "Content-Type": "application/json" }
  );

  if (options?.body instanceof FormData) {
    headers.set("Content-Type", "multipart/form-data");
  }

  try {
    const response = await fetch(fullUrl, {
      ...options,
      cache: "no-store",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      handleErrors(response.status, data);
      return Promise.reject(data);
    }

    return data;
  } catch (error) {
    console.error("Error during request:", error);
    return Promise.reject(error);
  }
};

const handleErrors = (status: number, data: ErrorResponse) => {
  switch (status) {
    case 400:
      console.log("400 Bad Request:", data.message);
      break;
    case 401:
      console.log("401 Unauthorized:", data.message);
      break;
    case 403:
      console.log("403 Forbidden:", data.message);
      break;
    case 404:
      console.log("404 Not Found:", data.message);
      break;
    case 422:
      console.log("Unprocessable Content:", data.message);
      break;
    case 500:
      console.log("500 Internal Server Error:", data.message);
      break;
    default:
      console.log(`Unhandled status code ${status}:`, data.message);
  }
};

export default fetchApi;
