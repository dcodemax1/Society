const stateGST = {
  "Andhra Pradesh": "28",
  "Arunachal Pradesh": "12",
  Assam: "18",
  Bihar: "10",
  Chhattisgarh: "22",
  Goa: "30",
  Gujarat: "24",
  Haryana: "06",
  "Himachal Pradesh": "02",
  Jharkhand: "20",
  Karnataka: "29",
  Kerala: "32",
  "Madhya Pradesh": "23",
  Maharashtra: "27",
  Manipur: "14",
  Meghalaya: "17",
  Mizoram: "15",
  Nagaland: "13",
  Odisha: "21",
  Punjab: "03",
  Rajasthan: "08",
  Sikkim: "11",
  "Tamil Nadu": "33",
  Telangana: "36",
  Tripura: "16",
  "Uttar Pradesh": "09",
  Uttarakhand: "05",
  "West Bengal": "19",
  Chandigarh: "04",
  "Dadra and Nagar Haveli and Daman and Diu": "26",
  Lakshadweep: "31",
  Delhi: "07",
  Puducherry: "34",
  Ladakh: "37",
  "Jammu and Kashmir": "01",
};

export const generateMemberId = (mobile, state) => {
  if (!stateGST[state]) {
    throw new Error(`Invalid state name: ${state}`);
  }

  const gstCode = stateGST[state];
  return `${mobile}${gstCode}`;
};