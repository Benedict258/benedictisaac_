export type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
};

export type Award = {
  title: string;
  period: string;
};

export const education: Education = {
  degree: "Bachelor of Engineering (BEng): Mechatronics Engineering",
  institution: "Federal University of Technology Minna",
  location: "Minna, NG",
  period: "Expected in 12/2027",
};

export const awards: Award[] = [{ title: "Chevron Scholarship Recipient", period: "2025/2026" }];
