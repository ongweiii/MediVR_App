const API_URL = "https://medi-vr-api.vercel.app";

export async function getConversation(id) {
  return fetch(API_URL + "/api/conversation/" + id).then((res) => res.json());
}

export async function getSenders() {
  return fetch(API_URL + "/api/senders").then((res) => res.json());
}

export async function getChecklist(id) {
  return fetch(API_URL + "/api/checklist/" + id).then((res) => res.json());
}
