export const genarateSubject = (hours: number) => {
    return `VAPI Obnoarding - last ${hours}h update`
};

export const generateEmailHtml = (users: any[], hours: number) => {
  const rows = users.map(
    (u, i) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${u.id}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${u.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${u.email}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${u.phone ?? "-"}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${u.service ?? "-"}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${new Date(
          u.createdAt
        ).toLocaleString()}</td>
      </tr>`
  );

  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>VAPI Onboarding – Last ${hours} Hours</h2>
      <p>Here’s a summary of all new users that signed up in the last ${hours} hours:</p>
      ${
        users.length === 0
          ? "<p><em>No new users in this period.</em></p>"
          : `
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 8px; border: 1px solid #ddd;">#</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Name</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Email</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Phone</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Service</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Created At</th>
              </tr>
            </thead>
            <tbody>
              ${rows.join("")}
            </tbody>
          </table>
        `
      }
      <p style="margin-top: 20px; font-size: 12px; color: #666;">
        This is an automated report from VAPI.
      </p>
    </div>
  `;
};
