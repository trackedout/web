const PLAYER_LOOKUP_URL = 'https://playerdb.co/api/player/minecraft/';
const SKIN_RENDER_URL = 'https://starlightskins.lunareclipse.studio/render/';
const CACHE_KEY_PREFIX = 'skin-render:';
const CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_CONCURRENT_LOADS = 3;
const MAX_ATTEMPTS = 4;
const RETRY_DELAY_MS = 1500;

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function withRetries(action) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await action();
    } catch (error) {
      if (attempt === MAX_ATTEMPTS) throw error;
      await wait(attempt * RETRY_DELAY_MS);
    }
  }
}

async function fetchOk(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  return response;
}

async function fetchSkinTextureUrl(username) {
  const response = await fetchOk(PLAYER_LOOKUP_URL + encodeURIComponent(username));
  const body = await response.json();
  return body.data.player.skin_texture;
}

async function fetchRenderBlob(pose, crop, skinTextureUrl) {
  const query = `skinUrl=${encodeURIComponent(skinTextureUrl)}`;
  const response = await fetchOk(`${SKIN_RENDER_URL}${pose}/${crop}?${query}`);
  return response.blob();
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function readCachedRender(cacheKey) {
  try {
    const entry = JSON.parse(localStorage.getItem(cacheKey));
    const isFresh = entry && Date.now() - entry.savedAt < CACHE_MAX_AGE_MS;
    return isFresh ? entry.dataUrl : null;
  } catch (error) {
    return null;
  }
}

function writeCachedRender(cacheKey, dataUrl) {
  try {
    localStorage.setItem(cacheKey, JSON.stringify({ dataUrl, savedAt: Date.now() }));
  } catch (error) {
    console.warn('Skin render cache is full or unavailable', error);
  }
}

async function renderSkin({ player, pose, crop }) {
  const skinTextureUrl = await fetchSkinTextureUrl(player);
  const blob = await fetchRenderBlob(pose, crop, skinTextureUrl);
  return blobToDataUrl(blob);
}

async function loadSkinRender(image) {
  const { player, pose, crop } = image.dataset;
  const cacheKey = `${CACHE_KEY_PREFIX}${player}:${pose}:${crop}`;
  try {
    let dataUrl = readCachedRender(cacheKey);
    if (!dataUrl) {
      dataUrl = await withRetries(() => renderSkin(image.dataset));
      writeCachedRender(cacheKey, dataUrl);
    }
    image.src = dataUrl;
  } catch (error) {
    console.warn(`Could not load skin render for ${player}`, error);
  }
}

async function loadAllSkinRenders(images) {
  const queue = [...images];
  const worker = async () => {
    while (queue.length > 0) await loadSkinRender(queue.shift());
  };
  await Promise.all(Array.from({ length: MAX_CONCURRENT_LOADS }, worker));
}

loadAllSkinRenders(document.querySelectorAll('img[data-player]'));
