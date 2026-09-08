(() => {
  const params = new URLSearchParams(location.search);
  const device = matchMedia("(max-width: 780px)").matches ? "mobile" : "desktop";
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="tel:"]');
    if (!link) return;
    const payload = {
      site: "github-karaoke",
      page: location.pathname,
      source: params.get("utm_source") || document.referrer || "direct",
      medium: params.get("utm_medium") || "none",
      campaign: params.get("utm_campaign") || "none",
      content: params.get("utm_content") || link.textContent.trim().slice(0, 80),
      device,
      timestamp: new Date().toISOString()
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "phone_click", ...payload });
    try {
      navigator.sendBeacon("https://kimnight.kr/api/phone-click", new Blob([JSON.stringify(payload)], { type: "text/plain;charset=UTF-8" }));
    } catch {}
  }, true);
})();
