import { differenceInYears } from "date-fns";

export const calculateAge = (birthDate) => {
  if (!birthDate) return "";

  const today = new Date();
  const dob = new Date(birthDate);
  const age = differenceInYears(today, dob);

  return age.toString();
};
