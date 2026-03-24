import { siteConfig } from "@/lib/site";

type MonitoringAlert = {
  page: string;
  errorType: string;
  timestamp: string;
};

function getAlertKey(alert: MonitoringAlert) {
  return `monitoring:${alert.page}:${alert.errorType}`;
}

export async function sendMonitoringAlert(alert: MonitoringAlert) {
  if (typeof window === "undefined") {
    return;
  }

  const alertKey = getAlertKey(alert);

  if (window.sessionStorage.getItem(alertKey)) {
    return;
  }

  window.sessionStorage.setItem(alertKey, alert.timestamp);

  try {
    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Site Monitoring",
        email: siteConfig.email,
        subject: `Resume preview alert: ${alert.errorType}`,
        message: `Automated monitoring alert\nPage: ${alert.page}\nError type: ${alert.errorType}\nTimestamp: ${alert.timestamp}`,
        company: "",
        organization: "",
        nickname: "",
      }),
    });
  } catch {
    window.sessionStorage.removeItem(alertKey);
  }
}
