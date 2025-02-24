const API_URL = "http://localhost:5000/api/issues"; // Update this if your backend URL changes

export const fetchIssues = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createIssue = async (issueData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(issueData),
  });
  return response.json();
};

export const updateIssue = async (id, status) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  return response.json();
};

export const deleteIssue = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
