const getPostViews = async (path: string) => {
  const websiteId = process.env.UMAMI_WEBSITE_ID;
  const apiKey = process.env.UMAMI_API_KEY;

  // 恢复 Date.now() 确保 API 调用正确
  const url = `https://api.umami.is/v1/websites/${websiteId}/metrics?type=url&startAt=0&endAt=${Date.now()}&url=${path}`;

  try {
    const res = await fetch(url, {
      headers: {
        "x-umami-api-key": apiKey as string,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Umami API Error (${res.status}):`, text);
      throw new Error(`Failed to fetch Umami API: ${res.status}`);
    }

    const data = await res.json();
    const stats = data.find((item: any) => item.x === path);
    return stats ? stats.y : 0;
  } catch (error) {
    console.error("Failed to fetch Umami API:", error);
    return 0;
  }
};

export default getPostViews;
