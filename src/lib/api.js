import axios from "axios";

const URL =
  "https://script.google.com/macros/s/AKfycbyKidLchZ2Si7CI0utEP8ZVtpSTW89yY_vTPJcvaEVwo4UnYQRU1TxPDWpAnJsFiNCa3Q/exec";

export const getLeads = async () => {
  const res = await axios.get(URL);

  // 🔥 handle string response
  if (typeof res.data === "string") {
    return JSON.parse(res.data);
  }

  return res.data;
};

export const submitLead = async (data) => {
  const params = new URLSearchParams(data);
  await axios.post(URL, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
};

export const updateStatus = async (phone, status) => {
  const params = new URLSearchParams({
    action: "updateStatus",
    phone,
    status,
  });

  await axios.post(URL, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
};