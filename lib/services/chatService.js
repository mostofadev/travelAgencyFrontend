import { userApi } from "@/lib/api/axios";

// ==================== SEND MESSAGE ====================
export const SendMessageServices = async ({ message, sessionId }) => {
  const { data } = await userApi.post("/chat", {
    message,
    session_id: sessionId ?? null,
  });
  return { data };
};

// ==================== SAVE LEAD ====================
export const SaveLeadServices = async ({
  sessionId,
  name,
  phone,
  email,
  interestedIn,
  destination,
  budget,
}) => {
  const { data } = await userApi.post("/travel/lead", {
    session_id: sessionId,
    name,
    phone,
    email,
    interested_in: interestedIn,
    destination,
    budget,
  });
  return { data };
};
