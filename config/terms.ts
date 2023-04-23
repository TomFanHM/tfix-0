type TermsType = {
  "Website Name": string;
  "Terms and Conditions": Array<{
    Clause: string;
    Description: string;
  }>;
};

export const terms: TermsType = {
  "Website Name": "TFIX.",
  "Terms and Conditions": [
    {
      Clause: "Acceptance of Terms",
      Description:
        "By accessing and using this website, you accept and agree to be bound by these terms and conditions.",
    },
    {
      Clause: "Website Content",
      Description:
        "The content on this website is for general information purposes only and is subject to change without notice.",
    },
    {
      Clause: "Intellectual Property",
      Description:
        "All intellectual property rights in this website and its content are owned by us and/or our licensors. You may not reproduce, distribute, or modify any part of this website without our prior written consent.",
    },
    {
      Clause: "User Content",
      Description:
        "You are solely responsible for any content you post or transmit on this website, and we reserve the right to remove any content that we consider to be inappropriate or objectionable.",
    },
    {
      Clause: "Privacy Policy",
      Description:
        "Your use of this website is subject to our Privacy Policy, which explains how we collect, use, and protect your personal information.",
    },
    {
      Clause: "Limitation of Liability",
      Description:
        "We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or any content on it.",
    },
    {
      Clause: "Indemnification",
      Description:
        "You agree to indemnify and hold us harmless from any claims, losses, liabilities, damages, and expenses, including reasonable attorney's fees, arising from your use of this website or any violation of these terms and conditions.",
    },
    {
      Clause: "Governing Law",
      Description:
        "These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where the website is hosted.",
    },
    {
      Clause: "Changes to Terms and Conditions",
      Description:
        "We reserve the right to modify or update these terms and conditions at any time without prior notice. Your continued use of this website after any such changes constitutes your acceptance of the new terms and conditions.",
    },
    {
      Clause: "Termination",
      Description:
        "We reserve the right to terminate your access to this website at any time for any reason without notice.",
    },
  ],
};
